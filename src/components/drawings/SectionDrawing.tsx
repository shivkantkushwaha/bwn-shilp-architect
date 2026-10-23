interface DrawingProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function SectionDrawing({ className = '', theme = 'light' }: DrawingProps) {
  const isDark = theme === 'dark';
  const ink = isDark ? '#F4EFE6' : '#14120F';
  const brass = '#B98A2E';
  const hairline = isDark ? 'rgba(244, 239, 230, 0.18)' : 'rgba(20, 18, 15, 0.16)';
  const paperDeep = isDark ? '#1C1916' : '#EAE3D6';

  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none font-mono ${className}`}
      aria-label="Architectural Cross-Section Line Drawing"
    >
      {/* Title & Sheet Annotation */}
      <text x="36" y="38" fill={ink} fontSize="11" letterSpacing="0.18em" fontWeight="600">
        SHEET SEC-01 // LONGITUDINAL SECTION A-A&apos;
      </text>
      <text x="764" y="38" textAnchor="end" fill={brass} fontSize="10" letterSpacing="0.14em">
        SCALE 1:75 @ A1
      </text>
      <line x1="36" y1="48" x2="764" y2="48" stroke={hairline} strokeWidth="1" />

      {/* Sheet Frame */}
      <rect x="36" y="60" width="728" height="400" fill={paperDeep} fillOpacity={isDark ? "0.3" : "0.4"} stroke={hairline} strokeWidth="1" />

      {/* Ground Line */}
      <line x1="60" y1="380" x2="740" y2="380" stroke={ink} strokeWidth="2.5" />
      <text x="70" y="374" fill={ink} fontSize="8" fontWeight="600">±0.00 FINISHED GL</text>

      {/* Foundation Footings in Soil */}
      {[160, 320, 480, 640].map((colX) => (
        <g key={colX}>
          {/* Foundation Column */}
          <rect x={colX - 8} y="380" width="16" height="40" fill={hairline} stroke={ink} strokeWidth="1.2" />
          {/* Stepped Footing */}
          <rect x={colX - 24} y="420" width="48" height="15" fill={paperDeep} stroke={ink} strokeWidth="1.2" />
          <rect x={colX - 36} y="435" width="72" height="15" fill={paperDeep} stroke={ink} strokeWidth="1.2" />
        </g>
      ))}

      {/* Plinth Beam (+0.45m) */}
      <rect x="140" y="345" width="520" height="20" fill={hairline} stroke={ink} strokeWidth="1.5" />
      <text x="80" y="340" fill={brass} fontSize="8">+0.45 PLINTH</text>

      {/* Ground Floor Slab & Walls */}
      {/* Structural Cut Walls (Solid cut lines) */}
      <rect x="152" y="240" width="16" height="105" fill={ink} />
      <rect x="312" y="240" width="16" height="105" fill={ink} />
      <rect x="472" y="240" width="16" height="105" fill={ink} />
      <rect x="632" y="240" width="16" height="105" fill={ink} />

      {/* First Floor Slab (+3.30m) */}
      <rect x="130" y="225" width="540" height="15" fill={hairline} stroke={ink} strokeWidth="1.8" />
      <text x="80" y="222" fill={brass} fontSize="8">+3.30 FIRST FLR</text>

      {/* First Floor Cut Walls */}
      <rect x="152" y="125" width="16" height="100" fill={ink} />
      <rect x="312" y="125" width="16" height="100" fill={ink} />
      <rect x="632" y="125" width="16" height="100" fill={ink} />

      {/* Roof Slab (+6.60m) */}
      <rect x="130" y="110" width="540" height="15" fill={hairline} stroke={ink} strokeWidth="1.8" />
      <text x="80" y="106" fill={brass} fontSize="8">+6.60 ROOF SLAB</text>

      {/* Roof Parapet */}
      <rect x="130" y="80" width="16" height="30" fill={paperDeep} stroke={ink} strokeWidth="1.2" />
      <rect x="654" y="80" width="16" height="30" fill={paperDeep} stroke={ink} strokeWidth="1.2" />

      {/* Skylight Over Courtyard Cutout */}
      <polygon points="380,110 400,90 440,90 460,110" fill={brass} fillOpacity="0.15" stroke={brass} strokeWidth="1.2" />
      <text x="420" y="105" textAnchor="middle" fill={brass} fontSize="8" fontWeight="600">VENTILATED SKYLIGHT</text>

      {/* Room Annotations Inside Section */}
      <text x="235" y="300" textAnchor="middle" fill={ink} fontSize="10" fontWeight="600">FOYER & LIVING</text>
      <text x="395" y="300" textAnchor="middle" fill={brass} fontSize="9" fontWeight="600">INTERNAL LIGHTWELL</text>
      <text x="555" y="300" textAnchor="middle" fill={ink} fontSize="10" fontWeight="600">DINING & SUITE</text>

      <text x="235" y="180" textAnchor="middle" fill={ink} fontSize="10" fontWeight="600">FAMILY LOUNGE</text>
      <text x="555" y="180" textAnchor="middle" fill={ink} fontSize="10" fontWeight="600">MASTER BEDROOM</text>

      {/* Vertical Clear Height Dimension */}
      <line x1="680" y1="240" x2="680" y2="345" stroke={brass} strokeWidth="1" />
      <line x1="675" y1="240" x2="685" y2="240" stroke={brass} strokeWidth="1" />
      <line x1="675" y1="345" x2="685" y2="345" stroke={brass} strokeWidth="1" />
      <text x="692" y="295" fill={brass} fontSize="8">3,000 CLEAR HT</text>
    </svg>
  );
}
