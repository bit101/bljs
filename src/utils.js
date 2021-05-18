export const Utils = {
  fillArray: function(count, func, ...args) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(func(...args));
    }
    return result;
  },
}
