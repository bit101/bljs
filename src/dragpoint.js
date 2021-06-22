import { Num} from "./num.js";

export class DragPoint {
  constructor(x, y, label, context2d, moveHandler) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.context = context2d;
    this.canvas = this.context.canvas;
    this.moveHandler = moveHandler;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.snap = false;
    this.gridSize = 10;
  }

  render() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.context.strokeStyle = "#999";
    this.context.lineWidth = 0.5;
    this.context.fillCircle(0, 0, 10);
    this.context.strokeCircle(0, 0, 10);
    this.context.strokeCircle(0, 0, 1);
    this.context.fillStyle = "#000";
    if (this.label) {
      this.context.fillText(this.label, 14, 0);
    }
    this.context.restore();
  }

  onMouseDown(event) {
    this.canvas.style.cursor = "pointer";
    const bounds = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - bounds.left;
    this.mouseY = event.clientY - bounds.top;
    const dist = Num.dist(this.mouseX, this.mouseY, this.x, this.y);
    if (dist < 10) {
      this.offsetX = this.mouseX - this.x;
      this.offsetY = this.mouseY - this.y;
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseMove(event) {
    const bounds = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - bounds.left;
    this.mouseY = event.clientY - bounds.top;
    let x = this.mouseX - this.offsetX;
    let y = this.mouseY - this.offsetY;
    x = Math.min(x, this.canvas.width);
    x = Math.max(x, 0);
    y = Math.min(y, this.canvas.height);
    y = Math.max(y, 0);
    if (this.snap) {
      x = Math.round(x / this.gridSize) * this.gridSize;
      y = Math.round(y / this.gridSize) * this.gridSize;
    }
    this.x = x;
    this.y = y;
    this.moveHandler();
  }

  onMouseUp() {
    this.canvas.style.cursor = "default";
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
}

