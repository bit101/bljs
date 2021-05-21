import { Color } from "./color.js";

export const Context = {
  extendContext: function(context) {
    for(let method in Context) {
      context[method] = Context[method];
    }
  },

  setShadow: function(color, offsetX, offsetY, blur) {
    this.shadowColor = color;
    this.shadowOffsetX = offsetX;
    this.shadowOffsetY = offsetY;
    this.shadowBlur = blur;
  },

  plot: function(x, y) {
    this.save();
    this.translate(x, y);
    this.fillRect(x - 0.5, y - 0.5, 1, 1);
    this.restore();
  },

  line: function(x0, y0, x1, y1) {
    this.beginPath();
    this.moveTo(x0, y0);
    this.lineTo(x1, y1);
    this.stroke();
  },

  lineThrough: function(x0, y0, x1, y1, overlap) {
    this.save();
    this.translate(x0, y0);
    this.rotate(Math.atan2(y1 - y0, x1 - x0));
    const dx = x1 - x0;
    const dy = y1 - y0;
    const p2 = Math.sqrt(dx * dx + dy * dy);
    this.beginPath();
    this.moveTo(-overlap, 0);
    this.lineTo(p2 + overlap, 0);
    this.stroke();
    this.restore();
  },

  ray: function(x, y, angle, offset, length) {
    this.save();
    this.translate(x, y);
    this.rotate(angle);
    this.beginPath();
    this.moveTo(offset, 0);
    this.lineTo(offset + length, 0);
    this.stroke();
    this.restore();
  },


  roundRect: function(x, y, w, h, r) {
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.arc(x + w - r, y + r, r, -Math.PI / 2, 0);
    this.lineTo(x + w, y + h - r);
    this.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    this.lineTo(x + r, y + h);
    this.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
    this.lineTo(x, y + r);
    this.arc(x + r, y + r, r, Math.PI, -Math.PI / 2);
  },

  fillRoundRect: function(x, y, w, h, r) {
    this.beginPath();
    this.round(x, y, w, h, r);
    this.fill();
  },

  strokeRoundRect: function(x, y, w, h, r) {
    this.beginPath();
    this.roundRect(x, y, w, h, r);
    this.stroke();
  },

  circle: function(x, y, r) {
    this.arc(x, y, r, 0, Math.PI * 2);
  },

  strokeCircle: function(x, y, r) {
    this.beginPath();
    this.circle(x, y, r);
    this.stroke();
  },

  fillCircle: function(x, y, r) {
    this.beginPath();
    this.circle(x, y, r);
    this.fill();
  },

  ellipse: function(x, y, xr, yr) {
    if (xr === 0 || yr === 0) {
      return;
    }
    this.save();
    this.translate(x, y);
    this.scale(xr, yr);
    this.circle(0, 0, 1);
    this.restore();
  },

  fillEllipse: function(x, y, xr, yr) {
    this.beginPath();
    this.ellipse(x, y, xr, yr);
    this.fill();
  },

  strokeEllipse: function(x, y, xr, yr) {
    this.beginPath();
    this.ellipse(x, y, xr, yr);
    this.stroke();
  },

  path: function(points) {
    points.forEach(p => {
      this.lineTo(p.x, p.y);
    });
  },

  fillPath: function(points) {
    this.beginPath();
    this.path(points);
    this.fill();
  },

  strokePath: function(points) {
    this.beginPath();
    this.path(points);
    this.stroke();
  },

  polygon: function(x, y, r, sides, rotation) {
    this.save();
    this.translate(x, y);
    this.rotate(rotation);
    this.moveTo(r, 0.0);
    for (let i = 0; i < sides; i++) {
      const angle = Math.PI * 2 / sides * i;
      this.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    this.lineTo(r, 0.0);
    this.restore();
  },

  strokePolygon: function(x, y, r, sides, rotation) {
    this.beginPath();
    this.polygon(x, y, r, sides, rotation);
    this.stroke();
  },

  fillPolygon: function(x, y, r, sides, rotation) {
    this.beginPath();
    this.polygon(x, y, r, sides, rotation);
    this.fill();
  },

  star: function(x, y, r0, r1, points, rotation) {
    this.save();
    this.translate(x, y);
    this.rotate(rotation);
    for (let i = 0; i < points * 2; i++) {
      let r = r1;
      if (i % 2 === 0) {
        r = r0;
      }
      let angle = Math.PI / points * i;
      this.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    this.closePath();
    this.restore();
  },

  strokeStar: function(x, y, r0, r1, points, rotation) {
    this.beginPath();
    this.star(x, y, r0, r1, points, rotation);
    this.stroke();
  },

  fillStar: function(x, y, r0, r1, points, rotation) {
    this.beginPath();
    this.star(x, y, r0, r1, points, rotation);
    this.fill();
  },

  fractalLine: function(x0, y0, x1, y1, roughness, iterations) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    let offset = Math.sqrt(dx * dx + dy * dy) * 0.15;
    let path = [
      { x: x0, y: y0 },
      { x: x1, y: y1 },
    ];

    for (let i = 0; i < iterations; i++) {
      const newPath = [];
      path.forEach(( point, index) => {
        newPath.push(point);
        if (index < path.length - 1) {
          let x = (point.x + path[index + 1].x) / 2 + Math.random() * offset * 2 - offset;
          let y = (point.y + path[index + 1].y) / 2 + Math.random() * offset * 2 - offset;
          newPath.push({ x: x, y: y});
        }
      });
      offset *= roughness;
      path = newPath;
    }
    this.path(path);
  },

  strokeFractalLine: function(x0, y0, x1, y1, roughness, iterations) {
    this.beginPath();
    this.fractalLine(x0, y0, x1, y1, roughness, iterations);
    this.stroke();
  },

  heart: function(x, y, w, h, rotation) {
    const path = [];
    const res = Math.sqrt(w * h);

    this.save();
    this.translate(x, y);
    this.rotate(rotation);
    for (let i = 0; i < res; i++) {
      let a = Math.PI * 2 * i / res;
      let x = w * Math.pow(Math.sin(a), 3);
      let y = -h * (0.8125 * Math.cos(a) - 0.3125 * Math.cos(2 * a) - 0.125 * Math.cos(3 * a) - 0.0625 * Math.cos(4 * a));
      path.push({ x: x, y: y });
    }
    this.path(path);
    this.restore();
  },

  strokeHeart: function(x, y, w, h, rotation) {
    this.beginPath();
    this.heart(x, y, w, h, rotation);
    this.stroke();
  },

  fillHeart: function(x, y, w, h, rotation) {
    this.beginPath();
    this.heart(x, y, w, h, rotation);
    this.fill();
  },

  points: function(points, radius) {
    points.forEach(p => {
      this.fillCircle(p.x, p.y, radius);
    });
  },

  multiCurve: function(points) {
    this.moveTo(points[0].x, points[0].y);
    this.lineTo(
      (points[0].x + points[1].x) / 2,
      (points[0].y + points[1].y) / 2,
    );
    for (let i = 1; i < points.length - 1; i++) {
      let p0 = points[i];
      let p1 = points[i + 1];
      let midx = (p0.x + p1.x) / 2;
      let midy = (p0.y + p1.y) / 2;
      this.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    let p = points[points.length - 1];
    this.lineTo(p.x, p.y);
  },

  strokeMultiCurve: function(points) {
    this.beginPath();
    this.multiCurve(points);
    this.stroke();
  },

  multiLoop: function(points) {
    let pA = points[0];
    let pZ = points[points.length - 1];
    let mid1x = (pZ.x + pA.x) / 2;
    let mid1y = (pZ.y + pA.y) / 2;
    this.moveTo(mid1x, mid1y);
    for (let i = 0; i < points.length - 1; i++) {
      let p0 = points[i];
      let p1 = points[i + 1];
      let midx = (p0.x + p1.x) / 2;
      let midy = (p0.y + p1.y) / 2;
      this.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    this.quadraticCurveTo(pZ.x, pZ.y, mid1x, mid1y);
  },

  strokeMultiLoop: function(points) {
    this.beginPath();
    this.multiLoop(points);
    this.stroke();
  },

  fillMultiLoop: function(points) {
    this.beginPath();
    this.multiLoop(points);
    this.fill();
  },

  grid: function(x, y, w, h, xres, yres) {
    for (let xx = x; xx < x + w; xx += xres) {
      this.moveTo(xx, y);
      this.lineTo(xx, y + h);
    }
    for (let yy = y; yy < y + h; yy += yres) {
      this.moveTo(x, yy);
      this.lineTo(x + w, yy);
    }
    this.stroke();
  },

  hexGrid: function(x, y, w, h, res0, res1) {
    const sin60r = Math.sin(Math.PI / 3) * res0;
    const xInc = 2 * sin60r;
    const yInc = res0 * 1.5;
    let offset = 0;

    for (let yy = y; yy < y + h + yInc; yy += yInc) {
      for (let xx = x; xx < x + w + xInc; xx += xInc) {
        this.polygon(xx + offset, yy, res1, 6, Math.PI / 2);
      }
      if (offset === 0) {
        offset = sin60r;
      } else {
        offset = 0;
      }
    }
  },

  strokeHexGrid: function(x, y, w, h, res0, res1) {
    this.save();
    this.rect(x, y, w, h);
    this.clip();
    this.beginPath();
    this.hexGrid(x, y, w, h, res0, res1);
    this.stroke();
    this.restore();
  },

  fillHexGrid: function(x, y, w, h, res0, res1) {
    this.save();
    this.rect(x, y, w, h);
    this.clip();
    this.beginPath();
    this.hexGrid(x, y, w, h, res0, res1);
    this.fill();
    this.restore();
  },

  clearRGB: function(r, g, b) {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.restore();
  },

  clearWhite: function() {
    this.clearRGB(255, 255, 255);
  },

  clearBlack: function() {
    this.clearRGB(0, 0, 0);
  },

  clearGrey: function(g) {
    this.clearRGB(g, g, g);
  },

  clearColor(color) {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.fillStyle = color.toString();
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.restore();
  },

  setFillRGB: function(r, g, b) {
    this.fillStyle = Color.rgb(r, g, b).toString();
  },

  setFillHSV: function(h, s, v) {
    this.fillStyle = Color.hsv(h, s, v).toString();
  },

  setStrokeRGB: function(r, g, b) {
    this.strokeStyle = Color.rgb(r, g, b).toString();
  },

  setStrokeHSV: function(h, s, v) {
    this.strokeStyle = Color.hsv(h, s, v).toString();
  },

  getPixel: function(x, y) {
    const data = this.getImageData(x, y, 1, 1);
    return `rgba(${data.data[0]}, ${data.data[1]}, ${data.data[2]}, ${data.data[3]}`;
  },

  getAspectRatio: function() {
    return this.canvas.width / this.canvas.height;
  },


}

