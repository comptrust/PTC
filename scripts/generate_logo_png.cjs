const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create authentic Prosperity Tire Center Logo SVG with 100% transparency
const logoSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tire rubber shading -->
    <radialGradient id="tireWall" cx="50%" cy="46%" r="50%" fx="45%" fy="40%">
      <stop offset="0%" stop-color="#2a2e39" />
      <stop offset="60%" stop-color="#14171f" />
      <stop offset="100%" stop-color="#08090d" />
    </radialGradient>

    <!-- Chrome Rim Gradients -->
    <linearGradient id="chromeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#cbd5e1" />
      <stop offset="50%" stop-color="#64748b" />
      <stop offset="75%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>

    <linearGradient id="rimDeep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- Emerald Highway Road Gradient -->
    <linearGradient id="roadSurface" x1="30%" y1="20%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="35%" stop-color="#22c55e" />
      <stop offset="70%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#14532d" />
    </linearGradient>

    <!-- Leaf Green Gradient -->
    <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#86efac" />
    </linearGradient>

    <!-- Metallic Lettering Gradient for PROSPERITY -->
    <linearGradient id="metallicText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="42%" stop-color="#f8fafc" />
      <stop offset="45%" stop-color="#cbd5e1" />
      <stop offset="65%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Neon Green Banner Border Gradient -->
    <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#16a34a" />
    </linearGradient>

    <!-- Shadow filter -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="bannerShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.9" />
    </filter>
  </defs>

  <!-- Ground Contact Shadow (Soft alpha ellipse under tire) -->
  <ellipse cx="512" cy="880" rx="360" ry="32" fill="#000000" opacity="0.65" filter="url(#softGlow)" />

  <!-- TIRE ASSEMBLY -->
  <!-- Outer Tire Outer Ring Profile -->
  <g id="Tire">
    <!-- Outer tire black rubber -->
    <circle cx="512" cy="470" r="380" fill="url(#tireWall)" stroke="#111319" stroke-width="6" />

    <!-- Outer Tread Blocks (Angled teeth around tire crown) -->
    <!-- Top & Left Tread Pattern -->
    <path d="M 240 220 L 270 245 L 255 260 L 225 235 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 290 175 L 325 205 L 310 220 L 275 190 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 350 140 L 390 175 L 375 190 L 335 155 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 420 115 L 460 155 L 445 170 L 405 130 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 500 105 L 530 150 L 515 165 L 485 120 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 580 110 L 600 155 L 615 150 L 595 105 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 660 130 L 675 175 L 690 170 L 675 125 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 735 165 L 745 210 L 760 205 L 750 160 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />

    <!-- Left side tread lugs -->
    <path d="M 190 290 L 225 310 L 215 328 L 180 308 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 155 370 L 195 385 L 188 405 L 148 390 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 140 455 L 185 460 L 182 480 L 137 475 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />
    <path d="M 145 545 L 190 540 L 192 560 L 147 565 Z" fill="#0d0e12" stroke="#22c55e" stroke-width="2" />

    <!-- Tire Sidewall Grooves -->
    <circle cx="512" cy="470" r="340" fill="none" stroke="#2a303c" stroke-width="12" />
    <circle cx="512" cy="470" r="332" fill="none" stroke="#161920" stroke-width="3" />
    <circle cx="512" cy="470" r="280" fill="none" stroke="#333a47" stroke-width="8" />

    <!-- Outer Chrome Rim Lip -->
    <circle cx="512" cy="470" r="270" fill="url(#rimDeep)" stroke="url(#chromeHighlight)" stroke-width="14" />
    <circle cx="512" cy="470" r="260" fill="none" stroke="#000000" stroke-width="4" />

    <!-- 5 Heavy Polished Alloy Rim Spokes -->
    <g id="AlloySpokes">
      <!-- Spoke 1: Top Right -->
      <path d="M 512 470 L 610 265 L 670 295 L 545 485 Z" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="3" />
      <path d="M 525 460 L 615 275 L 635 285 L 538 472 Z" fill="#ffffff" opacity="0.4" />

      <!-- Spoke 2: Bottom Right -->
      <path d="M 512 470 L 690 530 L 660 590 L 512 505 Z" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="3" />

      <!-- Spoke 3: Bottom Left -->
      <path d="M 512 470 L 460 700 L 400 685 L 475 490 Z" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="3" />

      <!-- Spoke 4: Mid Left -->
      <path d="M 512 470 L 270 490 L 280 430 L 470 455 Z" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="3" />
      <path d="M 470 458 L 285 435 L 290 448 L 475 466 Z" fill="#ffffff" opacity="0.4" />

      <!-- Spoke 5: Top Left -->
      <path d="M 512 470 L 375 290 L 435 260 L 495 450 Z" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="3" />
      <path d="M 490 448 L 430 268 L 415 278 L 480 456 Z" fill="#ffffff" opacity="0.4" />

      <!-- Center Hub & 5 Lug Nuts -->
      <circle cx="512" cy="470" r="75" fill="url(#chromeHighlight)" stroke="#0f172a" stroke-width="5" />
      <circle cx="512" cy="470" r="45" fill="#090d16" stroke="#22c55e" stroke-width="4" />
      <!-- Lug nuts -->
      <circle cx="482" cy="440" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
      <circle cx="542" cy="440" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
      <circle cx="560" cy="490" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
      <circle cx="512" cy="522" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
      <circle cx="464" cy="490" r="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
    </g>
  </g>

  <!-- WINDING GREEN HIGHWAY (Curving out from wheel hub towards lower right) -->
  <g id="HighwayRoad">
    <!-- Green Road Ribbon Surface -->
    <path
      d="M 512 470
         C 580 440, 680 420, 725 440
         C 750 452, 755 475, 730 500
         C 680 550, 520 560, 390 620
         C 320 650, 240 700, 210 740
         L 320 740
         C 360 690, 480 635, 590 595
         C 700 555, 780 500, 765 440
         C 745 375, 595 380, 512 470 Z"
      fill="url(#roadSurface)"
      stroke="#14532d"
      stroke-width="3"
    />

    <!-- Outer Green Glow / Edge Highlight -->
    <path
      d="M 520 450 C 620 400, 760 410, 755 460 C 745 520, 620 560, 480 620 C 370 670, 260 720, 210 740"
      fill="none"
      stroke="#4ade80"
      stroke-width="5"
      stroke-linecap="round"
      opacity="0.9"
    />

    <!-- Dashed White Center Highway Line -->
    <path
      d="M 545 445 C 640 430, 725 450, 715 480 C 690 520, 570 560, 470 610 C 380 655, 300 700, 255 740"
      fill="none"
      stroke="#ffffff"
      stroke-width="8"
      stroke-linecap="round"
      stroke-dasharray="24 20"
      filter="url(#softGlow)"
    />
    <path
      d="M 545 445 C 640 430, 725 450, 715 480 C 690 520, 570 560, 470 610 C 380 655, 300 700, 255 740"
      fill="none"
      stroke="#ffffff"
      stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="24 20"
    />
  </g>

  <!-- FRESH GREEN LEAF (Positioned on the right of the winding road) -->
  <g id="GreenLeaf" transform="translate(680, 360) rotate(15)">
    <!-- Leaf Body -->
    <path
      d="M 0 120
         C -20 70, 10 10, 70 0
         C 120 40, 140 100, 100 150
         C 65 190, 15 170, 0 120 Z"
      fill="url(#leafGrad)"
      stroke="#14532d"
      stroke-width="4"
    />
    <!-- Leaf Outer Glow Border -->
    <path
      d="M 0 120 C -20 70, 10 10, 70 0 C 120 40, 140 100, 100 150"
      fill="none"
      stroke="#86efac"
      stroke-width="4"
      stroke-linecap="round"
      opacity="0.9"
    />
    <!-- Leaf Main Central Vein -->
    <path
      d="M 0 120 C 30 100, 55 50, 70 0"
      fill="none"
      stroke="#ffffff"
      stroke-width="4.5"
      stroke-linecap="round"
      opacity="0.9"
    />
    <!-- Leaf Secondary Veins -->
    <path d="M 22 95 C 40 95, 60 105, 80 120" stroke="#bbf7d0" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
    <path d="M 35 70 C 55 65, 80 75, 95 90" stroke="#bbf7d0" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
    <path d="M 50 40 C 65 35, 85 45, 90 55" stroke="#bbf7d0" stroke-width="2" stroke-linecap="round" opacity="0.8" />
  </g>

  <!-- MAIN BRANDING BANNER ("PROSPERITY TIRE CENTER") -->
  <!-- Slanted racing banner across lower center of tire with zero grey background box -->
  <g id="Banner" filter="url(#bannerShadow)" transform="translate(0, 10)">
    <!-- Neon Emerald Green Outer Border Shield -->
    <path
      d="M 40 680
         L 984 640
         L 920 810
         L 190 850
         Z"
      fill="none"
      stroke="url(#neonGreen)"
      stroke-width="12"
      stroke-linejoin="round"
    />

    <!-- Solid Glossy Black Inner Plate -->
    <path
      d="M 46 680
         L 978 642
         L 916 805
         L 194 845
         Z"
      fill="#050811"
      stroke="#10b981"
      stroke-width="3"
    />

    <!-- Carbon Fiber Subtle Inner Highlight -->
    <path
      d="M 55 686 L 968 649 L 945 705 L 85 735 Z"
      fill="#0f172a"
      opacity="0.6"
    />

    <!-- UPPER BANNER TEXT: "PROSPERITY" -->
    <!-- Large, bold, metallic chiseled italic typography -->
    <g transform="translate(68, 735) skewX(-12)">
      <!-- Black heavy shadow / bevel -->
      <text
        x="420"
        y="8"
        text-anchor="middle"
        fill="#000000"
        font-family="'Arial Black', 'Impact', 'Outfit', sans-serif"
        font-weight="900"
        font-style="italic"
        font-size="94"
        letter-spacing="5"
      >
        PROSPERITY
      </text>

      <!-- Main Metallic Chiseled Fill -->
      <text
        x="420"
        y="0"
        text-anchor="middle"
        fill="url(#metallicText)"
        stroke="#ffffff"
        stroke-width="2"
        font-family="'Arial Black', 'Impact', 'Outfit', sans-serif"
        font-weight="900"
        font-style="italic"
        font-size="94"
        letter-spacing="5"
      >
        PROSPERITY
      </text>
    </g>

    <!-- LOWER SUB-BANNER: "— TIRE CENTER —" -->
    <g transform="translate(180, 805) skewX(-12)">
      <!-- Left Neon Green Accent Line -->
      <line x1="10" y1="-12" x2="160" y2="-12" stroke="#22c55e" stroke-width="6" stroke-linecap="round" />

      <!-- "TIRE CENTER" in vivid electric green -->
      <text
        x="330"
        y="0"
        text-anchor="middle"
        fill="#22c55e"
        stroke="#15803d"
        stroke-width="1.5"
        font-family="'Arial Black', 'Impact', 'Outfit', sans-serif"
        font-weight="900"
        font-style="italic"
        font-size="44"
        letter-spacing="8"
      >
        TIRE CENTER
      </text>

      <!-- Right Neon Green Accent Line -->
      <line x1="500" y1="-12" x2="650" y2="-12" stroke="#22c55e" stroke-width="6" stroke-linecap="round" />
    </g>
  </g>
</svg>
`;

async function main() {
  const publicDir = path.join(__dirname, '../public/images');
  const srcAssetsDir = path.join(__dirname, '../src/assets/images');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });

  const svgBuffer = Buffer.from(logoSvg);

  // 1. Generate 1024x1024 Transparent PNG
  const png1024 = await sharp(svgBuffer).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.png'), png1024);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.png'), png1024);
  console.log('✓ Created 1024x1024 prosperity_logo.png (Transparent)');

  // 2. Generate 512x512 Transparent PNG
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo_512.png'), png512);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo_512.png'), png512);

  // 3. Generate Favicon PNG
  const favicon = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), favicon);
  console.log('✓ Created public/favicon.png');

  // Also save SVG for resolution-independent usage
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.svg'), logoSvg);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.svg'), logoSvg);
  console.log('✓ Created prosperity_logo.svg');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
