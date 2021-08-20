const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')
const geoCode = require('./utils/geocode.js')


const app = express()
const port = process.env.PORT || 3000

//path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=> {
    res.render('index',{
        title: 'weather app',
        name: 'Alex'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Alex'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message',
        title: 'Help',
        name: 'Alex'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address, (error, {latitud, longitud, placeName} ={} )=>{
        if(error){
            return res.send({error})
        }
        forecast(latitud,longitud, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Alex',
       error: 'Help article not found'
   })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Alex',
        error: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})