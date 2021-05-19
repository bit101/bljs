const canvas = new bljs.Canvas(document.body);
const context = canvas.context;
const width = canvas.width;
const height = canvas.height;

const hexSize = 15;
new bljs.Anim(render)
  .start();


function render(ms) {
  const percent = (ms % 1000) / 1000;
  for (let x = 0; x < 40 * 10 / hexSize; x++) {
    for (let y = 0; y < 40 * 10 / hexSize; y++) {
      let p = bljs.Num.hexPoint(x, y, hexSize, true);
      context.setFillHSV(p.x * 0.6 + Math.sin(p.y * 0.01) * bljs.Num.lerpSin(percent, -50, 50), 1, 1);
      context.fillPolygon(p.x, p.y, hexSize, 6, Math.PI / 6);
    }
  }
}
