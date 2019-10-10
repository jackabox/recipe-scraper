const JamieOliverFoodScraper = require('./scraper/JamieOliverScraper')
const PioneerWomanScraper = require('./scraper/PioneerWomanScraper')
const BBCGoodFoodScraper = require('./scraper/BBCGoodFoodScraper')

const allowedUrls = {
  'jamieoliver.com': new JamieOliverFoodScraper(),
  'bbcgoodfood.com': new BBCGoodFoodScraper(),
  'thepioneerwoman.com': new PioneerWomanScraper()
}

const importer = async url => {
  let scraper

  for (var item in allowedUrls) {
    if (url.includes(item)) {
      scraper = allowedUrls[item]
      break
    }
  }

  if (!scraper) {
    return 'Defo no'
  }

  await scraper.fetch(url)

  return scraper.data
}

module.exports = importer
