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
