import { Num } from "./num.js";
import { Random } from "./random.js";

/**
 * @namespace Color
 */
export const Color = {
  /**
   * @function rgb
   * @memberof Color
   * @description Creates a color using red, green and blue values in the range of 0 to 255.
   * @param {number} r - The red value of the color.
   * @param {number} g - The green value of the color.
   * @param {number} b - The blue value of the color.
   * @returns {object} A new Color object.
   */
  rgb: function(r, g, b) {
    return Color.rgba(r, g, b, 1);
  },

  /**
   * @function rgba
   * @memberof Color
   * @description Creates a color using red, green and blue values in the range of 0 to 255, and an alpha value in the range of 0.0 to 1.0.
   * @param {number} r - The red value of the color.
   * @param {number} g - The green value of the color.
   * @param {number} b - The blue value of the color.
   * @param {number} a - The alpha value of the color.
   * @returns {object} A new Color object.
   */
  rgba: function(r, g, b, a) {
    return {
      red: Math.floor(r),
      green: Math.floor(g),
      blue: Math.floor(b),
      alpha: Math.floor(a),
      isColorObject: true,
      toString: function() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
      },
    };
  },

  /**
   * @function rgbf
   * @memberof Color
   * @description Creates a color using red, green and blue values in the range of 0.0 to 1.0.
   * @param {number} r - The red value of the color.
   * @param {number} g - The green value of the color.
   * @param {number} b - The blue value of the color.
   * @param {number} a - The alpha value of the color.
   * @returns {object} A new Color object.
   */
  rgbf: function(r, g, b) {
    return Color.rgbaf(r, g, b, 1);
  },

  /**
   * @function rgbaf
   * @memberof Color
   * @description Creates a color using red, green, blue and alpha values in the range of 0.0 to 1.0.
   * @param {number} r - The red value of the color.
   * @param {number} g - The green value of the color.
   * @param {number} b - The blue value of the color.
   * @param {number} a - The alpha value of the color.
   * @returns {object} A new Color object.
   */
  rgbaf: function(r, g, b, a) {
    return Color.rgb(r * 255, g * 255, b * 255, a);
  },

  /**
   * @function number
   * @memberof Color
   * @description Creates a color from a 24-bit integer in the range of 0 to 16,777,215 (0x000000 to 0xffffff).
   * @param {number} num - The color value.
   * @returns {object} A new Color object.
   */
  number: function(num) {
    return Color.rgb(num >> 16, num >> 8 & 0xff, num & 0xff);
  },

  /**
   * @function randomRGB
   * @memberof Color
   * @description Creates a random color.
   * @returns {object} A new Color object.
   */
  randomRGB: function() {
    return Color.number(Math.floor(Random.int(0xffffff)));
  },

  /**
   * @function gray
   * @memberof Color
   * @description Creates a color which is a shade of gray.
   * @param {number} shade - The shade of gray (0 to 255).
   * @returns {object} A new Color object.
   */
  gray: function(shade) {
    return Color.rgb(shade, shade, shade);
  },

  /**
   * @function randomGray
   * @memberof Color
   * @description Creates a random shade of gray.
   * @returns {object} A new Color object.
   */
  randomGray: function() {
    return Color.gray(Random.int(255));
  },

  /**
   * @function hsv
   * @memberof Color
   * @description Creates a color using hue, saturation and value.
   * @param {number} h - The hue of the color (0 to 360).
   * @param {number} s - The saturation of the color (0.0 to 1.0).
   * @param {number} v - The value of the color (0.0 to 1.0).
   * @returns {object} A new Color object.
   */
  hsv: function(h, s, v) {
    h /= 360;
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    }
    return Color.rgb(r * 255, g * 255, b * 255);
  },

  /**
   * @function lerp
   * @memberof Color
   * @description Linearly interpolates between two colors. Each color can be in the form of a string supported by `Color.string()`, a number suppoted by `Color.number()`, or a Color object.
   * @param {number} t - The interpolation value from 0.0 to 1.0.
   * @param colorA - The first color value. Can be a string or number.
   * @param colorB - The second color value. Can be a string or number.
   * @returns {object} A new Color object.
   */
  lerp: function(t, colorA, colorB) {
    let ca, cb;
    if (typeof colorA === "string") {
      ca = Color.string(colorA);
    }
    else if (typeof colorA === "number") {
      ca = Color.number(colorA);
    }
    else if (colorA.isColorObject) {
      ca = colorA;
    }
    if (typeof colorB === "string") {
      cb = Color.string(colorB);
    }
    else if (typeof colorB === "number") {
      cb = Color.number(colorB);
    }
    else if (colorB.isColorObject) {
      cb = colorB;
    }
    const r = Num.lerp(ca.red, cb.red, t),
      g = Num.lerp(ca.green, cb.green, t),
      b = Num.lerp(ca.blue, cb.blue, t),
      a = Num.lerp(ca.alpha, cb.alpha, t);
    return Color.rgba(r, g, b, a);
  },

  /**
   * @function string
   * @memberof Color
   * @description Creates a color parsed from various string formats. Includes:
   * `#fc0`, `#ffcc00`, `rgb(255, 128, 0)`, or `rgba(255, 128, 0, 255)`, or any standard CSS color name.
   * @param {string} str - The string to parse.
   * @returns {object} A new Color object.
   */
  string: function(str) {
    if (str.charAt(0) === "#" && str.length === 7) {
      str = "0x" + str.substr(1);
      const num = parseInt(str, 16);
      return Color.number(num);
    }
    else if (str.charAt(0) === "#" && str.length === 4) {
      const r = str.charAt(1),
        g = str.charAt(2),
        b = str.charAt(3);
      str = "0x" + r + r + g + g + b + b;
      const num = parseInt(str, 16);
      return Color.number(num);
    }
    else if (str.indexOf("rgba(") === 0) {
      const vals = str.substring(5, str.length - 1).split(",");
      return Color.rgba(
        parseInt(vals[0], 10),
        parseInt(vals[1], 10),
        parseInt(vals[2], 10),
        parseFloat(vals[3])
      );
    }
    else if (str.indexOf("rgb(") === 0) {
      const vals = str.substring(4, str.length - 1).split(",");
      return Color.rgba(
        parseInt(vals[0], 10),
        parseInt(vals[1], 10),
        parseInt(vals[2], 10),
        1
      );
    }
    else if (Color._colorMap[str]) {
      return Color.rgba(
        Color._colorMap[str][0],
        Color._colorMap[str][1],
        Color._colorMap[str][2],
        1
      );
    }

    return Color.rgba(0, 0, 0, 1);
  },

  _colorMap: {
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  },
};

