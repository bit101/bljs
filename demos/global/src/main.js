const { Canvas, Num, Noise, Color } = bljs;

const canvas = new Canvas(document.body, 800, 800);
const context = canvas.context;
const width = canvas.width;
const height = canvas.height;

const scale = 0.01;
const res = 1;
for (let x = 0; x < width; x += res) {
  for (let y = 0; y < height; y += res) {
    let val = Noise.perlinOct(x * scale, y * scale, 5, 0.5);
    let g = Math.floor(Num.map(val, -1, 1, 0, 255));
    context.setFillRGB(g, g, g);
    context.fillRect(x, y, 10, 10);
  }
}
