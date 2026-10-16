const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createExactPTCLogoSvg() {
  return `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tire Rubber Sidewall Radial Gradient -->
    <radialGradient id="tireRubber" cx="50%" cy="48%" r="50%" fx="46%" fy="42%">
      <stop offset="0%" stop-color="#333a46" />
      <stop offset="40%" stop-color="#1a1e26" />
      <stop offset="70%" stop-color="#0f1217" />
      <stop offset="90%" stop-color="#14171e" />
      <stop offset="100%" stop-color="#08090c" />
    </radialGradient>

    <!-- Chrome Rim Multi-Stop Gradient -->
    <linearGradient id="chromeLip" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="15%" stop-color="#e2e8f0" />
      <stop offset="30%" stop-color="#64748b" />
      <stop offset="45%" stop-color="#f8fafc" />
      <stop offset="60%" stop-color="#94a3b8" />
      <stop offset="80%" stop-color="#cbd5e1" />
      <stop offset="95%" stop-color="#475569" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <!-- Chrome Rim Inner Arc -->
    <linearGradient id="chromeInner" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="25%" stop-color="#475569" />
      <stop offset="50%" stop-color="#f1f5f9" />
      <stop offset="75%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>

    <!-- Emerald Highway Surface Gradient -->
    <linearGradient id="highwayGrad" x1="80%" y1="60%" x2="20%" y2="20%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="20%" stop-color="#059669" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="75%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>

    <!-- Highway Glow / Shading Border -->
    <linearGradient id="highwayBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>

    <!-- Glossy Leaf Gradient -->
    <linearGradient id="leafBody" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#14532d" />
      <stop offset="30%" stop-color="#16a34a" />
      <stop offset="65%" stop-color="#22c55e" />
      <stop offset="90%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#86efac" />
    </linearGradient>

    <!-- Leaf Vein Highlight -->
    <linearGradient id="leafVein" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#bbf7d0" />
    </linearGradient>

    <!-- Badge Outer Neon Border Gradient -->
    <linearGradient id="badgeNeon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="25%" stop-color="#22c55e" />
      <stop offset="50%" stop-color="#4ade80" />
      <stop offset="75%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>

    <!-- Chrome 3D Letters Gradient for PROSPERITY -->
    <linearGradient id="chromeLetters" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="32%" stop-color="#f8fafc" />
      <stop offset="48%" stop-color="#e2e8f0" />
      <stop offset="50%" stop-color="#64748b" />
      <stop offset="54%" stop-color="#94a3b8" />
      <stop offset="78%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Tire Center Neon Green Text -->
    <linearGradient id="tireCenterGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bbf7d0" />
      <stop offset="30%" stop-color="#4ade80" />
      <stop offset="70%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#16a34a" />
    </linearGradient>

    <!-- Soft Drop Shadow Filter -->
    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <g id="PTC_Logo_Group">
    <!-- 1. TIRE BACKGROUND & TREADS -->
    <g id="TireAssembly">
      <!-- Main Tire Outer Profile Circle -->
      <circle cx="512" cy="480" r="380" fill="url(#tireRubber)" stroke="#090a0d" stroke-width="12" />

      <!-- Outer Shoulder Sipes & Tread Lugs (Radial array around upper and side arcs) -->
      <!-- Top Arc Lugs -->
      <path d="M 512 100 L 512 155 M 504 100 L 520 100" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 465 105 L 472 160" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 559 105 L 552 160" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 420 118 L 434 170" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 604 118 L 590 170" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 376 138 L 398 186" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 648 138 L 626 186" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 334 167 L 363 210" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 690 167 L 661 210" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 296 204 L 333 240" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 728 204 L 691 240" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 264 249 L 308 276" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 760 249 L 716 276" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 238 299 L 288 317" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 786 299 L 736 317" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 218 354 L 273 363" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 806 354 L 751 363" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 207 413 L 264 413" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 817 413 L 760 413" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />

      <!-- Lower Tire Arc (Visible under the badge) -->
      <path d="M 264 711 L 308 684" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 760 711 L 716 684" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 296 756 L 333 720" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 728 756 L 691 720" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 334 793 L 363 750" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 690 793 L 661 750" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 376 822 L 398 774" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 648 822 L 626 774" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 420 842 L 434 790" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 604 842 L 590 790" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 465 855 L 472 800" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 559 855 L 552 800" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />
      <path d="M 512 860 L 512 805" stroke="#090a0d" stroke-width="8" stroke-linecap="round" />

      <!-- Concentric Sidewall Ribs -->
      <circle cx="512" cy="480" r="350" fill="none" stroke="#222833" stroke-width="6" />
      <circle cx="512" cy="480" r="338" fill="none" stroke="#12151c" stroke-width="4" />
      <circle cx="512" cy="480" r="290" fill="none" stroke="#29303d" stroke-width="12" />
      <circle cx="512" cy="480" r="278" fill="none" stroke="#12151c" stroke-width="3" />
      <circle cx="512" cy="480" r="248" fill="none" stroke="#374151" stroke-width="5" />
    </g>

    <!-- 2. WHEEL RIM (Visible in lower half below badge) -->
    <g id="WheelRim">
      <!-- Chrome Outer Lip -->
      <circle cx="512" cy="480" r="240" fill="none" stroke="url(#chromeLip)" stroke-width="16" />
      <circle cx="512" cy="480" r="228" fill="none" stroke="#0f172a" stroke-width="5" />
      <circle cx="512" cy="480" r="220" fill="none" stroke="url(#chromeInner)" stroke-width="10" />
      <circle cx="512" cy="480" r="212" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.9" />
    </g>

    <!-- 3. INNER HUB (Dark sky, Winding Highway, Leaf) -->
    <g id="HubArtwork">
      <!-- Inner Dark Disc -->
      <circle cx="512" cy="480" r="210" fill="#080c09" />

      <!-- Deep Emerald Glow behind Highway -->
      <circle cx="512" cy="480" r="208" fill="none" stroke="#064e3b" stroke-width="14" opacity="0.6" />

      <!-- Winding Green Highway Ribbon -->
      <!-- Outer Highway Border / Asphalt edge -->
      <path
        d="M 690 420 C 650 360, 560 330, 480 345 C 380 365, 330 330, 275 265 L 305 240 C 365 305, 420 335, 500 315 C 590 295, 680 335, 715 410 Z"
        fill="url(#highwayBorder)"
      />

      <!-- Main Highway Surface -->
      <path
        d="M 685 418 C 646 363, 562 334, 483 349 C 385 369, 335 334, 282 268 L 298 248 C 358 312, 415 340, 496 320 C 585 301, 672 339, 706 409 Z"
        fill="url(#highwayGrad)"
        stroke="#22c55e"
        stroke-width="2"
      />

      <!-- Highway Center Dashed White Lines -->
      <path
        d="M 695 413 C 655 363, 575 336, 490 334 C 400 336, 345 305, 290 258"
        fill="none"
        stroke="#ffffff"
        stroke-width="5.5"
        stroke-linecap="round"
        stroke-dasharray="24 18"
        opacity="0.95"
      />

      <!-- Inner Green Leaf (at 2 o'clock above badge) -->
      <g id="EcoLeaf" transform="translate(680, 240)">
        <!-- Leaf Stem -->
        <path
          d="M 12 135 C 10 110, 18 85, 32 62"
          fill="none"
          stroke="#16a34a"
          stroke-width="6"
          stroke-linecap="round"
        />

        <!-- Outer Leaf Blade Glow / Border -->
        <path
          d="M 28 65 C 20 20, 75 -15, 120 -25 C 130 30, 95 85, 38 105 C 30 92, 28 78, 28 65 Z"
          fill="url(#leafBody)"
          stroke="#4ade80"
          stroke-width="4.5"
          stroke-linejoin="round"
        />

        <!-- Central Leaf Vein -->
        <path
          d="M 33 90 C 55 60, 85 25, 118 -22"
          fill="none"
          stroke="url(#leafVein)"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- Side Branch Veins -->
        <path d="M 52 70 C 68 62, 85 64, 98 72" fill="none" stroke="#86efac" stroke-width="2.5" stroke-linecap="round" opacity="0.85" />
        <path d="M 68 48 C 85 38, 102 38, 114 45" fill="none" stroke="#86efac" stroke-width="2.5" stroke-linecap="round" opacity="0.85" />
        <path d="M 85 24 C 98 12, 112 10, 120 15" fill="none" stroke="#86efac" stroke-width="2" stroke-linecap="round" opacity="0.85" />
      </g>
    </g>

    <!-- 4. CENTER BRAND BADGE / PLAQUE -->
    <!-- Rotated slightly (-3.2 deg) around center to match the authentic uploaded angle! -->
    <g id="CenterBadge" transform="translate(512, 530) rotate(-3.2) translate(-512, -530)" filter="url(#badgeShadow)">
      <!-- Outer Emerald Neon Frame -->
      <polygon
        points="22,430 1002,430 955,585 825,585 795,688 229,688 199,585 69,585"
        fill="url(#badgeNeon)"
        stroke="#4ade80"
        stroke-width="3"
        stroke-linejoin="round"
      />

      <!-- Solid Black Carbon Plate -->
      <polygon
        points="34,438 990,438 945,577 817,577 787,678 237,678 207,577 79,577"
        fill="#05070a"
        stroke="#000000"
        stroke-width="4"
        stroke-linejoin="round"
      />

      <!-- Inner Glass Sheen / Reflection Accent across upper plate -->
      <polygon
        points="46,444 978,444 955,510 65,510"
        fill="#334155"
        opacity="0.25"
      />

      <!-- PROSPERITY BRAND LETTERING (Top Heavy Chrome 3D Italic) -->
      <g transform="translate(512, 535) skewX(-11)">
        <!-- Black Drop Shadow for maximum contrast -->
        <text
          x="0"
          y="10"
          text-anchor="middle"
          fill="#000000"
          stroke="#000000"
          stroke-width="16"
          stroke-linejoin="round"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="114"
          letter-spacing="5"
        >
          PROSPERITY
        </text>

        <!-- Dark outer bevel stroke -->
        <text
          x="0"
          y="0"
          text-anchor="middle"
          fill="#000000"
          stroke="#0b0f17"
          stroke-width="12"
          stroke-linejoin="round"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="114"
          letter-spacing="5"
        >
          PROSPERITY
        </text>

        <!-- White Inner Lip Stroke -->
        <text
          x="0"
          y="0"
          text-anchor="middle"
          fill="none"
          stroke="#ffffff"
          stroke-width="4"
          stroke-linejoin="round"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="114"
          letter-spacing="5"
        >
          PROSPERITY
        </text>

        <!-- Metallic Chrome Gradient Core -->
        <text
          x="0"
          y="0"
          text-anchor="middle"
          fill="url(#chromeLetters)"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="114"
          letter-spacing="5"
        >
          PROSPERITY
        </text>
      </g>

      <!-- LOWER SUB-SECTION: "TIRE CENTER" (Vivid Glowing Neon Green) -->
      <g transform="translate(512, 652) skewX(-11)">
        <!-- Black Backdrop Shadow for letters -->
        <text
          x="0"
          y="5"
          text-anchor="middle"
          fill="#000000"
          stroke="#000000"
          stroke-width="10"
          stroke-linejoin="round"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="56"
          letter-spacing="10"
        >
          TIRE CENTER
        </text>

        <!-- Vivid Neon Green Fill with crisp dark green edge -->
        <text
          x="0"
          y="0"
          text-anchor="middle"
          fill="url(#tireCenterGreen)"
          stroke="#14532d"
          stroke-width="3"
          stroke-linejoin="round"
          font-family="system-ui, -apple-system, 'Arial Black', sans-serif"
          font-weight="900"
          font-size="56"
          letter-spacing="10"
        >
          TIRE CENTER
        </text>
      </g>
    </g>
  </g>
</svg>
`;
}

