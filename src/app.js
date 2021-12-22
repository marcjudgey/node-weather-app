const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory
app.use(express.static(pubDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marc judge'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Marc Judge'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    } else{
        geocode(req.query.address, (error, {location, longitude, latitude} = {}) => {
            if(error){
                return res.send({error})
            }
        
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                return res.send({
                    forecast: forecastData.weather,
                    location: location,
                    address: req.query.address
                })
            })
        }) 
        
    }
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Marc Judge'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marc Judge',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marc Judge',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})