export default {
  input: "src/bljs.js",
  output: [
    {
      file: 'dist/bljs.js',
      format: 'iife',
      name: "mc2",
    },
    {
      file: 'dist/bljs.mjs',
      format: 'es',
    },
  ],
};
