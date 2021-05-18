import { ContextMethods } from "./contextmethods";

export class Canvas {
  constructor(parent, w, h) {
    this.width = w || 100;
    this.height = h || 100;
    this.canvas = document.createElement("canvas");
    parent && parent.appendChild(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    this.init();
  }

  init() {
    for(let method in ContextMethods) {
      this.context[method] = ContextMethods[method];
    }
  }

  setSize(w, h) {
    this.canvas.width = this.width = w;
    this.canvas.height = this.height = h;
  }
}

