const BaseScraper = require('./BaseScraper')

class AllRecipesScraper extends BaseScraper {
  constructor() {
    super({
      name: '.recipe-summary__h1',
      cookTime: 'time[itemprop="cookTime"] .prepTime__item--time',
      prepTime: 'time[itemprop="prepTime"] .prepTime__item--time',
      totalTime: 'time[itemprop="totalTime"] .prepTime__item--time',
      servings: 'meta[itemprop="recipeYield"]',
      ingredients: '.recipe-ingred_txt',
      method: 'span.recipe-directions__list--item',
      image: '#main-photo-image'
    })

    this.source = 'allrecipes'
  }

  handleIngredients(ingredients) {
    this.ingredients = []

    Array.prototype.forEach.call(ingredients, ({ children }) => {
      if (children.length) {
        const parsedItem = super.formatIngredient(children[0].data)
        this.ingredients.push(parsedItem)
      }
    })
  }

  handleMethod(method) {
    this.method = []

    Array.prototype.forEach.call(method, ({ children }) => {
      if (children.length) {
        console.log('method', children[0].data)
        this.method.push(children[0].data)
      }
    })
  }

  handleServings(servings) {
    this.servings = parseInt(servings.attr('content'))
  }
}

module.exports = AllRecipesScraper
