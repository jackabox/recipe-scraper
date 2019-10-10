const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const importer = require('./index.js')

dotenv.config({ path: './.env' })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Set up the test route to quickly check that stuff is working.
app.get('/v1/scraper', async (req, res) => {
  const { url } = req.query
  const data = await importer(url)
  return res.json(data)
})

const port = process.env.PORT || 8000

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)
