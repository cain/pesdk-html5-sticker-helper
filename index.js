const sizeOf = require('image-size');
const fs = require('fs');

// Uri for main repo
const uri = './static/static/photoeditorsdk-assets/stickers/custom/';

// Sticker packs
const packs = [
  {
    name: 'space',
    folder: './images/Space Pack 1/Space PNGs/'
  }
]

const data = { categories: [] };

packs.forEach((pack) => {
  const cat = {
    "identifier": pack.name,
    "defaultName": pack.name,
    "metaData": {
      "backgroundImage": "stickers/background.png"
    },
    "stickers": []
  };

  // Read files in pack
  fs.readdirSync(packs[0].folder).forEach((fileName) => {
    const identifier = fileName.replace(' ', '');
    const dimensions = sizeOf(pack.folder + fileName);

    // Construct full file uri
    const fileURI = `${uri}${pack.name}/${fileName.replace('.png', '.svg')}`
    cat.stickers.push({
      "identifier": identifier,
      "defaultName": fileName,
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
  
  // Push to main data object
  data.categories.push(cat);
})

// Stringify json with correct format
const json = JSON.stringify(data, null, 2);

// Write to json file
fs.writeFileSync('data.json', json);

// Data structure
// "categories": [
//   {
//     "identifier": "custom_stickers",
//     "defaultName": "Custom Stickers",
//     "metaData": {
//       "backgroundImage": "stickers/background.png"
//     },
//     "stickers": [
//       {
//         "identifier": "custom_sticker_cactus_1",
//         "defaultName": "Cactus",
//         "images": {
//           "mediaBase": {
//             "uri": "stickers/custom/cactus/cactus-1.svg",
//             "width": 344,
//             "height": 500
//           },
//           "mediaThumb": {
//             "uri": "stickers/custom/cactus/cactus-1.svg",
//             "width": 50,
//             "height": 50
//           }
//         }
//       }
//     ]
//   }
// ],