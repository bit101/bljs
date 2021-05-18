const canvas = new bljs.Canvas(document.body, 400, 400);
const context = canvas.context;


const colors = bljs.Utils.fillArray(100, bljs.Color.randomRGB);
const circles = bljs.Utils.fillArray(100, bljs.Random.circle, 0, 0, 400, 400, 10, 50);

for (let i = 0; i < 100; i++) {
  context.fillStyle = colors[i];
  context.fillCircle(circles[i].x, circles[i].y, circles[i].r);
}


