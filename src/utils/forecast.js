const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9db721c7e298254f317560f5ec7f8506/' + latitude + ',' + longitude + "?units=si"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. Daily high temperature is ' + body.daily.data[0].temperatureHigh + ', and daily low is ' + body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast