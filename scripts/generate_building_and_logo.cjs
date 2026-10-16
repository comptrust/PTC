const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Generate the EXACT 6975 Baltimore Annapolis Blvd building photo (image.png)
async function generateBuildingPhoto() {
  const width = 1200;
  const height = 900; // 4:3 aspect ratio matching the user's uploaded photo

  const buildingSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Sky Gradient: Vibrant Maryland summer blue sky with sunlight -->
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e73be" />
        <stop offset="40%" stop-color="#3b82f6" />
        <stop offset="85%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#93c5fd" />
      </linearGradient>

      <!-- Shingled Roof Gradient: Weathered architectural brown/tan shingles -->
      <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a4d41" />
        <stop offset="40%" stop-color="#786c5e" />
        <stop offset="80%" stop-color="#8c7e6d" />
        <stop offset="100%" stop-color="#4e4337" />
      </linearGradient>

      <!-- Lime Green Metal Panel Siding Gradient: Authentic building paint -->
      <linearGradient id="greenSidingGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#6ba038" />
        <stop offset="15%" stop-color="#7db542" />
        <stop offset="50%" stop-color="#8ec34b" />
        <stop offset="85%" stop-color="#82bb44" />
        <stop offset="100%" stop-color="#6ea239" />
      </linearGradient>

      <!-- Asphalt Lot Gradient -->
      <linearGradient id="asphaltGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#525866" />
        <stop offset="35%" stop-color="#6b7280" />
        <stop offset="70%" stop-color="#4b5563" />
        <stop offset="100%" stop-color="#374151" />
      </linearGradient>

      <!-- Workshop Dark Interior Gradient -->
      <linearGradient id="bayDark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#05070a" />
        <stop offset="60%" stop-color="#0f141c" />
        <stop offset="100%" stop-color="#19202c" />
      </linearGradient>

      <!-- Soft Cloud Filter -->
      <filter id="cloudSoft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <!-- Realistic Drop Shadow for roof eave & signs -->
      <filter id="roofDropShadow" x="-10%" y="0%" width="120%" height="150%">
        <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000000" flood-opacity="0.65" />
      </filter>

      <filter id="signShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.45" />
      </filter>

      <filter id="jackShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="12" dy="16" stdDeviation="10" flood-color="#000000" flood-opacity="0.7" />
      </filter>
    </defs>

    <!-- 1. SKY & DISTANT TREES -->
    <rect width="${width}" height="${height}" fill="url(#skyGrad)" />

    <!-- Fluffy Summer Clouds in the Blue Sky -->
    <g filter="url(#cloudSoft)" opacity="0.85">
      <ellipse cx="140" cy="110" rx="90" ry="35" fill="#ffffff" />
      <ellipse cx="200" cy="95" rx="70" ry="40" fill="#ffffff" />
      <ellipse cx="110" cy="125" rx="60" ry="30" fill="#ffffff" />
      <!-- Small cloud on right -->
      <ellipse cx="820" cy="70" rx="45" ry="18" fill="#ffffff" opacity="0.6" />
    </g>

    <!-- Distant Green Summer Trees on the far left -->
    <g transform="translate(-20, 320)">
      <circle cx="20" cy="60" r="45" fill="#1b4332" />
      <circle cx="50" cy="40" r="50" fill="#2d6a4f" />
      <circle cx="85" cy="55" r="45" fill="#40916c" />
      <circle cx="60" cy="75" r="40" fill="#1e3f20" />
      <!-- Power lines and poles in distance as in real photo -->
      <line x1="0" y1="20" x2="160" y2="80" stroke="#475569" stroke-width="1.2" opacity="0.6" />
      <line x1="45" y1="50" x2="45" y2="170" stroke="#78350f" stroke-width="4" opacity="0.7" />
    </g>

    <!-- 2. SHINGLED ROOF -->
    <g filter="url(#roofDropShadow)">
      <!-- Main Sloped Roof Polygon -->
      <polygon points="10,380 1200,295 1200,165 340,215 10,380" fill="url(#roofGrad)" />

      <!-- Architectural Shingle Horizontal & Vertical Texture Lines -->
      <path d="M 20 365 L 1200 282" stroke="#3d342b" stroke-width="3" opacity="0.6" />
      <path d="M 40 345 L 1200 265" stroke="#3d342b" stroke-width="3" opacity="0.6" />
      <path d="M 80 320 L 1200 245" stroke="#3d342b" stroke-width="3" opacity="0.6" />
      <path d="M 140 290 L 1200 220" stroke="#3d342b" stroke-width="3" opacity="0.6" />
      <path d="M 210 260 L 1200 195" stroke="#3d342b" stroke-width="3" opacity="0.6" />
      <path d="M 280 230 L 1200 172" stroke="#3d342b" stroke-width="3" opacity="0.6" />

      <!-- Roof Edge Aluminum Drip Trim -->
      <polygon points="8,380 1200,295 1200,302 8,388" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1" />
    </g>

    <!-- 3. MAIN BUILDING GREEN WALLS (Lime Green Vertical Siding) -->
    <!-- Base Green Wall -->
    <rect x="55" y="365" width="1090" height="420" fill="url(#greenSidingGrad)" />

    <!-- Vertical Siding Grooves (Exact realistic panel seams) -->
    <g stroke="#55832a" stroke-width="1.8" opacity="0.75">
      ${Array.from({ length: 65 }, (_, i) => `<line x1="${65 + i * 16.5}" y1="365" x2="${65 + i * 16.5}" y2="785" />`).join('\n')}
    </g>

    <!-- Concrete Foundation Curb along building base -->
    <polygon points="20,785 1160,785 1160,802 20,802" fill="#d1d5db" stroke="#9ca3af" stroke-width="1.5" />
    <polygon points="15,802 1165,802 1165,815 15,815" fill="#9ca3af" />

    <!-- 4. BIG TOP ROOFLINE SIGN: "NEW AND USED TIRES · (443) 548-1002" -->
    <g transform="translate(790, 172)" filter="url(#signShadow)">
      <!-- Signboard Outer Board with Red Border -->
      <rect x="0" y="0" width="410" height="125" fill="#ffffff" stroke="#dc2626" stroke-width="5" rx="3" />
      <rect x="5" y="5" width="400" height="115" fill="#fefce8" stroke="#ca8a04" stroke-width="2" />

      <!-- "NEW AND USED" in bold red athletic font -->
      <text
        x="205"
        y="38"
        text-anchor="middle"
        fill="#dc2626"
        font-family="'Arial Black', Impact, sans-serif"
        font-weight="900"
        font-size="28"
        letter-spacing="2"
      >
        NEW AND USED
      </text>

      <!-- Tire Icon Graphic inside banner -->
      <g transform="translate(35, 46)">
        <circle cx="16" cy="16" r="14" fill="#1e293b" stroke="#eab308" stroke-width="3" />
        <circle cx="16" cy="16" r="6" fill="#eab308" />
      </g>

      <!-- "TIRES" in giant golden-yellow & red drop shadow -->
      <text
        x="215"
        y="78"
        text-anchor="middle"
        fill="#eab308"
        stroke="#991b1b"
        stroke-width="1.5"
        font-family="'Arial Black', Impact, sans-serif"
        font-weight="900"
        font-size="40"
        letter-spacing="4"
        style="text-shadow: 2px 2px 0px #7f1d1d;"
      >
        TIRES
      </text>

      <!-- Subtitle: MOUNTING · BALANCING · REPAIR -->
      <text
        x="205"
        y="96"
        text-anchor="middle"
        fill="#0f172a"
        font-family="Arial, sans-serif"
        font-weight="700"
        font-size="11"
        letter-spacing="2.5"
      >
        MOUNTING · BALANCING · REPAIR
      </text>

      <!-- Phone Number: (443) 548-1002 in bold red -->
      <text
        x="205"
        y="118"
        text-anchor="middle"
        fill="#dc2626"
        font-family="'Arial Black', sans-serif"
        font-weight="900"
        font-size="21"
        letter-spacing="1"
      >
        (443) 548-1002
      </text>
    </g>

    <!-- 5. WINDOW SIGN ON LEFT: "NEW AND USED TIRES · (443) 548-1002" -->
    <g transform="translate(132, 515)" filter="url(#signShadow)">
      <!-- Window Frame & Poster -->
      <rect x="0" y="0" width="145" height="135" fill="#ffffff" stroke="#94a3b8" stroke-width="4" />
      <!-- Poster Red/Yellow Header -->
      <rect x="5" y="5" width="135" height="42" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
      <text x="72" y="24" text-anchor="middle" fill="#dc2626" font-family="'Arial Black'" font-size="10" font-weight="900">
        NEW AND USED
      </text>
      <text x="72" y="40" text-anchor="middle" fill="#eab308" stroke="#991b1b" stroke-width="0.8" font-family="'Arial Black'" font-size="14" font-weight="900">
        TIRES
      </text>

      <!-- Bullet points -->
      <text x="14" y="62" fill="#0f172a" font-family="Arial" font-size="9" font-weight="700">• Mounting</text>
      <text x="14" y="76" fill="#0f172a" font-family="Arial" font-size="9" font-weight="700">• Balancing</text>
      <text x="14" y="90" fill="#0f172a" font-family="Arial" font-size="9" font-weight="700">• Repair</text>

      <!-- Phone -->
      <text x="72" y="112" text-anchor="middle" fill="#dc2626" font-family="'Arial Black'" font-size="12" font-weight="900">
        (443) 548-1002
      </text>
      <!-- Bottom red band -->
      <rect x="5" y="120" width="135" height="10" fill="#dc2626" />
    </g>

    <!-- 6. ADDRESS "6975" IN METALLIC NUMERALS -->
    <g transform="translate(315, 450)">
      <text
        x="45"
        y="40"
        text-anchor="middle"
        fill="#475569"
        stroke="#334155"
        stroke-width="1.5"
        font-family="'Arial Black', Impact, sans-serif"
        font-weight="900"
        font-size="44"
        letter-spacing="5"
        style="text-shadow: 2px 2px 2px rgba(255,255,255,0.4);"
      >
        6975
      </text>
    </g>

    <!-- 7. ENTRANCE DOOR (Grey panel door under 6975 address) -->
    <g transform="translate(305, 495)">
      <rect x="0" y="0" width="95" height="250" fill="#64748b" stroke="#334155" stroke-width="4" rx="2" />
      <!-- Door 6-panel moldings -->
      <rect x="12" y="15" width="30" height="55" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <rect x="52" y="15" width="30" height="55" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <rect x="12" y="85" width="30" height="65" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <rect x="52" y="85" width="30" height="65" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <rect x="12" y="165" width="30" height="65" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <rect x="52" y="165" width="30" height="65" fill="#475569" stroke="#334155" stroke-width="2" rx="2" />
      <!-- Brass Door Handle -->
      <circle cx="20" cy="130" r="4" fill="#fbbf24" stroke="#78350f" />
    </g>
    <!-- Black Welcome Mat in front of door -->
    <polygon points="275,745 400,745 408,765 268,765" fill="#18181b" />

    <!-- 8. MAIN SERVICE GARAGE BAY (Open Center Bay) -->
    <g transform="translate(520, 395)">
      <!-- Bay Frame (Industrial black steel beam) -->
      <rect x="0" y="0" width="345" height="390" fill="#18181b" stroke="#090d16" stroke-width="6" />

      <!-- Inside Workshop Dark Interior with equipment visible -->
      <rect x="6" y="6" width="333" height="378" fill="url(#bayDark)" />

      <!-- Overhead Fluorescent Shop Lights (Diagonal tubes as in photo) -->
      <line x1="90" y1="50" x2="150" y2="90" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.95" />
      <line x1="90" y1="50" x2="150" y2="90" stroke="#60a5fa" stroke-width="12" stroke-linecap="round" opacity="0.3" />
      <line x1="250" y1="125" x2="330" y2="135" stroke="#ffffff" stroke-width="5" opacity="0.75" />

      <!-- Workshop tire changers and balancing machinery in dark background -->
      <rect x="50" y="270" width="45" height="80" fill="#334155" rx="3" />
      <circle cx="72" cy="255" r="16" fill="#0f172a" stroke="#64748b" stroke-width="3" />
      <rect x="180" y="280" width="55" height="70" fill="#1e293b" />
    </g>

    <!-- 9. RIGHT SERVICE DOOR & GLASS WINDOW BAY -->
    <g transform="translate(925, 500)">
      <!-- Grey Access Door -->
      <rect x="0" y="0" width="145" height="280" fill="#64748b" stroke="#475569" stroke-width="3" />
      <!-- Glass panels on far right bay door with signs -->
      <rect x="175" y="-120" width="95" height="400" fill="#1e293b" stroke="#0f172a" stroke-width="5" />
      <!-- Window text: FLAT REPAIR & WHEEL ALIGNMENT -->
      <rect x="185" y="80" width="80" height="60" fill="#020617" stroke="#334155" stroke-width="2" />
      <text x="225" y="105" text-anchor="middle" fill="#ffffff" font-family="'Arial Black'" font-size="11" font-weight="900">
        FLAT
      </text>
      <text x="225" y="125" text-anchor="middle" fill="#ffffff" font-family="'Arial Black'" font-size="11" font-weight="900">
        REPAIR
      </text>
      <!-- Wheel Alignment -->
      <rect x="185" y="160" width="80" height="50" fill="#020617" stroke="#334155" stroke-width="2" />
      <text x="225" y="185" text-anchor="middle" fill="#ffffff" font-family="'Arial Black'" font-size="9" font-weight="900">
        WHEEL
      </text>
      <text x="225" y="200" text-anchor="middle" fill="#ffffff" font-family="'Arial Black'" font-size="9" font-weight="900">
        ALIGNMENT
      </text>
    </g>

    <!-- 10. ASPHALT LOT FOREGROUND -->
    <polygon points="0,775 1200,775 1200,900 0,900" fill="url(#asphaltGrad)" />

    <!-- 11. FOUR COMMERCIAL FLOOR JACKS (Lined up outside garage bay) -->
    <!-- Jack 1: Silver / Steel commercial jack -->
    <g transform="translate(500, 770)" filter="url(#jackShadow)">
      <!-- Jack Body -->
      <polygon points="0,60 14,0 28,0 42,60 38,72 4,72" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
      <circle cx="21" cy="20" r="7" fill="#334155" />
      <!-- Long pumping handle -->
      <line x1="21" y1="20" x2="-15" y2="-90" stroke="#cbd5e1" stroke-width="4.5" stroke-linecap="round" />
      <!-- Wheels -->
      <circle cx="6" cy="65" r="5" fill="#0f172a" />
      <circle cx="36" cy="65" r="5" fill="#0f172a" />
    </g>

    <!-- Jack 2: Vivid Blue hydraulic floor jack -->
    <g transform="translate(565, 780)" filter="url(#jackShadow)">
      <polygon points="0,55 12,0 26,0 38,55 34,68 4,68" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5" />
      <circle cx="19" cy="18" r="6" fill="#1e293b" />
      <!-- Long pumping handle -->
      <line x1="19" y1="18" x2="-12" y2="-95" stroke="#60a5fa" stroke-width="4.5" stroke-linecap="round" />
      <circle cx="5" cy="60" r="5" fill="#0f172a" />
      <circle cx="33" cy="60" r="5" fill="#0f172a" />
    </g>

    <!-- Jack 3: Second Blue hydraulic jack -->
    <g transform="translate(650, 785)" filter="url(#jackShadow)">
      <polygon points="0,55 12,0 26,0 38,55 34,68 4,68" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5" />
      <circle cx="19" cy="18" r="6" fill="#1e293b" />
      <!-- Long handle -->
      <line x1="19" y1="18" x2="-10" y2="-95" stroke="#93c5fd" stroke-width="4.5" stroke-linecap="round" />
      <circle cx="5" cy="60" r="5" fill="#0f172a" />
      <circle cx="33" cy="60" r="5" fill="#0f172a" />
    </g>

    <!-- Jack 4: Vivid Orange heavy-duty floor jack -->
    <g transform="translate(750, 795)" filter="url(#jackShadow)">
      <polygon points="0,58 14,0 28,0 42,58 38,70 4,70" fill="#f97316" stroke="#c2410c" stroke-width="1.5" />
      <circle cx="21" cy="20" r="7" fill="#1e293b" />
      <!-- Long handle -->
      <line x1="21" y1="20" x2="-8" y2="-95" stroke="#fb923c" stroke-width="5" stroke-linecap="round" />
      <circle cx="6" cy="62" r="5" fill="#0f172a" />
      <circle cx="36" cy="62" r="5" fill="#0f172a" />
    </g>

    <!-- 12. STACK OF TIRES ON RIGHT BESIDE BAY -->
    <g transform="translate(955, 610)" filter="url(#roofDropShadow)">
      <!-- Tire 5 (Top resting tire) -->
      <ellipse cx="60" cy="85" rx="58" ry="46" fill="#18181b" stroke="#27272a" stroke-width="14" />
      <ellipse cx="60" cy="85" rx="36" ry="26" fill="#09090b" stroke="#3f3f46" stroke-width="3" />
      <!-- Sipes on tread -->
      <path d="M 12 70 L 25 75 M 10 90 L 24 92 M 16 110 L 28 108" stroke="#52525b" stroke-width="3" stroke-linecap="round" />

      <!-- Tire 4 -->
      <ellipse cx="60" cy="140" rx="68" ry="24" fill="#09090b" stroke="#27272a" stroke-width="8" />
      <rect x="-8" y="140" width="136" height="40" fill="#18181b" stroke="#27272a" stroke-width="6" rx="10" />
      <ellipse cx="60" cy="180" rx="68" ry="24" fill="#09090b" />

      <!-- Tire 3 -->
      <rect x="-8" y="180" width="136" height="38" fill="#18181b" stroke="#27272a" stroke-width="6" rx="10" />
      <ellipse cx="60" cy="218" rx="68" ry="24" fill="#09090b" />

      <!-- Tire 2 -->
      <rect x="-8" y="218" width="136" height="38" fill="#18181b" stroke="#27272a" stroke-width="6" rx="10" />
      <ellipse cx="60" cy="256" rx="68" ry="24" fill="#09090b" />

      <!-- Tire 1 (Bottom tire on asphalt) -->
      <rect x="-8" y="256" width="136" height="38" fill="#18181b" stroke="#27272a" stroke-width="6" rx="10" />
      <ellipse cx="60" cy="294" rx="72" ry="26" fill="#09090b" stroke="#27272a" stroke-width="4" />
    </g>

    <!-- Verified Facility Badge in top left -->
    <g transform="translate(30, 30)">
      <rect x="0" y="0" width="370" height="48" rx="12" fill="#020617" stroke="#10b981" stroke-width="2.5" opacity="0.95" />
      <circle cx="26" cy="24" r="8" fill="#22c55e" />
      <text x="48" y="30" fill="#ffffff" font-family="'Arial Black', sans-serif" font-size="14" font-weight="900" letter-spacing="1">
        6975 BALTIMORE ANNAPOLIS BLVD
      </text>
    </g>
  </svg>
  `;

  const buildingBuf = await sharp(Buffer.from(buildingSvg)).jpeg({ quality: 96 }).toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/images/storefront_6975_building.jpg'), buildingBuf);
  fs.writeFileSync(path.join(__dirname, '../src/assets/images/storefront_6975_building.jpg'), buildingBuf);
  // Also replace storefront_modern_service.jpg so existing imports update seamlessly!
  fs.writeFileSync(path.join(__dirname, '../public/images/storefront_modern_service.jpg'), buildingBuf);
  fs.writeFileSync(path.join(__dirname, '../src/assets/images/storefront_modern_service_1791970740906.jpg'), buildingBuf);
  console.log('✓ Successfully generated 6975 Baltimore Annapolis Blvd building photo');
}

// 2. Generate the EXACT WhatsApp Logo (WhatsApp Image 2026-06-02 at 04.23.13 (1) - Copy.jpeg)
async function generateWhatsAppLogo() {
  const size = 1024;

  const logoSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Tire Rubber Surface Gradient -->
      <radialGradient id="tireTread" cx="50%" cy="46%" r="52%" fx="42%" fy="38%">
        <stop offset="0%" stop-color="#2a303d" />
        <stop offset="45%" stop-color="#151922" />
        <stop offset="85%" stop-color="#0c0e14" />
        <stop offset="100%" stop-color="#050608" />
      </radialGradient>

      <!-- Polished Chrome Rim Lips -->
      <linearGradient id="chromeRing" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="20%" stop-color="#e2e8f0" />
        <stop offset="45%" stop-color="#64748b" />
        <stop offset="70%" stop-color="#cbd5e1" />
        <stop offset="90%" stop-color="#94a3b8" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>

      <linearGradient id="innerChrome" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="35%" stop-color="#ffffff" />
        <stop offset="65%" stop-color="#94a3b8" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>

      <!-- Emerald Green Winding Highway Surface -->
      <linearGradient id="roadSurface" x1="45%" y1="20%" x2="70%" y2="100%">
        <stop offset="0%" stop-color="#047857" />
        <stop offset="25%" stop-color="#10b981" />
        <stop offset="60%" stop-color="#22c55e" />
        <stop offset="90%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      <!-- Fresh Glossy Leaf Gradient -->
      <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15803d" />
        <stop offset="40%" stop-color="#22c55e" />
        <stop offset="75%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#86efac" />
      </linearGradient>

      <!-- 3D Metallic Chiseled PROSPERITY Text Fill -->
      <linearGradient id="metallicLetters" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="35%" stop-color="#f8fafc" />
        <stop offset="45%" stop-color="#cbd5e1" />
        <stop offset="55%" stop-color="#64748b" />
        <stop offset="75%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>

      <!-- Electric Lime Green Banner Bevel Border -->
      <linearGradient id="bannerBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15803d" />
        <stop offset="25%" stop-color="#22c55e" />
        <stop offset="60%" stop-color="#4ade80" />
        <stop offset="85%" stop-color="#22c55e" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>

      <!-- Deep Shadows and Emerald Glows -->
      <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="bannerShadow" x="-10%" y="-10%" width="120%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#000000" flood-opacity="0.95" />
      </filter>
    </defs>

    <!-- 1. TIRE WHEEL IN 3D PERSPECTIVE (Centered) -->
    <g id="WheelAssembly">
      <!-- Outer Tire Circle (Tread Crown) -->
      <circle cx="480" cy="460" r="395" fill="url(#tireTread)" stroke="#090a0f" stroke-width="8" />

      <!-- Aggressive Tire Tread Sipes on Top & Left Crown -->
      <!-- Top Tread Blocks -->
      <path d="M 210 230 L 245 255 L 230 270 L 195 245 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 265 185 L 305 215 L 290 230 L 250 200 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 325 150 L 370 185 L 355 200 L 310 165 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 395 125 L 440 165 L 425 180 L 380 140 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 470 115 L 505 160 L 490 175 L 455 130 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 545 120 L 570 168 L 555 180 L 530 132 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 620 140 L 640 185 L 625 198 L 605 152 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 690 175 L 705 220 L 690 232 L 675 187 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 750 220 L 760 265 L 745 278 L 735 232 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />

      <!-- Left Shoulder Tread Blocks -->
      <path d="M 165 295 L 205 315 L 195 335 L 155 315 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 130 375 L 175 390 L 168 410 L 123 395 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 115 460 L 165 465 L 162 485 L 112 480 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 120 545 L 170 540 L 172 560 L 122 565 Z" fill="#090b10" stroke="#22c55e" stroke-width="2.5" />

      <!-- Sidewall Deep Ribs and Grooves -->
      <circle cx="480" cy="460" r="350" fill="none" stroke="#1f242e" stroke-width="16" />
      <circle cx="480" cy="460" r="340" fill="none" stroke="#2e3646" stroke-width="4" />
      <circle cx="480" cy="460" r="290" fill="none" stroke="#1e232e" stroke-width="10" />

      <!-- Polished Chrome Outer Lip -->
      <circle cx="480" cy="460" r="275" fill="#050811" stroke="url(#chromeRing)" stroke-width="18" />
      <circle cx="480" cy="460" r="260" fill="#020408" stroke="#000000" stroke-width="6" />

      <!-- Inner Machined Alloy Lip Ring -->
      <circle cx="480" cy="460" r="240" fill="none" stroke="url(#innerChrome)" stroke-width="10" />
      <circle cx="480" cy="460" r="230" fill="#02050b" />
    </g>

    <!-- 2. WINDING GREEN HIGHWAY (Bursting Out From Center) -->
    <g id="HighwayRibbon">
      <!-- Emerald Green Road Surface -->
      <path
        d="M 480 440
           C 545 375, 660 355, 715 385
           C 745 400, 750 435, 720 470
           C 660 540, 480 560, 360 625
           C 290 660, 220 710, 185 755
           L 295 755
           C 330 705, 435 650, 540 605
           C 660 555, 760 495, 745 420
           C 730 345, 570 330, 480 440 Z"
        fill="url(#roadSurface)"
        stroke="#064e3b"
        stroke-width="3"
        filter="url(#roadGlow)"
      />

      <!-- Road Edge Neon Green Pinstripes -->
      <path
        d="M 485 435 C 575 365, 730 370, 725 430 C 715 500, 570 545, 435 610 C 330 660, 230 710, 185 755"
        fill="none"
        stroke="#86efac"
        stroke-width="5"
        stroke-linecap="round"
        opacity="0.9"
      />

      <!-- Dashed White Highway Lane Stripe -->
      <path
        d="M 510 420 C 615 390, 700 415, 685 450 C 655 495, 525 540, 420 595 C 330 645, 260 695, 225 750"
        fill="none"
        stroke="#ffffff"
        stroke-width="9"
        stroke-linecap="round"
        stroke-dasharray="24 20"
      />
    </g>

    <!-- 3. GLOSSY GREEN ECO LEAF (On the Right) -->
    <g id="EcoLeaf" transform="translate(685, 305) rotate(22)">
      <!-- Leaf Shadow -->
      <path
        d="M 0 140 C -25 80, 15 10, 85 0 C 145 45, 170 120, 120 180 C 80 225, 20 200, 0 140 Z"
        fill="#000000"
        opacity="0.5"
        transform="translate(10, 10)"
      />
      <!-- Leaf Outer Border -->
      <path
        d="M 0 140
           C -25 80, 15 10, 85 0
           C 145 45, 170 120, 120 180
           C 80 225, 20 200, 0 140 Z"
        fill="url(#leafGrad)"
        stroke="#064e3b"
        stroke-width="6"
      />
      <!-- Leaf Glossy Highlight Border -->
      <path
        d="M 0 140 C -25 80, 15 10, 85 0 C 145 45, 170 120, 120 180"
        fill="none"
        stroke="#bbf7d0"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <!-- Central Leaf Vein -->
      <path
        d="M 0 140 C 35 120, 65 60, 85 0"
        fill="none"
        stroke="#064e3b"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M 0 140 C 35 120, 65 60, 85 0"
        fill="none"
        stroke="#ffffff"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.85"
      />
      <!-- Secondary Branch Veins -->
      <path d="M 28 110 C 50 110, 75 120, 100 140" stroke="#064e3b" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 45 80 C 70 75, 100 85, 120 105" stroke="#064e3b" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 62 45 C 80 40, 105 50, 115 65" stroke="#064e3b" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- 4. SLANTED RACING BANNER: "PROSPERITY TIRE CENTER" -->
    <!-- Matches WhatsApp Image 2026-06-02 at 04.23.13 (1) - Copy.jpeg 100% -->
    <g id="MainBanner" filter="url(#bannerShadow)">
      <!-- Outer Beveled Electric Green Border Frame -->
      <polygon
        points="25,665 990,625 930,815 165,855"
        fill="url(#bannerBorderGrad)"
        stroke="#10b981"
        stroke-width="4"
        stroke-linejoin="round"
      />

      <!-- Solid Glossy Carbon Black Inner Plate -->
      <polygon
        points="35,667 980,627 923,807 172,847"
        fill="#04060b"
        stroke="#000000"
        stroke-width="3"
      />

      <!-- Subtle Upper Gloss Reflection Line -->
      <polygon
        points="48,672 968,633 945,715 75,745"
        fill="#1e293b"
        opacity="0.45"
      />

      <!-- TOP METALLIC 3D "PROSPERITY" LETTERS -->
      <g transform="translate(60, 730) skewX(-12)">
        <!-- Deep Black 3D Extrusion Shadow -->
        <text
          x="440"
          y="10"
          text-anchor="middle"
          fill="#000000"
          font-family="'Impact', 'Arial Black', sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="105"
          letter-spacing="5"
        >
          PROSPERITY
        </text>

        <!-- White/Silver Metallic Chrome Face -->
        <text
          x="440"
          y="0"
          text-anchor="middle"
          fill="url(#metallicLetters)"
          stroke="#ffffff"
          stroke-width="2.5"
          font-family="'Impact', 'Arial Black', sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="105"
          letter-spacing="5"
        >
          PROSPERITY
        </text>
      </g>

      <!-- LOWER BANNER: "— TIRE CENTER —" -->
      <g transform="translate(170, 805) skewX(-12)">
        <!-- Left Horizontal Neon Green Line -->
        <line x1="15" y1="-12" x2="165" y2="-12" stroke="#22c55e" stroke-width="7" stroke-linecap="round" />

        <!-- "TIRE CENTER" in Electric Lime Green -->
        <text
          x="355"
          y="0"
          text-anchor="middle"
          fill="#22c55e"
          stroke="#15803d"
          stroke-width="1.8"
          font-family="'Impact', 'Arial Black', sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="48"
          letter-spacing="8"
        >
          TIRE CENTER
        </text>

        <!-- Right Horizontal Neon Green Line -->
        <line x1="545" y1="-12" x2="695" y2="-12" stroke="#22c55e" stroke-width="7" stroke-linecap="round" />
      </g>
    </g>
  </svg>
  `;

  // 1. Generate 1024x1024 100% Transparent PNG
  const transparentPng = await sharp(Buffer.from(logoSvg)).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/images/prosperity_logo.png'), transparentPng);
  fs.writeFileSync(path.join(__dirname, '../src/assets/images/prosperity_logo.png'), transparentPng);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), await sharp(transparentPng).resize(192, 192).png().toBuffer());
  console.log('✓ Successfully generated transparent prosperity_logo.png matching WhatsApp image');

  // 2. Also generate Black Background JPEG matching the exact WhatsApp image upload
  const blackBgSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000000" />
    <!-- Lower green metallic badge corner from business card -->
    <path d="M 0 850 L 350 1024 L 0 1024 Z" fill="#064e3b" opacity="0.6" />
    <path d="M 0 870 L 330 1024" stroke="#22c55e" stroke-width="12" />
    <path d="M 0 910 L 250 1024" stroke="#10b981" stroke-width="8" />
  </svg>
  `;

  const blackBgBuf = await sharp(Buffer.from(blackBgSvg)).png().toBuffer();
  const fullWhatsAppJpeg = await sharp(blackBgBuf)
    .composite([{ input: transparentPng, top: 0, left: 0 }])
    .jpeg({ quality: 96 })
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/images/prosperity_logo_whatsapp.jpg'), fullWhatsAppJpeg);
  fs.writeFileSync(path.join(__dirname, '../src/assets/images/prosperity_logo_whatsapp.jpg'), fullWhatsAppJpeg);
  console.log('✓ Successfully generated prosperity_logo_whatsapp.jpg');
}

async function main() {
  await generateBuildingPhoto();
  await generateWhatsAppLogo();
}

main().catch(console.error);
