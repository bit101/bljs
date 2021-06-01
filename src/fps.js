export class FPS {
  constructor(parent, x, y) {
    this._createElement(parent, x, y);
    this._frames = 0;
    this._fps = "...";
    this._sampleTimeSeconds = 1;
  }

  _createElement(parent, x, y) {
    this._el = document.createElement("div");
    this._el.style.font = "10px sans-serif";
    this._el.style.color = "#333";
    this._el.style.position = "absolute";
    this._el.style.left = x + "px";
    this._el.style.top = y + "px";
    parent.appendChild(this._el);
  }

  start() {
    if (this._started) {
      return;
    }
    this._started = true;
    this._frames = 0;
    this._interval = setInterval(() => {
      this._fps = this._frames / this._sampleTimeSeconds;
      this._frames = 0;
    }, this._sampleTimeSeconds * 1000);
  }

  stop() {
    if (!this._started) {
      return;
    }
    clearInterval(this._interval);
  }

  logFrame() {
    this._frames++;
    this._el.textContent = "FPS: " + this._fps;
  }
}

