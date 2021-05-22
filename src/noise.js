export const Noise = {
  perlin1(x) {
    return Noise.perlin(x, 0, 0);
  },

  // Perlin2 is 2d perlin noise
  perlin2(x, y) {
    return Noise.perlin(x, y, 0);
  },

  // Perlin is 3d perlin noise
  perlin(x, y, z) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;
    let Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    let u = Noise.fade(x);
    let v = Noise.fade(y);
    let w = Noise.fade(z);
    let A = Noise.p[X] + Y;
    let AA = Noise.p[A] + Z;
    let AB = Noise.p[A + 1] + Z;
    let B = Noise.p[X + 1] + Y;
    let BA = Noise.p[B] + Z;
    let BB = Noise.p[B + 1] + Z;
    return Noise.lerp(w, Noise.lerp(v, Noise.lerp(u, Noise.grad(Noise.p[AA], x, y, z),
      Noise.grad(Noise.p[BA], x - 1, y, z)),
    Noise.lerp(u, Noise.grad(Noise.p[AB], x, y - 1, z),
      Noise.grad(Noise.p[BB], x - 1, y - 1, z))),
    Noise.lerp(v, Noise.lerp(u, Noise.grad(Noise.p[AA + 1], x, y, z - 1),
      Noise.grad(Noise.p[BA + 1], x - 1, y, z - 1)),
    Noise.lerp(u, Noise.grad(Noise.p[AB + 1], x, y - 1, z - 1),
      Noise.grad(Noise.p[BB + 1], x - 1, y - 1, z - 1))));
  },

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  },

  lerp(t, a, b) {
    return a + t * (b - a);
  },

  grad(hash, x, y, z) {
    switch (hash & 15) {
    case 0, 12:
      return x + y;
    case 1, 14:
      return y - x;
    case 2:
      return x - y;
    case 3:
      return -x - y;
    case 4:
      return x + z;
    case 5:
      return z - x;
    case 6:
      return x - z;
    case 7:
      return -x - z;
    case 8:
      return y + z;
    case 9, 13:
      return z - y;
    case 10:
      return y - z;
    }
    // case 11, 16:
    return -y - z;
  },

  p: [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
  ],

  // PerlinOct creates Perlin noise with given number of octaves.
  // persistence does well at 0.5 to start with.
  perlinOct(x, y, z, octaves, persistence) {
    let total = 0.0;
    let frequency = 1.0;
    let amplitude = 1.0;
    let maxValue = 0.0; // Used for normalizing result to -1.0 - 1.0
    for (let i = 0; i < octaves; i++) {
      total += Noise.perlin(x * frequency, y * frequency, z * frequency) * amplitude;

      maxValue += amplitude;

      amplitude *= persistence;
      frequency *= 2;
    }

    return total / maxValue;
  },
};
