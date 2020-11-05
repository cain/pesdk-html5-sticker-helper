const sizeOf = require('image-size');
const fs = require('fs');
const _ = require('lodash');

// Uri for main repo
const uri = 'stickers/custom';

// Default stickers
const stickers = ["imgly_sticker_shapes_badge_04", "imgly_sticker_shapes_arrow_02", "imgly_sticker_shapes_arrow_03", "imgly_sticker_shapes_badge_01", "imgly_sticker_shapes_badge_04", "imgly_sticker_shapes_badge_06", "imgly_sticker_shapes_badge_08", "imgly_sticker_shapes_badge_11", "imgly_sticker_shapes_badge_19", "imgly_sticker_shapes_badge_5", "imgly_sticker_shapes_badge_12", "custom_sticker_cactus_1"];

// Sticker packs
const packs = [
  {
    name: 'space',
    folder: './images/Space Pack 1/Space PNGs/'
  },
  {
    name: 'garden',
    folder: './images/Garden Pack 1/Garden PNGs/'
  },
  {
    name: 'cactus',
    folder: './images/Cactus Pack 1/Cactus PNGs/'
  }
];

const data = { availableStickers: stickers };

packs.forEach((pack) => {
  const cat = {
    "identifier": pack.name,
    "defaultName": _.capitalize(pack.name),
    "metaData": {
      "backgroundImage": "stickers/custom/background.png"
    },
    "stickers": []
  };

  // Read files in pack (ignore hidden files like .DS_Store)
  fs.readdirSync(pack.folder)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    .forEach((fileName) => {
      const identifier = fileName.replace(' ', '');
      const dimensions = sizeOf(pack.folder + fileName);

      // Construct full file uri
      const fileURI = `${uri}/${pack.name}/${identifier.replace('.png', '.svg')}`;

      data.availableStickers.push(identifier);
      cat.stickers.push({
        "identifier": identifier,
        "defaultName": _.capitalize(fileName),
        "images": {
          "mediaBase": {
            "uri": fileURI,
            "width": dimensions.width,
            "height": dimensions.height
          },
          "mediaThumb": {
            "uri": fileURI,
            "width": 50,
            "height": 50
          }
        }
      })
    })

  // Stringify json with correct format
  const json = JSON.stringify(cat, null, 2);

  // Write to stick pack json file
  fs.writeFileSync('./json/'+pack.name+'-stickers.json', json);
  console.log('Created json file ' + pack.name + '-stickers.json')
})

// Stringify json with correct format
const json = JSON.stringify(data, null, 2);

// Write to json file
fs.writeFileSync('data.json', json);
