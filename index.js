const sizeOf = require('image-size');

const path = './static/static/photoeditorsdk-assets/stickers/custom/cactus/cactus-1.png';
const dimensions = sizeOf(path);
console.log(dimensions.width, dimensions.height);

