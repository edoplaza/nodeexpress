const request = require('request')
const forecast = require('./forecast')

const geocode = (address, callback) => {
  const city = address;
  const mapboxtoken = 'pk.eyJ1IjoiZWRvcGxhemEiLCJhIjoiY2tpZ2J3b2VkMDFpeTJ3bmxsYmsxMDZuOSJ9.rxOgtOuYZilDnLObe9yCMQ'
  const weatherstacktoken = '8d3f5e2a64ff1858cd4fb1950c0fafb7'
  const urlmapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxtoken}`;

  request({url: urlmapbox, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined)
      console.log(error)
    } else if (response.body.features.length === 0){
      callback('Unable to find location', undefined)
      console.log('Unable to find location')
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1], 
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
    // try {
    //   const { center } = response.body.features[0]
    //   const lat = center[1] 
    //   const long = center[0]
    //   const urlweatherstack = `http://api.weatherstack.com/current?access_key=${weatherstacktoken}&query=${lat},${long}`;
    //   forecast.forecast(urlweatherstack)
    // } catch(error) {
    //   console.log(error)
    // }
  })
}

module.exports = geocode;