const fs = require('fs');
const _ = require('lodash');

const URI = 'custom';
const RESIZE_MODE = 'keepAspect';
const TINT_MODE = 'colorized';
const OUTPUT_FILE_TYPE = '.svg';

// Sticker packs
const packs = [
  {
    name: 'space',
    folder: './images/Space Pack 1/'
  },
  {
    name: 'garden',
    folder: './images/Garden Pack 1/'
  },
  {
    name: 'cactus',
    folder: './images/Cactus Pack 1/'
  }
];

packs.forEach((pack) => {
  const item = {
    "identifier": pack.name,
    "name": _.capitalize(pack.name),
    "thumbnailURI": "/custom/background.png",
    "items": [],
  };

  // Read files in pack (ignore hidden files like .DS_Store)
  fs.readdirSync(pack.folder)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    .forEach((fileName) => {
      const identifier = fileName.replace(' ', '');

      // Construct full file uri
      const fileURI = `${URI}/${pack.name}/${identifier.replace('.png', OUTPUT_FILE_TYPE)}`;

      item.items.push({
        "identifier": identifier,
        "name": _.capitalize(fileName),
        "stickerURI": fileURI,
        "thumbnailURI": fileURI,
        "resizeMode": RESIZE_MODE,
        "tintMode": TINT_MODE,
      })
    })

  // Stringify json with correct format
  const json = JSON.stringify(item, null, 2);

  // Write to stick pack json file
  fs.writeFileSync('./json/'+pack.name+'-stickers.json', json);
  console.log('Created json file ' + pack.name + '-stickers.json')
})
