import { Num} from "./num.js";

export class DragPoint {
  constructor(x, y, context2d, moveHandler) {
    this.x = x;
    this.y = y;
    this.context = context2d;
    this.moveHandler = moveHandler;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.context.canvas.addEventListener("mousedown", this.onMouseDown);
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
    this.context.restore();
  }

  onMouseDown(event) {
    const bounds = this.context.canvas.getBoundingClientRect();
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
    const bounds = this.context.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - bounds.left;
    this.mouseY = event.clientY - bounds.top;
    this.x = this.mouseX - this.offsetX;
    this.y = this.mouseY - this.offsetY;
    this.moveHandler();
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
}

