const request = require('postman-request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f148d93df7e5c90d1b18bdf6959f58ee&query=' + latitude + ',' + longitude + '&units=f'
    // console.log(url)
    request({url: url, json: true},(error, response) => {
            // console.log(error)
            if(error){
                callback({code: 100, message: "Low Level Error"}, undefined)
            }else if(response.body.error){
                callback({code: response.body.error.code, message: response.body.error.type}, undefined)
            }else{
                callback(undefined,{
                    temprature: response.body.current.temperature
                    ,feelslike: response.body.current.feelslike
                })
            }
            // console.log(response.body)
    })
}

module.exports = forecast