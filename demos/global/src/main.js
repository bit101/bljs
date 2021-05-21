const { Canvas, Random } = bljs;

const canvas = new Canvas(document.body);
const context = canvas.context;
const width = canvas.width;
const height = canvas.height;
const points = [];

for (let i = 0; i < 50; i++) {
  points.push({
    x: Random.float(0, width),
    y: Random.float(0, height),
  });
}

context.points(points, 2);
context.strokeMultiLoop(points);
context.lineWidth = 0.5;
context.strokePath(points, true);

