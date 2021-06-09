import { Color } from "./color.js";

/**
 * @namespace Context
 */
export const Context = {
  /**
   * @function extendContext
   * @memberof Context
   * @description Extends a 2d rendering context to include additional useful methods.
   * @param {object} context - The context to extend.
   */
  extendContext: function(context) {
    for (const method in Context) {
      context[method] = Context[method];
    }
  },

  /**
   * @function setShadow
   * @memberof Context
   * @description Sets all of the dropshadow parameters.
   * @param {string} color - The color of the shadow
   * @param {number} offsetX - The x position of the shadow.
   * @param {number} offsetY - The y position of the shadow.
   * @param {number} blur - How much the shadow will be blurred.
   * @returns This context.
   */
  setShadow: function(color, offsetX, offsetY, blur) {
    this.shadowColor = color;
    this.shadowOffsetX = offsetX;
    this.shadowOffsetY = offsetY;
    this.shadowBlur = blur;
    return this;
  },

  /**
   * @function plot
   * @memberof Context
   * @description Plots a single pixel.
   * @param {number} x - The x position of the point to plot.
   * @param {number} y - The y position of the point to plot.
   * @returns This context.
   */
  plot: function(x, y) {
    this.save();
    this.translate(x, y);
    this.fillRect(x - 0.5, y - 0.5, 1, 1);
    this.restore();
    return this;
  },

  /**
   * @function line
   * @memberof Context
   * @description Draws a line between two points.
   * @param {number} x0 - The x position of the first point.
   * @param {number} y0 - The y position of the first point.
   * @param {number} x1 - The x position of the second point.
   * @param {number} y1 - The y position of the second point.
   * @returns This context.
   */
  line: function(x0, y0, x1, y1) {
    this.beginPath();
    this.moveTo(x0, y0);
    this.lineTo(x1, y1);
    this.stroke();
    return this;
  },

  /**
   * @function lineThrough
   * @memberof Context
   * @description Draws a line segment through, but overlapping, two points.
   * @param {number} x0 - The x position of the first point.
   * @param {number} y0 - The y position of the first point.
   * @param {number} x1 - The x position of the second point.
   * @param {number} y1 - The y position of the second point.
   * @param {number} overlap - How many pixels beyond each point to draw the line.
   * @returns This context.
   */
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
    return this;
  },

  /**
   * @function ray
   * @memberof Context
   * @description Draws a ray fro a given point.
   * @param {number} x - The x position of the point.
   * @param {number} y - The y position of the point.
   * @param {number} angle - The angle of the ray.
   * @param {number} offset - An offset from the point to begin drawing the ray.
   * @param {number} angle - The length of the ray.
   * @returns This context.
   */
  ray: function(x, y, angle, offset, length) {
    this.save();
    this.translate(x, y);
    this.rotate(angle);
    this.beginPath();
    this.moveTo(offset, 0);
    this.lineTo(offset + length, 0);
    this.stroke();
    this.restore();
    return this;
  },

  /**
   * @function roundRect
   * @memberof Context
   * @description Draws a rectangle with rounded corners.
   * @param {number} x - The x position of the rectangle.
   * @param {number} y - The y position of the rectangle.
   * @param {number} w - The width of the rectangle.
   * @param {number} h - The height of the rectangle.
   * @param {number} r - The radius of the corners.
   * @returns This context.
   */
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
    return this;
  },

  /**
   * @function fillRoundRect
   * @memberof Context
   * @description Draws a and fills rectangle with rounded corners.
   * @param {number} x - The x position of the rectangle.
   * @param {number} y - The y position of the rectangle.
   * @param {number} w - The width of the rectangle.
   * @param {number} h - The height of the rectangle.
   * @param {number} r - The radius of the corners.
   * @returns This context.
   */
  fillRoundRect: function(x, y, w, h, r) {
    this.beginPath();
    this.round(x, y, w, h, r);
    this.fill();
    return this;
  },

  /**
   * @function strokeRoundRect
   * @memberof Context
   * @description Draws a and strokes rectangle with rounded corners.
   * @param {number} x - The x position of the rectangle.
   * @param {number} y - The y position of the rectangle.
   * @param {number} w - The width of the rectangle.
   * @param {number} h - The height of the rectangle.
   * @param {number} r - The radius of the corners.
   * @returns This context.
   */
  strokeRoundRect: function(x, y, w, h, r) {
    this.beginPath();
    this.roundRect(x, y, w, h, r);
    this.stroke();
    return this;
  },

  /**
   * @function circle
   * @memberof Context
   * @description Draws a circle.
   * @param {number} x - The x position of the circle.
   * @param {number} y - The y position of the circle.
   * @param {number} r - The radius of the circle.
   * @returns This context.
   */
  circle: function(x, y, r) {
    this.arc(x, y, r, 0, Math.PI * 2);
    return this;
  },

  /**
   * @function strokeCircle
   * @memberof Context
   * @description Draws and strokes a circle.
   * @param {number} x - The x position of the circle.
   * @param {number} y - The y position of the circle.
   * @param {number} r - The radius of the circle.
   * @returns This context.
   */
  strokeCircle: function(x, y, r) {
    this.beginPath();
    this.circle(x, y, r);
    this.stroke();
    return this;
  },

  /**
   * @function fillCircle
   * @memberof Context
   * @description Draws and fills a circle.
   * @param {number} x - The x position of the circle.
   * @param {number} y - The y position of the circle.
   * @param {number} r - The radius of the circle.
   * @returns This context.
   */
  fillCircle: function(x, y, r) {
    this.beginPath();
    this.circle(x, y, r);
    this.fill();
    return this;
  },

  /**
   * @function ellipse
   * @memberof Context
   * @description Draws an ellipse.
   * @param {number} x - The x position of the ellipse.
   * @param {number} y - The y position of the ellipse.
   * @param {number} xr - The horizontal radius of the ellipse.
   * @param {number} yr - The vertical radius of the ellipse.
   * @returns This context.
   */
  ellipse: function(x, y, xr, yr) {
    if (xr === 0 || yr === 0) {
      return;
    }
    this.save();
    this.translate(x, y);
    this.scale(xr, yr);
    this.circle(0, 0, 1);
    this.restore();
    return this;
  },

  /**
   * @function fillEllipse
   * @memberof Context
   * @description Draws and fills an ellipse.
   * @param {number} x - The x position of the ellipse.
   * @param {number} y - The y position of the ellipse.
   * @param {number} xr - The horizontal radius of the ellipse.
   * @param {number} yr - The vertical radius of the ellipse.
   * @returns This context.
   */
  fillEllipse: function(x, y, xr, yr) {
    this.beginPath();
    this.ellipse(x, y, xr, yr);
    this.fill();
    return this;
  },

  /**
   * @function strokeEllipse
   * @memberof Context
   * @description Draws an ellipse.
   * @param {number} x - The x position of the ellipse.
   * @param {number} y - The y position of the ellipse.
   * @param {number} xr - The horizontal radius of the ellipse.
   * @param {number} yr - The vertical radius of the ellipse.
   * @returns This context.
   */
  strokeEllipse: function(x, y, xr, yr) {
    this.beginPath();
    this.ellipse(x, y, xr, yr);
    this.stroke();
    return this;
  },

  /**
   * @function path
   * @memberof Context
   * @description Draws a path of points.
   * @param {array} points - The points to draw a path through.
   * @param {boolean} close - Whether or not to close the path.
   * @returns This context.
   */
  path: function(points, close) {
    points.forEach(p => {
      this.lineTo(p.x, p.y);
    });
    if (close) {
      this.closePath();
    }
    return this;
  },

  /**
   * @function fillPath
   * @memberof Context
   * @description Draws a and fills path of points.
   * @param {array} points - The points to draw a path through.
   * @param {boolean} close - Whether or not to close the path.
   * @returns This context.
   */
  fillPath: function(points, close) {
    this.beginPath();
    this.path(points, close);
    this.fill();
    return this;
  },

  /**
   * @function strokePath
   * @memberof Context
   * @description Draws and strokes a path of points.
   * @param {array} points - The points to draw a path through.
   * @param {boolean} close - Whether or not to close the path.
   * @returns This context.
   */
  strokePath: function(points, close) {
    this.beginPath();
    this.path(points, close);
    this.stroke();
    return this;
  },

  /**
   * @function polygon
   * @memberof Context
   * @description Draws a polygon.
   * @param {number} x - The x position of the polygon.
   * @param {number} y - The y position of the polygon.
   * @param {number} r - The radius of the polygon.
   * @param {number} sides - The number of sides in the polygon.
   * @param {number} rotation - The rotation of the polygon.
   * @returns This context.
   */
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
    return this;
  },

  /**
   * @function strokePolygon
   * @memberof Context
   * @description Draws and strokes a polygon.
   * @param {number} x - The x position of the polygon.
   * @param {number} y - The y position of the polygon.
   * @param {number} r - The radius of the polygon.
   * @param {number} sides - The number of sides in the polygon.
   * @param {number} rotation - The rotation of the polygon.
   * @returns This context.
   */
  strokePolygon: function(x, y, r, sides, rotation) {
    this.beginPath();
    this.polygon(x, y, r, sides, rotation);
    this.stroke();
    return this;
  },

  /**
   * @function fillPolygon
   * @memberof Context
   * @description Draws and fills a polygon.
   * @param {number} x - The x position of the polygon.
   * @param {number} y - The y position of the polygon.
   * @param {number} r - The radius of the polygon.
   * @param {number} sides - The number of sides in the polygon.
   * @param {number} rotation - The rotation of the polygon.
   * @returns This context.
   */
  fillPolygon: function(x, y, r, sides, rotation) {
    this.beginPath();
    this.polygon(x, y, r, sides, rotation);
    this.fill();
    return this;
  },

  /**
   * @function star
   * @memberof Context
   * @description Draws a star.
   * @param {number} x - The x position of the star.
   * @param {number} y - The y position of the star.
   * @param {number} r0 - The inner radius of the star.
   * @param {number} r1 - The outer radius of the star.
   * @param {number} points - The number of points in the star.
   * @param {number} rotation - The rotation of the star.
   * @returns This context.
   */
  star: function(x, y, r0, r1, points, rotation) {
    this.save();
    this.translate(x, y);
    this.rotate(rotation);
    for (let i = 0; i < points * 2; i++) {
      let r = r1;
      if (i % 2 === 0) {
        r = r0;
      }
      const angle = Math.PI / points * i;
      this.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    this.closePath();
    this.restore();
    return this;
  },

  /**
   * @function strokeStar
   * @memberof Context
   * @description Draws and strokes a star.
   * @param {number} x - The x position of the star.
   * @param {number} y - The y position of the star.
   * @param {number} r0 - The inner radius of the star.
   * @param {number} r1 - The outer radius of the star.
   * @param {number} points - The number of points in the star.
   * @param {number} rotation - The rotation of the star.
   * @returns This context.
   */
  strokeStar: function(x, y, r0, r1, points, rotation) {
    this.beginPath();
    this.star(x, y, r0, r1, points, rotation);
    this.stroke();
    return this;
  },

  /**
   * @function fillStar
   * @memberof Context
   * @description Draws and fill a star.
   * @param {number} x - The x position of the star.
   * @param {number} y - The y position of the star.
   * @param {number} r0 - The inner radius of the star.
   * @param {number} r1 - The outer radius of the star.
   * @param {number} points - The number of points in the star.
   * @param {number} rotation - The rotation of the star.
   * @returns This context.
   */
  fillStar: function(x, y, r0, r1, points, rotation) {
    this.beginPath();
    this.star(x, y, r0, r1, points, rotation);
    this.fill();
    return this;
  },

  /**
   * @function fractalLine
   * @memberof Context
   * @description Draws a fractal line by iteratively calculating the center point of two lines and randomly offsetting it.
   * @param {number} x0 - The starting x position of the line.
   * @param {number} y0 - The starting y position of the line.
   * @param {number} x1 - The ending x position of the line.
   * @param {number} y1 - The ending y position of the line.
   * @param {number} roughness - How much random offset is applied on each iteration.
   * @param {number} iterations - How many iterations to run.
   * @returns This context.
   */
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
          const x = (point.x + path[index + 1].x) / 2 + Math.random() * offset * 2 - offset;
          const y = (point.y + path[index + 1].y) / 2 + Math.random() * offset * 2 - offset;
          newPath.push({ x: x, y: y});
        }
      });
      offset *= roughness;
      path = newPath;
    }
    this.path(path);
    return this;
  },

  /**
   * @function strokeFractalLine
   * @memberof Context
   * @description Draws and strokes a fractal line by iteratively calculating the center point of two lines and randomly offsetting it.
   * @param {number} x0 - The starting x position of the line.
   * @param {number} y0 - The starting y position of the line.
   * @param {number} x1 - The ending x position of the line.
   * @param {number} y1 - The ending y position of the line.
   * @param {number} roughness - How much random offset is applied on each iteration.
   * @param {number} iterations - How many iterations to run.
   * @returns This context.
   */
  strokeFractalLine: function(x0, y0, x1, y1, roughness, iterations) {
    this.beginPath();
    this.fractalLine(x0, y0, x1, y1, roughness, iterations);
    this.stroke();
    return this;
  },

  /**
   * @function heart
   * @memberof Context
   * @description Draws a heart.
   * @param {number} x - The x position of the heart.
   * @param {number} y - The y position of the heart.
   * @param {number} w - The width the heart.
   * @param {number} h - The height vertical radius of the heart.
   * @param {number} rotation - The rotation of the heart.
   * @returns This context.
   */
  heart: function(x, y, w, h, rotation) {
    const path = [];
    const res = Math.sqrt(w * h);

    this.save();
    this.translate(x, y);
    this.rotate(rotation);
    for (let i = 0; i < res; i++) {
      const a = Math.PI * 2 * i / res;
      const xx = w * Math.pow(Math.sin(a), 3);
      const yy = -h * (0.8125 * Math.cos(a) - 0.3125 * Math.cos(2 * a) - 0.125 * Math.cos(3 * a) - 0.0625 * Math.cos(4 * a));
      path.push({ x: xx, y: yy });
    }
    this.path(path);
    this.restore();
    return this;
  },

  /**
   * @function strokeHeart
   * @memberof Context
   * @description Draws and strokes a heart.
   * @param {number} x - The x position of the heart.
   * @param {number} y - The y position of the heart.
   * @param {number} w - The width the heart.
   * @param {number} h - The height vertical radius of the heart.
   * @param {number} rotation - The rotation of the heart.
   * @returns This context.
   */
  strokeHeart: function(x, y, w, h, rotation) {
    this.beginPath();
    this.heart(x, y, w, h, rotation);
    this.stroke();
    return this;
  },

  /**
   * @function fillHeart
   * @memberof Context
   * @description Draws and fills a heart.
   * @param {number} x - The x position of the heart.
   * @param {number} y - The y position of the heart.
   * @param {number} w - The width the heart.
   * @param {number} h - The height vertical radius of the heart.
   * @param {number} rotation - The rotation of the heart.
   * @returns This context.
   */
  fillHeart: function(x, y, w, h, rotation) {
    this.beginPath();
    this.heart(x, y, w, h, rotation);
    this.fill();
    return this;
  },

  /**
   * @function points
   * @memberof Context
   * @description Renders an array of points with a circle of a given radius.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @param {number} radius - The radius of the circle that will be drawn for each point.
   * @returns This context.
   */
  points: function(points, radius) {
    points.forEach(p => {
      this.fillCircle(p.x, p.y, radius);
    });
    return this;
  },

  /**
   * @function multiCurve
   * @memberof Context
   * @description Draws a smooth, continuous curve through a series of points.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @returns This context.
   */
  multiCurve: function(points) {
    this.moveTo(points[0].x, points[0].y);
    this.lineTo(
      (points[0].x + points[1].x) / 2,
      (points[0].y + points[1].y) / 2
    );
    for (let i = 1; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midx = (p0.x + p1.x) / 2;
      const midy = (p0.y + p1.y) / 2;
      this.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    const p = points[points.length - 1];
    this.lineTo(p.x, p.y);
    return this;
  },

  /**
   * @function strokeMultiCurve
   * @memberof Context
   * @description Draws and strokes a smooth, continuous curve through a series of points.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @returns This context.
   */
  strokeMultiCurve: function(points) {
    this.beginPath();
    this.multiCurve(points);
    this.stroke();
    return this;
  },

  /**
   * @function multiLoop
   * @memberof Context
   * @description Draws a smooth, continuous closed loop through a series of points.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @returns This context.
   */
  multiLoop: function(points) {
    const pA = points[0];
    const pZ = points[points.length - 1];
    const mid1x = (pZ.x + pA.x) / 2;
    const mid1y = (pZ.y + pA.y) / 2;
    this.moveTo(mid1x, mid1y);
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midx = (p0.x + p1.x) / 2;
      const midy = (p0.y + p1.y) / 2;
      this.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    this.quadraticCurveTo(pZ.x, pZ.y, mid1x, mid1y);
    return this;
  },

  /**
   * @function strokeMultiLoop
   * @memberof Context
   * @description Draws a and strokes a smooth, continuous closed loop through a series of points.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @returns This context.
   */
  strokeMultiLoop: function(points) {
    this.beginPath();
    this.multiLoop(points);
    this.stroke();
    return this;
  },

  /**
   * @function fillMultiLoop
   * @memberof Context
   * @description Draws and fills a smooth, continuous closed loop through a series of points.
   * @param {array} points - An array of point objects (any object with an x and y property).
   * @returns This context.
   */
  fillMultiLoop: function(points) {
    this.beginPath();
    this.multiLoop(points);
    this.fill();
    return this;
  },

  /**
   * @function grid
   * @memberof Context
   * @description Draws and strokes a rectangular grid.
   * @param {number} x - The x position of the area to draw the grid in.
   * @param {number} y - The y position of the area to draw the grid in.
   * @param {number} w - The width of the area to draw the grid in.
   * @param {number} h - The height of the area to draw the grid in.
   * @param {number} xres - The horizontal spacing of grid lines.
   * @param {number} yres - The vertical spacing of grid lines.
   * @returns This context.
   */
  grid: function(x, y, w, h, xres, yres) {
    this.beginPath();
    for (let xx = x; xx < x + w; xx += xres) {
      this.moveTo(xx, y);
      this.lineTo(xx, y + h);
    }
    for (let yy = y; yy < y + h; yy += yres) {
      this.moveTo(x, yy);
      this.lineTo(x + w, yy);
    }
    this.stroke();
    return this;
  },

  /**
   * @function hexGrid
   * @memberof Context
   * @description Draws a hexagonal grid.
   * @param {number} x - The x position of the area to draw the grid in.
   * @param {number} y - The y position of the area to draw the grid in.
   * @param {number} w - The width of the area to draw the grid in.
   * @param {number} h - The height of the area to draw the grid in.
   * @param {number} size0 - The size of the hexagons used to create the grid spacing
   * @param {number} size1 - The size of the hexagons that will actually be drawn. If smaller than size0, hexagons will be separated from each other by the difference in these two parameters.
   * @returns This context.
   */
  hexGrid: function(x, y, w, h, size0, size1) {
    const sin60r = Math.sin(Math.PI / 3) * size0;
    const xInc = 2 * sin60r;
    const yInc = size0 * 1.5;
    let offset = 0;

    for (let yy = y; yy < y + h + yInc; yy += yInc) {
      for (let xx = x; xx < x + w + xInc; xx += xInc) {
        this.polygon(xx + offset, yy, size1, 6, Math.PI / 2);
      }
      if (offset === 0) {
        offset = sin60r;
      } else {
        offset = 0;
      }
    }
    return this;
  },

  /**
   * @function strokeHexGrid
   * @memberof Context
   * @description Draws and strokes a hexagonal grid.
   * @param {number} x - The x position of the area to draw the grid in.
   * @param {number} y - The y position of the area to draw the grid in.
   * @param {number} w - The width of the area to draw the grid in.
   * @param {number} h - The height of the area to draw the grid in.
   * @param {number} size0 - The size of the hexagons used to create the grid spacing
   * @param {number} size1 - The size of the hexagons that will actually be drawn. If smaller than size0, hexagons will be separated from each other by the difference in these two parameters.
   * @returns This context.
   */
  strokeHexGrid: function(x, y, w, h, size0, size1) {
    this.save();
    this.rect(x, y, w, h);
    this.clip();
    this.beginPath();
    this.hexGrid(x, y, w, h, size0, size1);
    this.stroke();
    this.restore();
    return this;
  },

  /**
   * @function fillHexGrid
   * @memberof Context
   * @description Draws and fills a hexagonal grid.
   * @param {number} x - The x position of the area to draw the grid in.
   * @param {number} y - The y position of the area to draw the grid in.
   * @param {number} w - The width of the area to draw the grid in.
   * @param {number} h - The height of the area to draw the grid in.
   * @param {number} size0 - The size of the hexagons used to create the grid spacing
   * @param {number} size1 - The size of the hexagons that will actually be drawn. If smaller than size0, hexagons will be separated from each other by the difference in these two parameters.
   * @returns This context.
   */
  fillHexGrid: function(x, y, w, h, size0, size1) {
    this.save();
    this.rect(x, y, w, h);
    this.clip();
    this.beginPath();
    this.hexGrid(x, y, w, h, size0, size1);
    this.fill();
    this.restore();
    return this;
  },

  /**
   * Clears the context to the specified rgb color.
   * @param {number} r - The red channel of the color.
   * @param {number} g - The green channel of the color.
   * @param {number} b - The blue channel of the color.
   * @returns This context.
   */
  clearRGB: function(r, g, b) {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.restore();
    return this;
  },

  /**
   * Clears the context to white.
   * @returns This context.
   */
  clearWhite: function() {
    this.clearRGB(255, 255, 255);
    return this;
  },

  /**
   * Clears the context to black.
   * @returns This context.
   */
  clearBlack: function() {
    this.clearRGB(0, 0, 0);
    return this;
  },

  /**
   * Clears the context to the specified grey shade.
   * @param {number} g - The grey shade.
   * @returns This context.
   */
  clearGrey: function(g) {
    this.clearRGB(g, g, g);
    return this;
  },

  /**
   * Clears the context to the specified color.
   * @param {object} color - The color (from the Color module) to clear with.
   * @returns This context.
   */
  clearColor(color) {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.fillStyle = color.toString();
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.restore();
    return this;
  },

  /**
   * Set the fill color to the specified color.
   * @param {number} r - The red channel of the color.
   * @param {number} g - The green channel of the color.
   * @param {number} b - The blue channel of the color.
   * @returns This context.
   */
  setFillRGB: function(r, g, b) {
    this.fillStyle = Color.rgb(r, g, b).toString();
    return this;
  },

  /**
   * Set the fill color to the specified color.
   * @param {number} h - The hue of the color.
   * @param {number} s - The saturation of the color.
   * @param {number} v - The value of the color.
   * @returns This context.
   */
  setFillHSV: function(h, s, v) {
    this.fillStyle = Color.hsv(h, s, v).toString();
    return this;
  },

  /**
   * Set the stroke color to the specified color.
   * @param {number} r - The red channel of the color.
   * @param {number} g - The green channel of the color.
   * @param {number} b - The blue channel of the color.
   * @returns This context.
   */
  setStrokeRGB: function(r, g, b) {
    this.strokeStyle = Color.rgb(r, g, b).toString();
    return this;
  },

  /**
   * Set the stroke color to the specified color.
   * @param {number} h - The hue of the color.
   * @param {number} s - The saturation of the color.
   * @param {number} v - The value of the color.
   * @returns This context.
   */
  setStrokeHSV: function(h, s, v) {
    this.strokeStyle = Color.hsv(h, s, v).toString();
    return this;
  },

  /**
   * Gets the color value at a particular x, y position.
   * @param {number} x - The x position of the pixel to get the color of.
   * @param {number} y - The y position of the pixel to get the color of.
   * @returns a string represenation of the color at that pixel.
   */
  getPixel: function(x, y) {
    const data = this.getImageData(x, y, 1, 1);
    return `rgba(${data.data[0]}, ${data.data[1]}, ${data.data[2]}, ${data.data[3]}`;
  },

  /**
   * Gets the aspect ratio of the canvas/context (width divided by height).
   * @returns The aspect ratio.
   */
  getAspectRatio: function() {
    return this.canvas.width / this.canvas.height;
  },

};

