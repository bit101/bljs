export class Complex {
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }

  add(other) {
    if (typeof other === "number") {
      other = new Complex(other, 0);
    }
    return new Complex(this.r + other.r, this.i + other.i);
  }

  sub(other) {
    if (typeof other === "number") {
      other = new Complex(other, 0);
    }
    return new Complex(this.r - other.r, this.i + other.i);
  }

  mult(other) {
    if (typeof other === "number") {
      other = new Complex(other, 0);
    }
    return new Complex(this.r * other.r - this.i * other.i, this.r * other.i + this.i * other.r);
  }

  div(other) {
    if (typeof other === "number") {
      other = new Complex(other, 0);
    }
    const denom = other.r * other.r + other.i * other.i;
    const r = (this.r * other.r + this.i * other.i) / denom;
    const i = (-this.r * other.i + this.i * other.r) / denom;
    return new Complex(r, i);
  }

  square() {
    return new Complex(this.r * this.r - this.i * this.i, 2 * this.r * this.i);
  }

  arg() {
    return Math.atan2(this.i, this.r);
  }

  abs() {
    return Math.sqrt(this.r * this.r + this.i * this.i);
  }

  conj() {
    return new Complex(this.r, -this.i);
  }

  log() {
    const r = Math.log(this.abs());
    const i = this.argument();
    return new Complex(r, i);
  }

  log10() {
    const r = Math.log(this.abs());
    const i = this.argument();
    return new Complex(r, i).divide(Math.log(10));
  }

  pow(n) {
    // todo. make this better
    if (n === 0) {
      return 1;
    }
    if (n < 0 || Math.round(n) !== n) {
      throw new Error("Complex.pow does not work with negative or fractional powers at this point.");
    }
    let z = new Complex(this.r, this.i);
    for (let i = 1; i < n; i++) {
      z = z.mult(this);
    }
    return z;
  }
}