async function run() {
  const publicDir = path.join(__dirname, '../public/images');
  const srcAssetsDir = path.join(__dirname, '../src/assets/images');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });

  const svgContent = createExactPTCLogoSvg();
  const svgBuf = Buffer.from(svgContent);

  console.log('Rendering trimmed master PNG with transparent background...');
  // Render high-res SVG directly to PNG with transparent alpha background
  const highResBuf = await sharp(svgBuf, { density: 150 })
    .png()
    .toBuffer();

  const trimmed = await sharp(highResBuf)
    .trim()
    .toBuffer();

  // Save 1024 width transparent PNG
  const logo1024 = await sharp(trimmed)
    .resize(1024, null, { fit: 'inside' })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.png'), logo1024);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.png'), logo1024);
  console.log('✓ Wrote transparent prosperity_logo.png (both src and public)');

  // Save 512 width transparent PNG
  const logo512 = await sharp(trimmed)
    .resize(512, null, { fit: 'inside' })
    .png({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo_512.png'), logo512);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo_512.png'), logo512);
  console.log('✓ Wrote prosperity_logo_512.png (both src and public)');

  // Save Favicon
  const favicon = await sharp(trimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), favicon);
  console.log('✓ Wrote public/favicon.png');

  // Also save SVG source
  fs.writeFileSync(path.join(publicDir, 'prosperity_logo.svg'), svgContent);
  fs.writeFileSync(path.join(srcAssetsDir, 'prosperity_logo.svg'), svgContent);
  console.log('✓ Saved prosperity_logo.svg');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
