import { Context} from "./context.js";

export class Canvas {
  constructor(parent, w, h) {
    this.width = w || window.innerWidth;
    this.height = h || window.innerHeight;
    this.canvas = document.createElement("canvas");
    this.canvas.style.display = "block";
    parent && parent.appendChild(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    Context.extendContext(this.context);
  }

  setSize(w, h) {
    this.canvas.width = this.width = w;
    this.canvas.height = this.height = h;
  }
}
