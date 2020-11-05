const sizeOf = require('image-size');
const fs = require('fs');

const uri = './static/static/photoeditorsdk-assets/stickers/custom/';
const path = './images/Space Pack 1/Space PNGs/Space 1.png';
const dimensions = sizeOf(path);

const packs = [
  {
    name: 'space',
    folder: './images/Space Pack 1/Space PNGs/'
  }
]

packs[0].files = fs.readdirSync(packs[0].folder);

let data = { categories: [] };

packs.forEach((pack) => {
  const cat = {
    "identifier": pack.name,
    "defaultName": pack.name,
    "metaData": {
      "backgroundImage": "stickers/background.png"
    },
    "stickers": []
  };

  pack.files.forEach((fileName) => {
    const identifier = fileName.replace(' ', '');
    const dimensions = sizeOf(pack.folder + fileName);
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
  
  data.categories.push(cat);
})
const json = JSON.stringify(data, null, 2);
fs.writeFileSync('data.json', json);
console.log(packs);









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