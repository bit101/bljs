export class Anim {
  constructor(renderCallback, running) {
    this._fps = "";
    this._renderCallback = renderCallback;
    this.running = running;
  }

  run() {
    this.running = true;
  }

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
