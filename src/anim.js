export function Anim(renderCallback, fps) {
  return {
    startTime: 0,
    fps: fps || 60,
    renderCallback: renderCallback,

    start: function () {
      if (!this.running) {
        this.running = true;
        this.render();
      }
      this.shouldKill = false;
      this.startTime = Date.now();
      return this;
    },

    stop: function () {
      this.shouldKill = true;
      return this;
    },

    toggle: function () {
      if (this.running) {
        this.stop();
      }
      else {
        this.start();
      }
      return this;
    },

    render: function () {
      if (this.shouldKill) {
        this.shouldKill = false;
        this.running = false;
      }
      if (this.running) {
        if (this.renderCallback) {
          this.renderCallback(Date.now() - this.startTime);
        }
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.render();
          });
        }, 1000 / this.fps);
      }
    },
  };
}
