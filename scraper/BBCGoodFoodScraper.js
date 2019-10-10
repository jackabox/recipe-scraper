const BaseScraper = require('./BaseScraper')

class BBCGoodFoodScraper extends BaseScraper {
  constructor() {
    super({
      name: '.recipe-header__title',
      description: '.recipe-header__description p',
      cookTime: '.recipe-details__cooking-time-cook',
      prepTime: '.recipe-details__cooking-time-prep',
      servings: '.recipe-details__item--servings span',
      ingredients: '.ingredients-list__group > li',
      method: '.method__item p',
      image: '.recipe-header__media .img-container img',
      nutrition: {
        calories: '.nutrition li span[itemprop="calories"]',
        fat: '.nutrition li span[itemprop="fatContent"]',
        saturates: '.nutrition li span[itemprop="saturatedFatContent"]',
        carbs: '.nutrition li span[itemprop="carbohydrateContent"]',
        sugars: '.nutrition li span[itemprop="sugarContent"]',
        fibre: '.nutrition li span[itemprop="fiberContent"]',
        protein: '.nutrition li span[itemprop="proteinContent"]',
        salt: '.nutrition li span[itemprop="sodiumContent"]'
      }
    })

    this.source = 'BBC Good Food'
  }

  handleIngredients(ingredients) {
    this.ingredients = []

    Array.prototype.forEach.call(ingredients, item => {
      const parsedItem = super.formatIngredient(item.attribs.content)
      this.ingredients.push(parsedItem)
    })
  }

  handleMethod(method) {
    this.method = []

    Array.prototype.forEach.call(method, ({ children }) => {
      let childHtml = ''

      Array.prototype.forEach.call(children, ({ data }) => {
        childHtml = childHtml + data
      })

      this.method.push(childHtml)
    })
  }
}

module.exports = BBCGoodFoodScraper
