import { Context} from "./context.js";

/**
 * Creates a new Canvas HTML element with an extended context.
 */
export class Canvas {
  /**
   * Constructor
   * @param {object} parent - The HTML element to add this canvas to.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   */
  constructor(parent, width, height) {
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.canvas = document.createElement("canvas");
    this.canvas.style.display = "block";
    parent && parent.appendChild(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    Context.extendContext(this.context);
  }

  /**
   * Sets the size of the canvas.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   */
  setSize(width, height) {
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
  }
}
