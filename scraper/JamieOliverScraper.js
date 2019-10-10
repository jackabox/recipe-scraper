const BaseScraper = require('./BaseScraper')

class JamieOliverScraper extends BaseScraper {
  constructor() {
    super({
      name: '.single-recipe-details h1',
      description: '.recipe-intro',
      totalTime: '.recipe-detail.time',
      servings: '.recipe-detail.serves',
      ingredients: '.ingred-list > li:not(.ingred-heading)',
      method: '.recipeSteps li',
      image: '.hero-wrapper img',
      nutrition: {
        calories: '.nutrition-expanded li[title="Calories"] .top',
        fat: '.nutrition-expanded li[title="Fat"] .top',
        saturates: '.nutrition-expanded li[title="Saturates"] .top',
        carbs: '.nutrition-expanded li[title="Carbs"] .top',
        sugars: '.nutrition-expanded li[title="Sugars"] .top',
        fibre: '.nutrition-expanded li[title="Fibre"] .top',
        protein: '.nutrition-expanded li[title="Protein"] .top',
        salt: '.nutrition-expanded li[title="Salt"] .top'
      }
    })

    this.source = 'Jamie Oliver'
  }

  handleIngredients(ingredients) {
    this.ingredients = []

    Array.prototype.forEach.call(ingredients, ({ children }) => {
      const { data } = children[0]
      const parsedItem = super.formatIngredient(data)
      this.ingredients.push(parsedItem)
    })
  }

  handleMethod(method) {
    this.method = []

    Array.prototype.forEach.call(method, ({ children }) => {
      this.method.push(children[0].data)
    })
  }
}

module.exports = JamieOliverScraper
