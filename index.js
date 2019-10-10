const AllRecipesScraper = require('./scraper/AllRecipesScraper')
const BBCGoodFoodScraper = require('./scraper/BBCGoodFoodScraper')
const JamieOliverFoodScraper = require('./scraper/JamieOliverScraper')
const PioneerWomanScraper = require('./scraper/PioneerWomanScraper')

const allowedUrls = {
  'allrecipes.com': new AllRecipesScraper(),
  'bbcgoodfood.com': new BBCGoodFoodScraper(),
  'jamieoliver.com': new JamieOliverFoodScraper(),
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
