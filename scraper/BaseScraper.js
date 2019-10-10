const request = require('request-promise')
const cheerio = require('cheerio')
const ingredientParser = require('ingredients-parser')

class BaseScraper {
  constructor(scraperTargets) {
    this.name = null
    this.description = null
    this.cookTime = null
    this.prepTime = null
    this.totalTime = null
    this.servings = 1
    this.ingredients = []
    this.method = []
    this.image = []
    this.nutrition = {}
    this.toScrape = scraperTargets
  }

  async fetch(url) {
    try {
      const html = await request(url)

      if (this.toScrape.name) {
        this.handleName(cheerio(this.toScrape.name, html))
      }

      if (this.toScrape.description) {
        this.handleDescription(cheerio(this.toScrape.description, html))
      }

      if (this.toScrape.cookTime) {
        this.handleCookTime(cheerio(this.toScrape.cookTime, html))
      }

      if (this.toScrape.prepTime) {
        this.handlePrepTime(cheerio(this.toScrape.prepTime, html))
      }

      if (this.toScrape.totalTime) {
        this.handleTotalTime(cheerio(this.toScrape.totalTime, html))
      }

      if (this.toScrape.servings) {
        this.handleServings(cheerio(this.toScrape.servings, html))
      }

      // Ingredients
      if (this.toScrape.ingredients) {
        this.handleIngredients(cheerio(this.toScrape.ingredients, html))
      }

      // method
      if (this.toScrape.method) {
        this.handleMethod(cheerio(this.toScrape.method, html))
      }

      // Image
      if (this.toScrape.image) {
        this.handleImage(cheerio(this.toScrape.image, html))
      }

      // Nutrients
      if (this.toScrape.nutrition) {
        this.handleNutrition(this.toScrape.nutrition, html)
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleName(name) {
    this.name = name.text()
  }

  handleDescription(description) {
    this.description = description
      .text()
      .replace(/“|”/gi, '')
      .trim()
  }

  handleCookTime(cookTime) {
    this.cookTime = parseInt(cookTime.text().match(/\d+/)[0])
  }

  handlePrepTime(prepTime) {
    this.prepTime = parseInt(prepTime.text().match(/\d+/)[0])
  }

  handleTotalTime(totalTime) {
    this.totalTime = parseInt(totalTime.text().match(/\d+/)[0])
  }

  handleServings(servings) {
    this.servings = parseInt(servings.text().match(/\d+/)[0])
  }

  handleIngredients(ingredients) {
    // @todo implement here
  }

  handleMethod(method) {
    // @todo implement here
  }

  handleImage(image) {
    if (image.length) {
      this.image = image[0].attribs.src
    }
  }

  handleNutrition(nutrition, html) {
    const calories = cheerio(nutrition.calories, html)
    if (calories) {
      this.nutrition.calories = calories.text().trim()
    }

    const fat = cheerio(nutrition.fat, html)
    if (fat) {
      this.nutrition.fat = fat.text().trim()
    }

    const saturates = cheerio(nutrition.saturates, html)
    if (saturates) {
      this.nutrition.saturates = saturates.text().trim()
    }

    const carbs = cheerio(nutrition.carbs, html)
    if (carbs) {
      this.nutrition.carbs = carbs.text().trim()
    }

    const sugars = cheerio(nutrition.sugars, html)
    if (sugars) {
      this.nutrition.sugars = sugars.text().trim()
    }

    const fibre = cheerio(nutrition.fibre, html)
    if (fibre) {
      this.nutrition.fibre = fibre.text().trim()
    }

    const protein = cheerio(nutrition.protein, html)
    if (protein) {
      this.nutrition.protein = protein.text().trim()
    }

    const salt = cheerio(nutrition.salt, html)
    if (salt) {
      this.nutrition.salt = salt.text().trim()
    }
  }

  /**
   * Format the single ingredient so that
   * it gives back amount, ingredient and unit
   *
   * @param item
   */
  formatIngredient(item) {
    let parsed = item
      .trim()
      .replace('½', '0.5')
      .replace(/\s\s+/g, ' ')

    parsed = ingredientParser.parse(parsed)
    return parsed
  }

  get data() {
    return {
      source: this.source,
      name: this.name,
      description: this.description,
      cookTime: this.cookTime,
      prepTime: this.prepTime,
      totalTime: this.totalTime,
      servings: this.servings,
      ingredients: this.ingredients,
      method: this.method,
      image: this.image,
      nutrition: this.nutrition
    }
  }
}

module.exports = BaseScraper
