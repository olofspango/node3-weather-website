const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {geocode,reverseGeocode} = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Olof Spångö'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Olof'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Olof'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address && !(req.query.longitude && req.query.latitude)) {
        return res.send({
            error: 'You must provide an address or long&lat'
        })
    }

    if(req.query.address) {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(({error}))
            }
            res.send({
                forecast: forecastData,
                location,
                address : req.query.address
            })

        })
    })
    } else { // req.query long & lat was provided 
        // Needs refactoring, now duplicate code forecast long & lat twice.
        forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
            if (error) {
                return res.send(({error}))
            }
            reverseGeocode(req.query.longitude, req.query.latitude, (error, location) => {
                res.send({
                    forecast: forecastData,
                    location: location.place_name,
                    address : ""
                })                
            })

        })
    }





    
})

app.get('/products', (req,res) =>  {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Olof S',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Olof S',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})