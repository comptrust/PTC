const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createTruckPhoto() {
  const width = 1200;
  const height = 675; // 16:9

  // Create an authentic, photorealistic mobile service truck scene
  // Overlaying the vehicle livery, workshop equipment, and official flyer
  const backgroundSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="60%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>

      <linearGradient id="asphaltGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e2430" />
        <stop offset="50%" stop-color="#131720" />
        <stop offset="100%" stop-color="#090b10" />
      </linearGradient>

      <linearGradient id="truckBodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#f1f5f9" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>

      <linearGradient id="greenWrap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#064e3b" />
        <stop offset="25%" stop-color="#10b981" />
        <stop offset="70%" stop-color="#22c55e" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>

      <linearGradient id="chromeMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="#94a3b8" />
        <stop offset="70%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#475569" />
      </linearGradient>

      <linearGradient id="tintedGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#050811" stop-opacity="0.95" />
      </linearGradient>

      <filter id="truckShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.8" />
      </filter>

      <filter id="neonStrobe" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Scenic Background: Metropolitan highway & modern automotive facility backdrop -->
    <rect width="${width}" height="${height}" fill="url(#skyGrad)" />

    <!-- Distant City & Horizon Glow -->
    <rect x="0" y="280" width="${width}" height="140" fill="#090d16" opacity="0.8" />
    <ellipse cx="600" cy="380" rx="600" ry="80" fill="#10b981" opacity="0.08" />

    <!-- Asphalt Surface with Road Markings -->
    <rect x="0" y="420" width="${width}" height="255" fill="url(#asphaltGrad)" />
    <!-- Yellow road shoulder line -->
    <line x1="0" y1="480" x2="${width}" y2="480" stroke="#ca8a04" stroke-width="6" opacity="0.6" stroke-dasharray="60 40" />

    <!-- Ground Contact Shadow of the Truck -->
    <ellipse cx="580" cy="570" rx="490" ry="25" fill="#000000" opacity="0.75" />

    <!-- PHOTOREALISTIC FORD E-SERIES MOBILE TIRE TRUCK -->
    <g id="CommercialTruck" filter="url(#truckShadow)">
      <!-- Main Cab & Box Body -->
      <!-- Rear Box Section -->
      <path
        d="M 120 180
           L 820 180
           L 865 245
           L 1020 280
           C 1055 290, 1070 320, 1070 370
           L 1070 480
           C 1070 495, 1055 505, 1040 505
           L 980 505
           C 980 440, 905 440, 905 505
           L 490 505
           C 490 440, 410 440, 410 505
           L 110 505
           C 95 505, 90 495, 90 480
           L 90 200
           C 90 185, 105 180, 120 180 Z"
        fill="url(#truckBodyGrad)"
        stroke="#94a3b8"
        stroke-width="3"
      />

      <!-- Cab Aerodynamic Roof Wind Fairing -->
      <path
        d="M 820 180
           C 850 180, 890 190, 915 240
           L 825 245 Z"
        fill="#f8fafc"
        stroke="#cbd5e1"
        stroke-width="2"
      />

      <!-- Amber Roof Safety Strobe Bar (Flashing Roadside Service) -->
      <rect x="850" y="165" width="90" height="15" rx="5" fill="#f59e0b" filter="url(#neonStrobe)" />
      <rect x="865" y="167" width="20" height="11" rx="3" fill="#ffffff" />
      <rect x="905" y="167" width="20" height="11" rx="3" fill="#ffffff" />

      <!-- Side Blue Racing Stripes (Signature Ford Commercial Livery) -->
      <g opacity="0.85">
        <path d="M 90 405 L 1065 405" stroke="#1d4ed8" stroke-width="5" />
        <path d="M 90 417 L 1065 417" stroke="#1d4ed8" stroke-width="3.5" />
        <path d="M 90 426 L 1065 426" stroke="#1d4ed8" stroke-width="2.5" />
        <path d="M 90 433 L 1065 433" stroke="#1d4ed8" stroke-width="1.8" />
      </g>

      <!-- PROSPERITY EMERALD GREEN BODY WRAP -->
      <path
        d="M 180 340
           L 810 340
           L 795 400
           L 180 400 Z"
        fill="url(#greenWrap)"
      />
      <!-- Livery Headline on Truck -->
      <text
        x="490"
        y="378"
        text-anchor="middle"
        fill="#ffffff"
        font-family="'Arial Black', 'Impact', sans-serif"
        font-weight="900"
        font-style="italic"
        font-size="28"
        letter-spacing="2.5"
      >
        PROSPERITY MOBILE TIRE SERVICE
      </text>
      <text
        x="490"
        y="395"
        text-anchor="middle"
        fill="#86efac"
        font-family="'Arial Black', sans-serif"
        font-weight="900"
        font-size="13"
        letter-spacing="4"
      >
        WE COME TO YOU · (888) 375-9048
      </text>

      <!-- Passenger Side Service Fold-Out Double Doors (Transparent Glass) -->
      <g transform="translate(730, 240)">
        <rect x="0" y="0" width="85" height="260" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="3" />
        <line x1="42" y1="0" x2="42" y2="260" stroke="#334155" stroke-width="2.5" />
        <!-- Tinted Glass Panels -->
        <rect x="8" y="15" width="28" height="150" rx="4" fill="url(#tintedGlass)" stroke="#1e293b" stroke-width="2" />
        <rect x="49" y="15" width="28" height="150" rx="4" fill="url(#tintedGlass)" stroke="#1e293b" stroke-width="2" />
        <!-- Interior equipment visible through glass: Computerized wheel balancer & LED screen -->
        <circle cx="22" cy="90" r="10" fill="#0f172a" stroke="#22c55e" stroke-width="2" />
        <rect x="55" y="75" width="16" height="12" rx="2" fill="#22c55e" opacity="0.8" />
        <!-- Chrome door handles -->
        <rect x="36" y="125" width="12" height="7" rx="1.5" fill="url(#chromeMetal)" />
      </g>

      <!-- Side Tinted Windows -->
      <rect x="140" y="235" width="160" height="95" rx="10" fill="url(#tintedGlass)" stroke="#334155" stroke-width="3" />
      <rect x="325" y="235" width="200" height="95" rx="10" fill="url(#tintedGlass)" stroke="#334155" stroke-width="3" />
      <rect x="550" y="235" width="160" height="95" rx="10" fill="url(#tintedGlass)" stroke="#334155" stroke-width="3" />

      <!-- Cab Windshield & Driver Door -->
      <path
        d="M 845 250
           L 915 250
           L 980 295
           L 845 295 Z"
        fill="url(#tintedGlass)"
        stroke="#334155"
        stroke-width="2.5"
      />
      <!-- Cab Sun Visor -->
      <path d="M 870 238 L 995 278 L 980 286 L 858 248 Z" fill="#064e3b" stroke="#22c55e" stroke-width="2" />
      <text x="925" y="267" text-anchor="middle" fill="#4ade80" font-family="'Arial Black'" font-size="10" font-weight="900" letter-spacing="1">
        PROSPERITY
      </text>

      <!-- Front Chrome Ford Grille, Bumper, and Headlights -->
      <path d="M 1025 295 L 1068 310 L 1068 400 L 1025 400 Z" fill="url(#chromeMetal)" stroke="#64748b" stroke-width="2" />
      <!-- High-Intensity Halogen Headlight -->
      <rect x="1032" y="325" width="28" height="48" rx="5" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
      <!-- Heavy-Duty Chrome Bumper -->
      <rect x="1015" y="440" width="65" height="42" rx="7" fill="url(#chromeMetal)" stroke="#334155" stroke-width="2.5" />

      <!-- Wheels & Heavy Commercial Tires -->
      <!-- Front Wheel -->
      <g transform="translate(945, 505)">
        <circle cx="0" cy="0" r="62" fill="#090b10" stroke="#1f2937" stroke-width="14" />
        <circle cx="0" cy="0" r="46" fill="#020617" stroke="url(#chromeMetal)" stroke-width="7" />
        <circle cx="0" cy="0" r="18" fill="url(#chromeMetal)" />
        <circle cx="0" cy="0" r="6" fill="#10b981" />
      </g>

      <!-- Rear Dual Wheels -->
      <g transform="translate(450, 505)">
        <circle cx="0" cy="0" r="64" fill="#090b10" stroke="#1f2937" stroke-width="14" />
        <circle cx="0" cy="0" r="48" fill="#020617" stroke="url(#chromeMetal)" stroke-width="7" />
        <circle cx="0" cy="0" r="18" fill="url(#chromeMetal)" />
        <circle cx="0" cy="0" r="6" fill="#10b981" />
      </g>
    </g>

    <!-- BADGE & FLYER ON VEHICLE BODY -->
    <!-- The Official Promotional Flyer Mounted on Left Body Panel -->
    <g transform="translate(150, 240)">
      <rect x="0" y="0" width="250" height="90" rx="8" fill="#022c22" stroke="#22c55e" stroke-width="2.5" />
      <!-- Flyer Title Bar -->
      <rect x="0" y="0" width="250" height="22" rx="6" fill="#15803d" />
      <text x="125" y="15" text-anchor="middle" fill="#ffffff" font-family="'Arial Black'" font-size="10" font-weight="900" letter-spacing="1">
        ★ PROSPERITY SPECIAL OFFERS ★
      </text>
      <!-- Perks -->
      <text x="12" y="38" fill="#86efac" font-family="Arial" font-size="10" font-weight="900">• $20 FREE GASOLINE</text>
      <text x="155" y="38" fill="#ffffff" font-family="Arial" font-size="9">(With 4 Tires)</text>
      <text x="12" y="55" fill="#86efac" font-family="Arial" font-size="10" font-weight="900">• FREE LIFETIME ROTATION</text>
      <text x="170" y="55" fill="#ffffff" font-family="Arial" font-size="9">(Every 5k mi)</text>
      <text x="12" y="72" fill="#facc15" font-family="Arial" font-size="9.5" font-weight="900">• 15% OFF FEDEX &amp; AMAZON DRIVERS</text>
      <text x="12" y="84" fill="#93c5fd" font-family="Arial" font-size="8" font-weight="700">NO CREDIT NEEDED · 100-DAY PAYMENT OPTION</text>
    </g>

    <!-- Verified Fleet Status Tag -->
    <g transform="translate(40, 40)">
      <rect x="0" y="0" width="310" height="42" rx="10" fill="#020617" stroke="#10b981" stroke-width="2" opacity="0.9" />
      <circle cx="24" cy="21" r="7" fill="#22c55e" />
      <text x="44" y="26" fill="#ffffff" font-family="Arial" font-size="13" font-weight="800">
        FLEET UNIT #1 · DISPATCH ACTIVE
      </text>
    </g>
  </svg>
  `;

  // Render SVG to Buffer
  const baseImg = await sharp(Buffer.from(backgroundSvg)).png().toBuffer();

  // Overlay the user's authentic logo PNG onto the truck!
  const logoPath = path.join(__dirname, '../public/images/prosperity_logo.png');
  let finalComposite = baseImg;

  if (fs.existsSync(logoPath)) {
    // Resize logo to fit nicely on the truck side
    const resizedLogo = await sharp(logoPath)
      .resize(130, 130)
      .png()
      .toBuffer();

    finalComposite = await sharp(baseImg)
      .composite([
        {
          input: resizedLogo,
          top: 220,
          left: 565,
        },
      ])
      .jpeg({ quality: 95 })
      .toBuffer();
  } else {
    finalComposite = await sharp(baseImg).jpeg({ quality: 95 }).toBuffer();
  }

  // Save to public and src
  fs.writeFileSync(path.join(__dirname, '../public/images/prosperity_mobile_truck.jpg'), finalComposite);
  fs.writeFileSync(path.join(__dirname, '../src/assets/images/prosperity_mobile_truck.jpg'), finalComposite);
  console.log('✓ Successfully created prosperity_mobile_truck.jpg in public and src/assets/images');
}

createTruckPhoto().catch(console.error);
