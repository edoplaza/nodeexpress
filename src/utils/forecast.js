const request = require('request')

const forecast = (lat, long, callback) => {
  const weatherstacktoken = '8d3f5e2a64ff1858cd4fb1950c0fafb7';
  const urlweatherstack = `http://api.weatherstack.com/current?access_key=${weatherstacktoken}&query=${lat},${long}`;
  request({url: urlweatherstack, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined)
      console.log(error)
    } else if (response.body.error) {
      console.log('unable to find location', undefined)
      console.log(response.body.error)
    } else {
      callback(undefined, `The temperature is ${response.body.current.temperature} and it feels like ${response.body.current.feelslike}`)
    }
  })
}

module.exports = forecast