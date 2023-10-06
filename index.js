const express = require('express')
const app = express()
const fetch = require('node-fetch')
const path = require('path')

app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const key = '77fefff6fbdbd270c709438fbdfa6295'
let city = 'Tartu'

app.get('/', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('default.ejs', {
            description : description,
            city : city,
            temp : temp
        })
    })
    
})

app.post('/', (req,res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&appid=${key}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('default.ejs', {
            description : description,
            city : city,
            temp : temp
        })
    })
})

app.listen(3000)