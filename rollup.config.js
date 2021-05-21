const tag = "1.0.0";

export default {
  input: "src/bljs.js",
  output: [
    {
      file: `dist/bljs_${tag}.js`,
      format: 'iife',
      name: "bljs",
    },
    {
      file: `dist/bljs_${tag}.mjs`,
      format: 'es',
    },
  ],
};
