const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib2xvZnNwIiwiYSI6ImNqeGl2aWQzNjF1bDMzeW1qM3ZxZW4yc2kifQ.MbaeCBX2CzV5AwWT9mWx1Q&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const reverseGeocode = (long, lat, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + long + "," + lat + '.json?access_token=pk.eyJ1Ijoib2xvZnNwIiwiYSI6ImNqeGl2aWQzNjF1bDMzeW1qM3ZxZW4yc2kifQ.MbaeCBX2CzV5AwWT9mWx1Q&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode, 
    reverseGeocode
}