const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "home page"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "about"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "help"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send("you must provide an address")
  } else {
    geocode(req.query.address, (error, geocodeData) => {
      if (error) {
        return console.log(error)
      }
      forecast(geocodeData.latitude, geocodeData.longitude,  (error, forecastData) => {
        if (error) {
          console.log(error)
        }
        res.send({
          forecast: forecastData,
          address: req.query.address,
          location: geocodeData.location
        })
      })
    })
  }
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "Article not found"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "Page not found"
  })
})

app.listen(3000, () => {
  console.log('running on port 3000');
})