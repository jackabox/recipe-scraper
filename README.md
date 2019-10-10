# ![Laravel Nova Duplicate Model](https://github.com/jackabox/recipe-scraper/raw/master/title.jpg)

### Introduction

![GitHub release (latest by date)](https://img.shields.io/github/v/release/jackabox/recipe-scraper?style=flat-square)
![GitHub](https://img.shields.io/github/license/jackabox/recipe-scraper?style=flat-square)

**Node Recipe Scraper** is a scraper that utilises the Cheerio package to gather recipe content from various websites around the web. Since there is no easy or standard way for recipes to be parsed from websites we have to do this on a one-by-one basis which can cause a chunk of work. I'm leaving this as open source to hopefully buidl an awesome package with a tonne of scrapers that can work.

As with any scraping of websites, please do not abuse this and try and overload websites. It should be used sparingly.

### Installation (Soon)

I hope to get this up on NPM so it can be installed sooner rather than later but as it's not stable and is subject to change I'm yet to do this. I want to add a good **30** sites before publishing to try and create a solid base scraper that can be used to iron out all the kinks of scraping.

That being said, you are more than welcome to clone this and use it in your site where possible and I'll keep tagging releases as things change.

### Supported Scrapers

| Site Name                                         | Included | Basic Information | Nutrients |
| ------------------------------------------------- | -------- | ----------------- | --------- |
| [All Recipes](https://www.allrecipes.com)         | Yes      | ✔                 | ✕         |
| [BBC Good Food](https://www.bbcgoodfood.com/)     | Yes      | ✔                 | ✔         |
| [Jamie Oliver](https://www.jamieoliver.com/)      | Yes      | ✔                 | ✔         |
| [The Pioneer Woman](https://thepioneerwoman.com/) | Yes      | ✔                 | ✕ (N/A)   |

### Planned Implementations

| Site Name                                       |
| ----------------------------------------------- |
| [The Hairy Bikers](http://www.hairybikers.com/) |

Want to request more? Please open an issue or pull request.

### Demo

I've added a very basic express demo into the `demo` folder. Which looks like the following:

```
const express = require('express')
const importer = require('../index.js')

const app = express()

// Set up the test route to quickly check that stuff is working.
app.get('/v1/scraper', async (req, res) => {
  const { url } = req.query
  const data = await importer(url)
  return res.json(data)
})

app.listen(5000, () => console.log(`Server running on port 5000`))
```

The `index.js` file has an object which maps the requested URL to the right scraper and then as they all extende a base class allows for the gathering of the data and returns an object. Implement the code as you wish, this is merely a quick demo.

### Issues

If there are any issues with data being scraped or requests feel free to open an issue or a pull request. If anyone has any ideas of how to improve the scraper, more than happy to listen :)
