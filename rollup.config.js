export default {
  input: "src/bljs.js",
  output: [
    {
      file: `dist/bljs.js`,
      format: 'iife',
      name: "bljs",
    },
    {
      file: `dist/bljs.mjs`,
      format: 'es',
    },
  ],
};
