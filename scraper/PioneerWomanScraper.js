const BaseScraper = require('./BaseScraper')
const cheerio = require('cheerio')

class PioneerWomanScraper extends BaseScraper {
  constructor() {
    super({
      name: '.recipe-summary-title h3.recipe-title',
      description: '.recipe-intro',
      prepTime: '.recipe-summary-time > dl:nth-child(1) > dd',
      cookTime: '.recipe-summary-time > dl:nth-child(3) > dd',
      servings: '.recipe-summary-time > dl:nth-child(4) > dd',
      ingredients: '.list-ingredients > li',
      method: '.panel-body',
      image: '.recipe-summary-thumbnail img'
    })

    this.source = 'The Pioneer Woman'
  }

  handleIngredients(ingredients) {
    this.ingredients = []

    Array.prototype.forEach.call(ingredients, ({ children }) => {
      let text = ''

      children.forEach(item => {
        text = text + item.children[0].data
      })

      const parsedItem = super.formatIngredient(text)
      this.ingredients.push(parsedItem)
    })
  }

  handleMethod(method) {
    this.method = []

    const methodArray = method.text().split(/\n+/)

    Array.prototype.forEach.call(methodArray, item => {
      const text = item.replace(/\t+/g, '')

      if (text) {
        this.method.push(text)
      }
    })
  }
}

module.exports = PioneerWomanScraper
