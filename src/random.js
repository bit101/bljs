export const Random = {
  _seed: Date.now(),
  _a: 1664525,
  _c: 1013904223,
  _m: Math.pow(2, 32),

  seed: function(seed) {
    Random._seed = seed;
  },

  _int: function() {
    // range [0, 2^32)
    Random._seed = (Random._seed * Random._a + Random._c) % Random._m;
    return Random._seed;
  },

  _float: function() {
    // range [0, 1)
    return Random._int() / Random._m;
  },

  bool: function(percent) {
    // percent is chance of getting true
    if (percent === null) {
      percent = 0.5;
    }
    return Random._float() < percent;
  },

  float: function(min, max) {
    // range [min, max)
    if (arguments.length === 1) {
      return Random._float() * min;
    }
    if (arguments.length === 2) {
      return min + Random._float() * (max - min);
    }
    return Random._float();
  },

  int: function(min, max) {
    // range [min, max)
    if (arguments.length === 1) {
      return Math.floor(Random._float() * min);
    }
    if (arguments.length === 2) {
      return Math.floor(Random.float(min, max));
    }
    return Random._int();
  },

  point: function(x, y, w, h) {
    const xx = Random.float(x, x + w);
    const yy = Random.float(y, y + h);
    return { x: xx, y: yy };
  },

  circle: function(x, y, w, h, rMin, rMax) {
    const xx = Random.float(x, x + w);
    const yy = Random.float(y, y + h);
    const r = Random.float(rMin, rMax);
    return { x: xx, y: yy, r: r };
  },

  power: function(min, max, power) {
    if (arguments.length === 2) {
      power = max;
      max = min;
      min = 0;
    }
    return min + Math.pow(Random.float(1), power) * (max - min);
  },

  powerInt: function(min, max, power) {
    return Math.floor(Random.power(min, max, power));
  },

  gauss: function(min, max, g) {
    if (arguments.length === 2) {
      g = max;
      max = min;
      min = 0;
    }
    let total = 0;
    for (let i = 0; i < g; i++) {
      total += Random.float(min, max);
    }
    return total / g;
  },

  chooser: function() {
    return {
      choices: [],
      total: 0,

      addChoice: function (choice, weight) {
        if (weight === null) weight = 1;

        this.choices.push({
          weight: weight,
          choice: choice,
        });
        this.total += weight;
        return this;
      },

      getChoice: function () {
        let rand = Random.float(0, this.total);
        for (let i = 0; i < this.choices.length; i++) {
          const choice = this.choices[i];
          if (rand < choice.weight) {
            return choice.choice;
          }
          rand -= choice.weight;
        }
      },
    };
  },
};

