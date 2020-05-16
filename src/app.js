const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const hbsViewsPath = path.join(__dirname, "../templates/views")
const hbsPartialsPath = path.join(__dirname, "../templates/partials")

const app = express()

app.set("view engine", 'hbs')
app.set('views',hbsViewsPath)

hbs.registerPartials(hbsPartialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Yash Rustagi"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: "About",
        aboutText: "This is the Weather App",
        name: "Yash Rustagi"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help Page',
        helpText: "This is a dynamic help text",
        name: "Yash Rustagi"
    })
})


app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            errorText: 'Address Is a required Value'
        })
    }
    getWeather(req.query.address.toString(), (error, {location,temprature, feelslike}={}) =>{
        if(error) {
            return res.send({error})
        }
        res.send({location,temprature, feelslike})
    })
})

const getWeather = (passedlocation, callback) => {
    geoCode(passedlocation, (error, {longitude, latitude, location} = {}) => {
        if(error){
            console.log(error)
            return callback (error, undefined)
        }
        forecast(longitude, latitude, (error, {temprature, feelslike}={}) => {
            if(error){
                console.log(error)
                return callback (error, undefined)
            }
            callback (undefined, {
                location: location,
                temprature: temprature,
                feelslike: feelslike
            })
        })
    })
}


app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            errorText: 'Your Must prodvide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })  
})

app.get('/help/*', (req, res) =>{
    res.render('error404',{
        errorText: 'Help Page looking for: not found',
        name: "Yash Rustagi"
    })
})

app.get('*', (req, res) =>{
    res.render('error404',{
        errorText: 'Page Not Found',
        name: "Yash Rustagi"
    })
})

const getAbout = () => {
    return '<h>This is a Weather App</h>'
}

app.listen(4000, ()=>{
    console.log('Server has started')
})