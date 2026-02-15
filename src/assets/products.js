/*
  products.js
  - Imports images in this folder
  - Exports `products` array with randomized values for name, price, inStock, image, description
  - The randomisation runs at import time; if you want stable values, change generateProducts() usage
*/

// Image imports (sanitized variable names)
import img10Steps from './10 steps to successtion.png';
import imgArtSecret from './art and secret.png';
import imgAustralia from './australia.png';
import imgBahrain from './bahrain.png';
import imgBestFiction from './Best-Fiction_updated-768x512.jpg';
import imgBu5ari from './bu5ari.png';
import imgCanada from './canada.png';
import imgChina from './china.png';
import imgDownload from './download.jpeg';
import imgEurope from './europe.png';
import imgExcellence from './excellence.png';
import imgFeqyJpeg from './feqy.jpeg';
import imgFeqy from './feqy.jpg';
import imgFosdoq from './fosdoq.jpg';
import imgOffensive from './fuck.png';
import imgGoodThinking from './goodthinking and bad thinking.png';
import imgHabits from './habits.jpeg';
import imgHarry1 from './Harry potter 1.png';
import imgHarry2 from './harry potter 2.png';
import imgHarry6 from './harry potter 6.png';
import imgHarryPackage from './harry potter package.png';
import imgHarry3 from './Harry Potter3.png';
import imgHarry4 from './harry potter4.png';
import imgHarry5a from './harry potter5 (1).png';
import imgHarry5 from './harry potter5.png';
import imgHarry7 from './harry potter7.png';
import imgIndia from './india.png';
import imgIraq from './iraq.png';
import imgIslamicHistory from './islamic history.jpeg';
import imgJaririd1 from './jaririd (1).png';
import imgJaririd from './jaririd.png';
import imgMostafa from './mostafameha.jpeg';
import imgMuslim from './muslim.jpeg';
import imgOIP3 from './OIP (3).webp';
import imgOIP4 from './OIP (4).webp';
import imgPoordad from './poordadrichdad.png';
import imgPowerThinking from './power of thinking.png';
import imgProductivity from './productivity.png';
import imgProphet from './prophet.png';
import imgQuran from './quran.png';
import imgQuranPieces from './quranpieces.png';
import imgRussia from './russia.png';
import imgs7aba from './s7aba.jpg';
import imgSa7aba from './sa7aba.png';
import imgSham from './sham.png';
import imgTabe3en from './tabe3en.png';
import imgUSA from './usa.png';
import imgWakeup from './wakeup.png';
import imgWimpyKidBlack from './wimpykidblack.png';
import imgWimpyKidBlood from './wimpykidblood.png';
import imgWimpyKidBlue from './wimpykidblue.png';
import imgWimpyKidBrown from './wimpykidbrown.png';
import imgWimpyKidDarkBrown from './wimpykiddarkbrown.png';
import imgWimpyKidDarkGreen from './wimpykiddarkgreen.png';
import imgWimpyKidGreen from './wimpykidgreen.png';
import imgWimpyKidLightBlue from './wimpykidlightblue.png';
import imgWimpyKidOrange from './wimpykidorange.png';
import imgWimpyKidPackage from './wimpykidpackage.png';
import imgWimpyKidPurple from './wimpykidpurple.png';
import imgWimpyKidRed from './wimpykidred.png';
import imgWimpyKidYellow from './wimpykidyellow.png';

// Put imports in an array for mapping
const images = [
  img10Steps,
  imgArtSecret,
  imgAustralia,
  imgBahrain,
  imgBestFiction,
  imgBu5ari,
  imgCanada,
  imgChina,
  imgDownload,
  imgEurope,
  imgExcellence,
  imgFeqyJpeg,
  imgFeqy,
  imgFosdoq,
  imgOffensive,
  imgGoodThinking,
  imgHabits,
  imgHarry1,
  imgHarry2,
  imgHarry6,
  imgHarryPackage,
  imgHarry3,
  imgHarry4,
  imgHarry5a,
  imgHarry5,
  imgHarry7,
  imgIndia,
  imgIraq,
  imgIslamicHistory,
  imgJaririd1,
  imgJaririd,
  imgMostafa,
  imgMuslim,
  imgOIP3,
  imgOIP4,
  imgPoordad,
  imgPowerThinking,
  imgProductivity,
  imgProphet,
  imgQuran,
  imgQuranPieces,
  imgRussia,
  imgs7aba,
  imgSa7aba,
  imgSham,
  imgTabe3en,
  imgUSA,
  imgWakeup,
  imgWimpyKidBlack,
  imgWimpyKidBlood,
  imgWimpyKidBlue,
  imgWimpyKidBrown,
  imgWimpyKidDarkBrown,
  imgWimpyKidDarkGreen,
  imgWimpyKidGreen,
  imgWimpyKidLightBlue,
  imgWimpyKidOrange,
  imgWimpyKidPackage,
  imgWimpyKidPurple,
  imgWimpyKidRed,
  imgWimpyKidYellow,
];

// Helper arrays to create random names/descriptions
const adjectives = [
  'Epic', 'Classic', 'Modern', 'Vintage', 'Limited', 'Collector', 'Special', 'Ultimate', 'Compact', 'Deluxe', 'Essential', 'Smart', 'Handy', 'Premium'
];

const nouns = [
  'Edition', 'Collection', 'Guide', 'Journal', 'Volume', 'Series', 'Package', 'Set', 'Book', 'Manual', 'Kit', 'Companion'
];

const descStarts = [
  'A must-read for anyone interested in',
  'An engaging look at',
  'A concise guide on',
  'A delightful exploration of',
  'An essential companion for'
];

const descObjects = [
  'personal growth', 'productivity', 'history', 'faith', 'fiction', 'creativity', 'strategy', 'habits', 'leadership'
];

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomName() {
  return `${choose(adjectives)} ${choose(nouns)}`;
}

function randomPrice() {
  // Price between 3.99 and 49.99
  return Number((Math.random() * (49.99 - 3.99) + 3.99).toFixed(2));
}

function randomInStock() {
  // Return boolean and quantity (0 if out of stock)
  const inStock = Math.random() > 0.2; // 80% chance in stock
  return inStock ? Math.floor(Math.random() * 30) + 1 : 0;
}

function randomDescription() {
  return `${choose(descStarts)} ${choose(descObjects)}.`;
}

function generateProducts() {
  return images.map((img, i) => ({
    id: i + 1,
    name: randomName(),
    price: randomPrice(),
    inStock: randomInStock(),
    image: img,
    description: randomDescription(),
  }));
}

// Export a generated products array. Import-time randomness ensures each run has slightly different values.
const products = generateProducts();

export default products;
export { products };
