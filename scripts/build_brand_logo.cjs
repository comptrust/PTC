const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createLogoSvg() {
  return `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tire Rubber Gradient -->
    <radialGradient id="rubberGrad" cx="50%" cy="44%" r="52%" fx="42%" fy="38%">
      <stop offset="0%" stop-color="#2d333f" />
      <stop offset="35%" stop-color="#181b22" />
      <stop offset="75%" stop-color="#0c0e12" />
      <stop offset="100%" stop-color="#050608" />
    </radialGradient>

    <!-- Chrome Outer Rim Lip -->
    <linearGradient id="chromeRing" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="18%" stop-color="#e2e8f0" />
      <stop offset="35%" stop-color="#64748b" />
      <stop offset="55%" stop-color="#cbd5e1" />
      <stop offset="75%" stop-color="#94a3b8" />
      <stop offset="90%" stop-color="#475569" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <!-- Chrome Spoke Highlights -->
    <linearGradient id="spokeChrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#cbd5e1" />
      <stop offset="50%" stop-color="#475569" />
      <stop offset="75%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>

    <!-- Emerald Highway Ribbon -->
    <linearGradient id="roadSurface" x1="30%" y1="20%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="25%" stop-color="#10b981" />
      <stop offset="60%" stop-color="#22c55e" />
      <stop offset="85%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>

    <!-- Glossy Eco Leaf -->
    <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="30%" stop-color="#22c55e" />
      <stop offset="70%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#86efac" />
    </linearGradient>

    <!-- 3D Metallic Letters Fill -->
    <linearGradient id="metallicText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="28%" stop-color="#f8fafc" />
      <stop offset="48%" stop-color="#94a3b8" />
      <stop offset="70%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Neon Emerald Banner Border -->
    <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="20%" stop-color="#22c55e" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="80%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#166534" />
    </linearGradient>
  </defs>

  <g id="Emblem">
    <!-- 1. TIRE PROFILE & TREAD -->
    <g id="TireAssembly">
      <!-- Main outer tire circle -->
      <circle cx="512" cy="470" r="380" fill="url(#rubberGrad)" stroke="#0b0d12" stroke-width="8" />

      <!-- Outer Tread Blocks -->
      <path d="M 230 240 L 265 265 L 250 280 L 215 255 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 285 195 L 325 225 L 310 240 L 270 210 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 345 160 L 390 195 L 375 210 L 330 175 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 415 135 L 455 175 L 440 190 L 400 150 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 490 125 L 525 170 L 510 185 L 475 140 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 570 130 L 595 178 L 580 190 L 555 142 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 645 150 L 665 198 L 650 210 L 630 162 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 715 185 L 730 232 L 715 245 L 700 198 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 775 230 L 785 275 L 770 288 L 760 242 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />

      <!-- Left Shoulder Lugs -->
      <path d="M 185 300 L 225 320 L 215 340 L 175 320 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 150 375 L 195 390 L 188 410 L 143 395 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 135 460 L 185 465 L 182 485 L 132 480 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />
      <path d="M 140 545 L 190 540 L 192 560 L 142 565 Z" fill="#090a0e" stroke="#22c55e" stroke-width="2.5" />

      <!-- Sidewall Radial Grooves -->
      <circle cx="512" cy="470" r="340" fill="none" stroke="#252b36" stroke-width="12" />
      <circle cx="512" cy="470" r="330" fill="none" stroke="#141820" stroke-width="3" />
      <circle cx="512" cy="470" r="280" fill="none" stroke="#2c3340" stroke-width="8" />

      <!-- Outer Polished Chrome Lip -->
      <circle cx="512" cy="470" r="265" fill="#04060b" stroke="url(#chromeRing)" stroke-width="16" />
      <circle cx="512" cy="470" r="250" fill="none" stroke="#000000" stroke-width="5" />

      <!-- 5-Spoke Alloy Wheel -->
      <g id="AlloySpokes">
        <!-- Spoke 1: Top Right -->
        <path d="M 512 470 L 610 265 L 670 295 L 545 485 Z" fill="url(#spokeChrome)" stroke="#090d16" stroke-width="3" />
        <path d="M 525 460 L 615 275 L 635 285 L 538 472 Z" fill="#ffffff" opacity="0.4" />

        <!-- Spoke 2: Bottom Right -->
        <path d="M 512 470 L 690 530 L 660 590 L 512 505 Z" fill="url(#spokeChrome)" stroke="#090d16" stroke-width="3" />

        <!-- Spoke 3: Bottom Left -->
        <path d="M 512 470 L 460 700 L 400 685 L 475 490 Z" fill="url(#spokeChrome)" stroke="#090d16" stroke-width="3" />

        <!-- Spoke 4: Mid Left -->
        <path d="M 512 470 L 270 490 L 280 430 L 470 455 Z" fill="url(#spokeChrome)" stroke="#090d16" stroke-width="3" />
        <path d="M 470 458 L 285 435 L 290 448 L 475 466 Z" fill="#ffffff" opacity="0.4" />

        <!-- Spoke 5: Top Left -->
        <path d="M 512 470 L 375 290 L 435 260 L 495 450 Z" fill="url(#spokeChrome)" stroke="#090d16" stroke-width="3" />
        <path d="M 490 448 L 430 268 L 415 278 L 480 456 Z" fill="#ffffff" opacity="0.4" />

        <!-- Hub Ring & Center Cap -->
        <circle cx="512" cy="470" r="75" fill="url(#chromeRing)" stroke="#090d16" stroke-width="4" />
        <circle cx="512" cy="470" r="45" fill="#04060a" stroke="#22c55e" stroke-width="4" />
        <circle cx="512" cy="470" r="30" fill="#047857" />
        <path d="M 502 455 L 518 455 C 525 455 530 460 530 466 C 530 472 525 477 518 477 L 502 477 Z M 502 477 L 502 485" fill="none" stroke="#86efac" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Lug Nuts -->
        <circle cx="482" cy="440" r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
        <circle cx="542" cy="440" r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
        <circle cx="560" cy="490" r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
        <circle cx="512" cy="522" r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
        <circle cx="464" cy="490" r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
      </g>
    </g>

    <!-- 2. WINDING GREEN HIGHWAY RIBBON -->
    <g id="HighwayRibbon">
      <path
        d="M 512 450
           C 585 390, 700 370, 755 400
           C 785 418, 790 455, 760 490
           C 700 560, 520 580, 400 640
           C 325 675, 240 725, 205 770
           L 315 770
           C 350 720, 455 665, 560 620
           C 680 570, 780 510, 765 435
           C 750 360, 590 345, 512 450 Z"
        fill="url(#roadSurface)"
        stroke="#064e3b"
        stroke-width="3"
      />

      <!-- Vivid Neon Highway Outer Border -->
      <path
        d="M 515 445 C 610 375, 770 380, 765 440 C 755 510, 610 555, 475 620 C 370 670, 260 720, 205 770"
        fill="none"
        stroke="#86efac"
        stroke-width="5"
        stroke-linecap="round"
        opacity="0.95"
      />

      <!-- Dashed White Highway Center Line -->
      <path
        d="M 540 430 C 645 400, 740 425, 725 460 C 695 505, 565 550, 460 605 C 370 655, 295 705, 250 760"
        fill="none"
        stroke="#ffffff"
        stroke-width="9"
        stroke-linecap="round"
        stroke-dasharray="24 20"
      />
    </g>

    <!-- 3. GLOSSY ECO LEAF (On Upper Right Shoulder) -->
    <g id="EcoLeaf" transform="translate(720, 305) rotate(22)">
      <path
        d="M 0 140 C -25 80, 15 10, 85 0 C 145 45, 170 120, 120 180 C 80 225, 20 200, 0 140 Z"
        fill="#000000"
        opacity="0.5"
        transform="translate(10, 10)"
      />
      <path
        d="M 0 140
           C -25 80, 15 10, 85 0
           C 145 45, 170 120, 120 180
           C 80 225, 20 200, 0 140 Z"
        fill="url(#leafGrad)"
        stroke="#064e3b"
        stroke-width="6"
      />
      <path
        d="M 0 140 C -25 80, 15 10, 85 0 C 145 45, 170 120, 120 180"
        fill="none"
        stroke="#dcfce7"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <path
        d="M 0 140 C 35 120, 65 60, 85 0"
        fill="none"
        stroke="#ffffff"
        stroke-width="5"
        stroke-linecap="round"
        opacity="0.9"
      />
    </g>

    <!-- 4. MAIN INTEGRATED BRAND PLAQUE ("PROSPERITY TIRE CENTER") -->
    <g id="MainBanner" transform="translate(0, 20)">
      <!-- Outer Beveled Electric Neon Green Border Frame -->
      <polygon
        points="30,680 994,640 934,830 170,870"
        fill="url(#neonBorder)"
        stroke="#10b981"
        stroke-width="4"
        stroke-linejoin="round"
      />

      <!-- Solid Glossy Carbon Black Plate -->
      <polygon
        points="40,682 984,642 927,822 177,862"
        fill="#04060c"
        stroke="#000000"
        stroke-width="3"
      />

      <!-- Upper Glass Sheen Reflection -->
      <polygon
        points="53,687 972,648 950,727 80,757"
        fill="#1e293b"
        opacity="0.4"
      />

      <!-- PROSPERITY BRAND TYPOGRAPHY -->
      <g transform="translate(65, 747) skewX(-12)">
        <text
          x="445"
          y="9"
          text-anchor="middle"
          fill="#000000"
          font-family="system-ui, -apple-system, sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="95"
          letter-spacing="5"
        >
          PROSPERITY
        </text>

        <text
          x="445"
          y="0"
          text-anchor="middle"
          fill="url(#metallicText)"
          stroke="#ffffff"
          stroke-width="2.5"
          font-family="system-ui, -apple-system, sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="95"
          letter-spacing="5"
        >
          PROSPERITY
        </text>
      </g>

      <!-- LOWER SUB-BANNER: "— TIRE CENTER —" -->
      <g transform="translate(175, 820) skewX(-12)">
        <line x1="20" y1="-12" x2="165" y2="-12" stroke="#22c55e" stroke-width="7" stroke-linecap="round" />

        <text
          x="355"
          y="0"
          text-anchor="middle"
          fill="#22c55e"
          stroke="#15803d"
          stroke-width="1.5"
          font-family="system-ui, -apple-system, sans-serif"
          font-weight="900"
          font-style="italic"
          font-size="47"
          letter-spacing="9"
        >
          TIRE CENTER
        </text>

        <line x1="545" y1="-12" x2="690" y2="-12" stroke="#22c55e" stroke-width="7" stroke-linecap="round" />
      </g>
    </g>
  </g>
</svg>
`;
}

async function buildNewLogo() {
  const publicDir = path.join(__dirname, '../public/images');
  const srcAssetsDir = path.join(__dirname, '../src/assets/images');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });

  const svgContent = createLogoSvg();
  const svgBuf = Buffer.from(svgContent);

  console.log('Rendering trimmed master PNG...');
  const trimmedMaster = await sharp(svgBuf)
    .trim()
    .toBuffer();

  const png1024 = await sharp(trimmedMaster)
    .resize(1024, null, { fit: 'inside' })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.png'), png1024);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.png'), png1024);
  console.log('✓ Wrote transparent prosperity_logo.png');

  const png512 = await sharp(trimmedMaster)
    .resize(512, null, { fit: 'inside' })
    .png({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo_512.png'), png512);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo_512.png'), png512);
  console.log('✓ Wrote prosperity_logo_512.png');

  const favicon = await sharp(trimmedMaster)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), favicon);
  console.log('✓ Wrote favicon.png');

  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.svg'), svgContent);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.svg'), svgContent);
  console.log('✓ Saved prosperity_logo.svg');
}

buildNewLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
