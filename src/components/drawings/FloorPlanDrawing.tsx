interface DrawingProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function FloorPlanDrawing({ className = '', theme = 'light' }: DrawingProps) {
  const isDark = theme === 'dark';
  const ink = isDark ? '#F4EFE6' : '#14120F';
  const brass = '#B98A2E';
  const hairline = isDark ? 'rgba(244, 239, 230, 0.18)' : 'rgba(20, 18, 15, 0.16)';
  const paperDeep = isDark ? '#1C1916' : '#EAE3D6';

  return (
    <svg
      viewBox="0 0 800 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none font-mono ${className}`}
      aria-label="Architectural Floor Plan Line Drawing"
    >
      {/* Title & Sheet Annotation */}
      <text x="36" y="38" fill={ink} fontSize="11" letterSpacing="0.18em" fontWeight="600">
        SHEET PL-02 // GROUND FLOOR LAYOUT
      </text>
      <text x="764" y="38" textAnchor="end" fill={brass} fontSize="10" letterSpacing="0.14em">
        SCALE 1:50 @ A1
      </text>
      <line x1="36" y1="48" x2="764" y2="48" stroke={hairline} strokeWidth="1" />

      {/* Sheet Frame */}
      <rect x="36" y="60" width="728" height="460" fill={paperDeep} fillOpacity={isDark ? "0.3" : "0.4"} stroke={hairline} strokeWidth="1" />

      {/* North Arrow */}
      <g transform="translate(710, 100)">
        <circle cx="0" cy="0" r="18" stroke={hairline} strokeWidth="1" />
        <path d="M 0 -14 L 5 8 L 0 5 L -5 8 Z" fill={brass} />
        <text x="0" y="-18" textAnchor="middle" fill={brass} fontSize="10" fontWeight="bold">N</text>
      </g>

      {/* Outer Boundary Wall (Heavy Cut Line) */}
      <rect x="120" y="100" width="540" height="360" fill="none" stroke={ink} strokeWidth="3" />
      {/* Inner wall face */}
      <rect x="130" y="110" width="520" height="340" fill="none" stroke={ink} strokeWidth="1" />

      {/* Central Courtyard / Aangan Open to Sky */}
      <rect x="340" y="220" width="140" height="130" fill={isDark ? '#14120F' : '#F4EFE6'} stroke={brass} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="410" y="280" textAnchor="middle" fill={brass} fontSize="10" fontWeight="600">CENTRAL COURTYARD</text>
      <text x="410" y="296" textAnchor="middle" fill={hairline} fontSize="8">OPEN TO SKY</text>

      {/* Internal Partition Walls */}
      {/* Living / Drawing Room Front Left */}
      <line x1="120" y1="260" x2="340" y2="260" stroke={ink} strokeWidth="2.5" />
      <text x="220" y="180" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">DRAWING ROOM</text>
      <text x="220" y="198" textAnchor="middle" fill={hairline} fontSize="9">5400 x 4200</text>

      {/* Dining Area Front Right */}
      <line x1="480" y1="260" x2="660" y2="260" stroke={ink} strokeWidth="2.5" />
      <text x="560" y="180" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">DINING & PANTRY</text>
      <text x="560" y="198" textAnchor="middle" fill={hairline} fontSize="9">4200 x 3600</text>

      {/* Master Bedroom Rear Left */}
      <line x1="340" y1="350" x2="340" y2="460" stroke={ink} strokeWidth="2.5" />
      <text x="220" y="380" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">MASTER BEDROOM</text>
      <text x="220" y="398" textAnchor="middle" fill={hairline} fontSize="9">4800 x 4200</text>

      {/* Kitchen & Utilities Rear Right */}
      <line x1="480" y1="350" x2="480" y2="460" stroke={ink} strokeWidth="2.5" />
      <text x="560" y="380" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">MODULAR KITCHEN</text>
      <text x="560" y="398" textAnchor="middle" fill={hairline} fontSize="9">3600 x 3000</text>

      {/* Door Swings */}
      {/* Main Entrance at top center */}
      <path d="M 370 100 A 40 40 0 0 1 410 140" fill="none" stroke={brass} strokeWidth="1" strokeDasharray="3 2" />
      <line x1="370" y1="100" x2="370" y2="140" stroke={ink} strokeWidth="1.5" />
      <text x="390" y="90" textAnchor="middle" fill={brass} fontSize="9" fontWeight="600">MAIN ENTRY</text>

      {/* Bedroom Door Swing */}
      <path d="M 340 370 A 35 35 0 0 0 305 405" fill="none" stroke={brass} strokeWidth="1" strokeDasharray="3 2" />

      {/* Structural Columns (Brass solid blocks) */}
      {[
        { x: 120, y: 100 }, { x: 330, y: 100 }, { x: 470, y: 100 }, { x: 650, y: 100 },
        { x: 120, y: 250 }, { x: 330, y: 210 }, { x: 470, y: 210 }, { x: 650, y: 250 },
        { x: 120, y: 450 }, { x: 330, y: 340 }, { x: 470, y: 340 }, { x: 650, y: 450 },
      ].map((col, idx) => (
        <rect key={idx} x={col.x} y={col.y} width="12" height="12" fill={brass} />
      ))}

      {/* Exterior Dimension String Bottom */}
      <line x1="120" y1="490" x2="660" y2="490" stroke={brass} strokeWidth="1" />
      <line x1="120" y1="484" x2="120" y2="496" stroke={brass} strokeWidth="1.5" />
      <line x1="660" y1="484" x2="660" y2="496" stroke={brass} strokeWidth="1.5" />
      <text x="390" y="485" textAnchor="middle" fill={brass} fontSize="9">18,000 mm OVERALL DEPTH</text>
    </svg>
  );
}
