/**
 * Creates an animation that runs a render callback function every frame. Also keeps track of fps, which is passed to the render callback function.
 * @example
 * const anim = new Anim(render, false);
 * anim.run();
 * function render() {
 *   // render code
 * }
 */
export class Anim {
  /**
   * Constructor
   * @param {function} renderCallback - A function that will be called on every frame.
   * @param {boolean} running - Whether or not the animation should run immediately.
   */
  constructor(renderCallback, running) {
    this._fps = "";
    this._renderCallback = renderCallback;
    this.running = running;
  }

  /**
   * Starts the animation running.
   */
  run() {
    this.running = true;
  }

  /**
   * Stops the animation.
   */
  stop() {
    this.running = false;
  }

  _measureFPS() {
    this._fps = Math.floor(this._frames);
    this._frames = 0;
    this._timeout = setTimeout(() => this._measureFPS(), 1000);
  }

  _render() {
    this._frames++;
    if (this._renderCallback) {
      this._renderCallback(this._fps);
    }
    if (this.running) {
      requestAnimationFrame(() => this._render());
    }
  }

  /**
   * Gets and sets the running state of the animation.
   */
  get running() {
    return this._running;
  }

  set running(running) {
    if (this._running !== running) {
      this._running = running;
      if (this._running) {
        this._frames = 0;
        this._timeout = setTimeout(() => this._measureFPS(), 1000);
        this._fps = "...";
        this._render();
      } else {
        clearTimeout(this._timeout);
        this._fps = "0";
      }
    }
  }
}
