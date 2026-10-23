interface DrawingProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export function ElevationDrawing({ className = '', theme = 'light' }: DrawingProps) {
  const isDark = theme === 'dark';
  const ink = isDark ? '#F4EFE6' : '#14120F';
  const brass = '#B98A2E';
  const hairline = isDark ? 'rgba(244, 239, 230, 0.18)' : 'rgba(20, 18, 15, 0.16)';
  const paperDeep = isDark ? '#1C1916' : '#EAE3D6';

  return (
    <svg
      viewBox="0 0 800 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none font-mono ${className}`}
      aria-label="Architectural Front Elevation Line Drawing"
    >
      {/* Title & Sheet Annotation */}
      <text x="36" y="38" fill={ink} fontSize="11" letterSpacing="0.18em" fontWeight="600">
        SHEET EL-01 // SOUTH FRONT ELEVATION
      </text>
      <text x="764" y="38" textAnchor="end" fill={brass} fontSize="10" letterSpacing="0.14em">
        SCALE 1:100 @ A1
      </text>
      <line x1="36" y1="48" x2="764" y2="48" stroke={hairline} strokeWidth="1" />

      {/* Background paper tone rectangle */}
      <rect x="36" y="60" width="728" height="420" fill={paperDeep} fillOpacity={isDark ? "0.3" : "0.45"} stroke={hairline} strokeWidth="1" />

      {/* Grid Reference Guidelines */}
      <line x1="36" y1="120" x2="764" y2="120" stroke={hairline} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="36" y1="240" x2="764" y2="240" stroke={hairline} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="36" y1="360" x2="764" y2="360" stroke={hairline} strokeWidth="0.8" strokeDasharray="3 3" />

      {/* Left Datum Levels */}
      <g opacity="0.85">
        <text x="50" y="124" fill={ink} fontSize="9">+6.60 ROOF LVL</text>
        <path d="M 40 120 L 46 116 L 46 124 Z" fill={brass} />
        
        <text x="50" y="244" fill={ink} fontSize="9">+3.30 FIRST FLR</text>
        <path d="M 40 240 L 46 236 L 46 244 Z" fill={brass} />
        
        <text x="50" y="364" fill={ink} fontSize="9">+0.45 PLINTH LVL</text>
        <path d="M 40 360 L 46 356 L 46 364 Z" fill={brass} />
        
        <text x="50" y="404" fill={ink} fontSize="9">±0.00 NATURAL GL</text>
        <path d="M 40 400 L 46 396 L 46 404 Z" fill={ink} />
      </g>

      {/* Ground Line Heavy */}
      <line x1="80" y1="400" x2="720" y2="400" stroke={ink} strokeWidth="2.5" />
      {/* Ground hatching ticks */}
      {[100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660, 700].map((x) => (
        <line key={x} x1={x} y1="400" x2={x - 12} y2="414" stroke={hairline} strokeWidth="1" />
      ))}

      {/* Plinth Base */}
      <rect x="140" y="360" width="520" height="40" fill="none" stroke={ink} strokeWidth="1.5" />
      
      {/* Main Ground Floor Volume */}
      <rect x="150" y="240" width="320" height="120" fill="none" stroke={ink} strokeWidth="1.5" />
      {/* Right Ground Floor Volume (Recessed) */}
      <rect x="470" y="250" width="180" height="110" fill="none" stroke={ink} strokeWidth="1.2" />

      {/* First Floor Cantilever Volume */}
      <rect x="130" y="120" width="360" height="120" fill="none" stroke={ink} strokeWidth="1.8" />
      {/* First Floor Right Volume with Jaali screen */}
      <rect x="490" y="140" width="170" height="100" fill="none" stroke={ink} strokeWidth="1.2" />

      {/* Jaali Pattern Screen Detail (Brass Accent) */}
      <g stroke={brass} strokeWidth="1" opacity="0.8">
        {[505, 525, 545, 565, 585, 605, 625, 645].map((x) => (
          <line key={x} x1={x} y1="150" x2={x} y2="230" strokeDasharray="4 4" />
        ))}
        {[160, 175, 190, 205, 220].map((y) => (
          <line key={y} x1="500" y1={y} x2="650" y2={y} strokeDasharray="4 4" />
        ))}
      </g>
      <text x="575" y="145" textAnchor="middle" fill={brass} fontSize="8" letterSpacing="0.1em">TERRACOTTA JAALI</text>

      {/* Deep Balcony Cutout First Floor Left */}
      <rect x="150" y="140" width="180" height="90" fill={paperDeep} stroke={ink} strokeWidth="1.2" />
      {/* Glass Balcony Railing */}
      <line x1="145" y1="205" x2="335" y2="205" stroke={brass} strokeWidth="1.5" />
      <line x1="145" y1="230" x2="335" y2="230" stroke={ink} strokeWidth="1" />
      <rect x="145" y="205" width="190" height="25" fill={brass} fillOpacity="0.12" stroke={hairline} />

      {/* Double-Height Entrance Portico */}
      <rect x="350" y="270" width="90" height="90" fill="none" stroke={ink} strokeWidth="1.5" />
      <line x1="395" y1="270" x2="395" y2="360" stroke={hairline} strokeWidth="1" />
      {/* Door Handle */}
      <line x1="388" y1="315" x2="388" y2="330" stroke={brass} strokeWidth="2" strokeLinecap="round" />

      {/* Parapet & Planter Ledge */}
      <line x1="120" y1="110" x2="670" y2="110" stroke={ink} strokeWidth="1.5" />
      <rect x="120" y="110" width="550" height="10" fill="none" stroke={ink} strokeWidth="1" />

      {/* Dimension Line Bottom */}
      <line x1="130" y1="440" x2="670" y2="440" stroke={brass} strokeWidth="1" />
      <line x1="130" y1="434" x2="130" y2="446" stroke={brass} strokeWidth="1.5" />
      <line x1="670" y1="434" x2="670" y2="446" stroke={brass} strokeWidth="1.5" />
      <text x="400" y="435" textAnchor="middle" fill={brass} fontSize="9">16,200 mm TOTAL FACADE WIDTH</text>

      {/* Grid Markers Top */}
      {[{ id: 'A', x: 130 }, { id: 'B', x: 340 }, { id: 'C', x: 490 }, { id: 'D', x: 670 }].map((col) => (
        <g key={col.id}>
          <circle cx={col.x} cy="75" r="9" fill="none" stroke={brass} strokeWidth="1" />
          <text x={col.x} y="78" textAnchor="middle" fill={brass} fontSize="9" fontWeight="600">{col.id}</text>
          <line x1={col.x} y1="85" x2={col.x} y2="110" stroke={hairline} strokeDasharray="2 2" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}
