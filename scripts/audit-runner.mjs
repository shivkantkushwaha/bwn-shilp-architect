import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\HP\\AppData\\Local\\Temp\\chrome_audit_profile_' + Date.now();
const PORT = 9222;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.callbacks.has(data.id)) {
        const { resolve, reject } = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function startChrome() {
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--mute-audio',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let versionInfo = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        versionInfo = await res.json();
        break;
      }
    } catch {
      await sleep(150);
    }
  }

  if (!versionInfo) {
    chromeProcess.kill();
    throw new Error('Could not connect to Chrome debugging port');
  }

  return { chromeProcess, versionInfo };
}

async function createTarget() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new`, { method: 'PUT' });
  const target = await res.json();
  const cdp = new CDPClient(target.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Runtime.enable');
  return { target, cdp };
}

async function setViewport(cdp, { width, height, isMobile = true, deviceScaleFactor = 2 }) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor,
    mobile: isMobile,
    screenOrientation: width > height ? { angle: 90, type: 'landscapePrimary' } : { angle: 0, type: 'portraitPrimary' },
  });
  if (isMobile) {
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  } else {
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  }
}

async function navigate(cdp, url) {
  await cdp.send('Page.navigate', { url });
  // Wait for loadEventFired or network idle
  await sleep(1000);
}

async function captureScreenshot(cdp, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const res = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outputPath, Buffer.from(res.data, 'base64'));
}

async function evaluate(cdp, expression) {
  const res = await cdp.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(res.exceptionDetails.text || 'Evaluation error');
  }
  return res.result?.value;
}

async function runAudit() {
  console.log('Starting Chrome for mobile audit...');
  const { chromeProcess } = await startChrome();
  const { cdp } = await createTarget();

  const auditResults = {
    viewports: {},
    overflows: [],
    tapTargets: [],
    heroAboveFold: {},
    formInspection: {},
    images: [],
    viewportMeta: null,
  };

  const routes = [
    { name: 'home', path: '/' },
    { name: 'projects', path: '/projects' },
    { name: 'project-detail', path: '/projects/modern-family-residence' },
    { name: 'services', path: '/services' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
    { name: 'not-found', path: '/unreferenced-page-404' },
  ];

  const viewportsToTest = [
    { name: '320x568', width: 320, height: 568, isMobile: true },
    { name: '360x800', width: 360, height: 800, isMobile: true },
    { name: '390x844', width: 390, height: 844, isMobile: true },
    { name: '430x932', width: 430, height: 932, isMobile: true },
    { name: '768x1024', width: 768, height: 1024, isMobile: true },
    { name: '844x390-landscape', width: 844, height: 390, isMobile: true },
    { name: '1024x768-desktop', width: 1024, height: 768, isMobile: false },
    { name: '1440x900-desktop', width: 1440, height: 900, isMobile: false },
  ];

  try {
    // 1. Capture BEFORE screenshots at 390x844
    console.log('Capturing BEFORE screenshots at 390x844...');
    await setViewport(cdp, { width: 390, height: 844, isMobile: true });

    for (const route of routes) {
      await navigate(cdp, `http://localhost:3000${route.path}`);
      await captureScreenshot(cdp, `audit/before/${route.name}.png`);
      console.log(`Saved audit/before/${route.name}.png`);
    }

    // Capture mobile menu open screenshot
    await navigate(cdp, 'http://localhost:3000/');
    await evaluate(cdp, `
      const btn = document.querySelector('button[aria-label*="menu" i], button[aria-expanded]');
      if (btn) btn.click();
    `);
    await sleep(400);
    await captureScreenshot(cdp, 'audit/before/mobile-menu.png');
    console.log('Saved audit/before/mobile-menu.png');

    // Capture Contact steps (1, 2, 3, success)
    await navigate(cdp, 'http://localhost:3000/contact');
    await captureScreenshot(cdp, 'audit/before/contact-step1.png');

    // Advance to Step 2
    await evaluate(cdp, `
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next: Project Details'));
      if (nextBtn) nextBtn.click();
    `);
    await sleep(300);
    await captureScreenshot(cdp, 'audit/before/contact-step2.png');

    // Advance to Step 3
    await evaluate(cdp, `
      const nextBtn2 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next: Contact Details'));
      if (nextBtn2) nextBtn2.click();
    `);
    await sleep(300);
    await captureScreenshot(cdp, 'audit/before/contact-step3.png');

    // Fill form and submit to get success state
    await evaluate(cdp, `
      const nameInput = document.querySelector('input[id="name"]');
      const phoneInput = document.querySelector('input[id="phone"]');
      if (nameInput) {
        nameInput.value = 'Ramesh Verma';
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (phoneInput) {
        phoneInput.value = '9876543210';
        phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
        phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.click();
    `);
    await sleep(2000); // Wait for simulated async submission (1.5s)
    await captureScreenshot(cdp, 'audit/before/contact-success.png');
    console.log('Saved contact steps and success screenshots');

    // Desktop baseline screenshots (1440 and 1024)
    console.log('Capturing Desktop baseline screenshots...');
    await setViewport(cdp, { width: 1440, height: 900, isMobile: false });
    for (const route of routes) {
      await navigate(cdp, `http://localhost:3000${route.path}`);
      await captureScreenshot(cdp, `audit/before/desktop-1440-${route.name}.png`);
    }
    await setViewport(cdp, { width: 1024, height: 768, isMobile: false });
    await navigate(cdp, 'http://localhost:3000/');
    await captureScreenshot(cdp, 'audit/before/desktop-1024-home.png');

    // 2. Comprehensive Layout & Overflow Audit across all viewports
    console.log('Auditing horizontal overflow and layout across all viewports...');
    for (const vp of viewportsToTest) {
      await setViewport(cdp, vp);
      for (const route of routes) {
        await navigate(cdp, `http://localhost:3000${route.path}`);
        const check = await evaluate(cdp, `
          (() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const overflows = docWidth > winWidth;
            let overflowingElements = [];

            if (overflows) {
              const all = document.querySelectorAll('*');
              for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.right > winWidth + 1 || rect.left < -1) {
                  overflowingElements.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className?.toString?.()?.slice(0, 100),
                    rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
                    text: el.innerText ? el.innerText.slice(0, 40).replace(/\\n/g, ' ') : ''
                  });
                }
              }
            }

            return {
              docWidth,
              winWidth,
              overflows,
              delta: docWidth - winWidth,
              overflowingElements: overflowingElements.slice(0, 5)
            };
          })()
        `);

        if (check.overflows) {
          auditResults.overflows.push({
            viewport: vp.name,
            route: route.path,
            delta: check.delta,
            elements: check.overflowingElements,
          });
          console.warn(`[OVERFLOW] ${vp.name} on ${route.path}: +${check.delta}px`);
        }
      }
    }

    // 3. Hero Above-the-fold Check on 390x844
    console.log('Checking Hero above-the-fold visibility at 390x844...');
    await setViewport(cdp, { width: 390, height: 844, isMobile: true });
    await navigate(cdp, 'http://localhost:3000/');
    const heroMetrics = await evaluate(cdp, `
      (() => {
        const ratingChip = document.querySelector('a[href*="google.com/maps"]');
        const headline = document.querySelector('h1');
        const primaryCta = Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('Book a consultation'));
        const secondaryCta = Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('WhatsApp us'));
        const featuredImage = document.querySelector('section img');

        const windowHeight = window.innerHeight;

        function getBox(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            height: Math.round(r.height),
            isVisibleAboveFold: r.bottom <= windowHeight,
            portionVisible: Math.max(0, Math.min(r.bottom, windowHeight) - Math.max(r.top, 0)) / r.height
          };
        }

        return {
          windowHeight,
          ratingChip: getBox(ratingChip),
          headline: getBox(headline),
          primaryCta: getBox(primaryCta),
          secondaryCta: getBox(secondaryCta),
          featuredImage: getBox(featuredImage),
        };
      })()
    `);
    auditResults.heroAboveFold = heroMetrics;

    // 4. Viewport meta & theme-color
    const metaCheck = await evaluate(cdp, `
      (() => {
        const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');
        const themeColor = document.querySelector('meta[name="theme-color"]')?.getAttribute('content');
        return { viewport, themeColor };
      })()
    `);
    auditResults.viewportMeta = metaCheck;

    // 5. Touch tap targets inspection (< 44px)
    console.log('Inspecting tap targets on 390x844...');
    for (const route of routes) {
      await navigate(cdp, `http://localhost:3000${route.path}`);
      const smallTargets = await evaluate(cdp, `
        (() => {
          const interactives = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex="0"]'));
          const small = [];
          for (const el of interactives) {
            // ignore hidden elements
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (r.width < 44 || r.height < 44) {
              small.push({
                tag: el.tagName,
                text: el.innerText ? el.innerText.slice(0, 30).trim() : el.getAttribute('aria-label') || el.id,
                width: Math.round(r.width),
                height: Math.round(r.height),
                href: el.getAttribute('href') || null,
              });
            }
          }
          return small;
        })()
      `);
      if (smallTargets.length > 0) {
        auditResults.tapTargets.push({ route: route.path, targets: smallTargets });
      }
    }

    // 6. Form inspection (font sizes, autocomplete, inputmode)
    console.log('Inspecting Form inputs on /contact...');
    await navigate(cdp, 'http://localhost:3000/contact');
    // Advance to step 3 to check contact inputs
    await evaluate(cdp, `
      const next1 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next: Project Details'));
      if (next1) next1.click();
    `);
    await sleep(200);
    await evaluate(cdp, `
      const next2 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next: Contact Details'));
      if (next2) next2.click();
    `);
    await sleep(200);

    const formDetails = await evaluate(cdp, `
      (() => {
        const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
        return inputs.map(el => {
          const style = window.getComputedStyle(el);
          return {
            id: el.id,
            name: el.name,
            type: el.type,
            fontSize: style.fontSize,
            inputMode: el.inputMode || null,
            autocomplete: el.autocomplete || null,
            enterKeyHint: el.enterKeyHint || null,
          };
        });
      })()
    `);
    auditResults.formInspection = formDetails;

    // 7. Image inspection (sizes, priority, aspect ratio)
    console.log('Inspecting images on Home & Projects...');
    await navigate(cdp, 'http://localhost:3000/');
    const homeImages = await evaluate(cdp, `
      (() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src ? img.src.split('/').pop().slice(0, 40) : null,
          currentSrc: img.currentSrc ? img.currentSrc.split('/').pop().slice(0, 60) : null,
          sizes: img.getAttribute('sizes'),
          loading: img.getAttribute('loading'),
          priority: img.fetchPriority || null,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          renderedWidth: Math.round(img.getBoundingClientRect().width),
          renderedHeight: Math.round(img.getBoundingClientRect().height),
        }));
      })()
    `);
    auditResults.images = homeImages;

    // Write audit results JSON
    fs.writeFileSync('audit/audit-data.json', JSON.stringify(auditResults, null, 2));
    console.log('Audit completed successfully. Results saved to audit/audit-data.json');

  } finally {
    cdp.close();
    chromeProcess.kill();
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
