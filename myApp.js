const express = require('express')
const app = express()
const dns = require('dns')
const bodyParser = require('body-parser')

const BAD_REQUEST = 400

const store = []
let shortened = 0

function urlShortener(url, res) {
  dns.lookup(url, err => {
    if (err) {
      res.status(BAD_REQUEST).json({ error: 'Invalid URL' })
      return
    }
    const entry = store.find(entry => entry.original_url === url)
    if (!Boolean(entry)) {
      shortened += 1
      store.push({ original_url: url, short_url: shortened })
      res.json(store[shortened - 1])
    } else {
      res.json(entry)
    }
  })
}

function lookupURL(shortened, res) {
  if (Boolean(store[shortened - 1])) {
    const fullURL = 'https://' + store[shortened - 1].original_url
    res.status(301).redirect(fullURL)
  } else {
    res.status(BAD_REQUEST).json({ error: 'Invalid Short URL' })
  }
}

app.use(bodyParser.json({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.post('/api/shorturl/new', (req, res) => {
  urlShortener(req.body.url, res)
})

app.get('/api/shorturl/:short_url', (req, res) => {
  lookupURL(req.params.short_url, res)
})


//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
