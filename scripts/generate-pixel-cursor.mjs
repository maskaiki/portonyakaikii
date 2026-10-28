import fs from 'fs';
import path from 'path';

// Iconic 8-bit Cyber Pixel Hand Pointer
// 0 = transparent
// 1 = solid black outline (#000000)
// 2 = white fill (#FFFFFF)
// 3 = electric cyan highlight (#00E5FF)
// 4 = cyan shadow / depth (#00838F)

const rows = [
  "       11                       ",
  "      12211                     ",
  "      123221                    ",
  "      123221                    ",
  "      123221                    ",
  "      123221                    ",
  "      123221    11              ",
  "      123221   12211            ",
  "      123221  1232221   11      ",
  "  11  123221  1232221  12211    ",
  " 12211123221 12322221 123221   ",
  " 12322123221 12322221 123221 11",
  " 1232222322111232222111232211221",
  "  123222322222232222222232222321",
  "  123222222222222222222222222221",
  "   1232222222222222222222222221 ",
  "   1232222222222222222222222221 ",
  "    12322222222222222222222221  ",
  "    12222222222222222222222221  ",
  "     112222222222222222222221   ",
  "      1112222222222222222221    ",
  "        1122222222222222221     ",
  "         11111111111111111      "
];

const palette = {
  '1': '#000000',
  '2': '#FFFFFF',
  '3': '#00E5FF',
  '4': '#0891B2'
};

const width = rows[0].length;
const height = rows.length;

let rects = '';
rows.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    const ch = row[x];
    if (palette[ch]) {
      rects += `  <rect x="${x}" y="${y}" width="1" height="1" fill="${palette[ch]}" />\n`;
    }
  }
});

// Large SVG with crisp edges and dropshadow filter
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width * 2}" height="${height * 2}" shape-rendering="crispEdges">
  <filter id="pixel-glow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#00E5FF" flood-opacity="0.6"/>
  </filter>
  <g filter="url(#pixel-glow)">
${rects}  </g>
</svg>`;

const outDir = 'public/assets/icons';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'pixel-hand.svg'), svgContent);

// Also generate a clean 32x32 cursor SVG without drop-shadow filter for CSS cursor url(...)
const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="32" height="32" shape-rendering="crispEdges">
${rects}</svg>`;
fs.writeFileSync(path.join(outDir, 'pixel-cursor.svg'), cursorSvg);

console.log('Saved public/assets/icons/pixel-hand.svg and pixel-cursor.svg successfully!');
