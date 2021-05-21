default:
	@rollup -c
	@uglifyjs dist/bljs_1.0.0.js -o dist/bljs_1.0.0.min.js
	@uglifyjs dist/bljs_1.0.0.mjs -o dist/bljs_1.0.0.min.mjs
	@ffreload


