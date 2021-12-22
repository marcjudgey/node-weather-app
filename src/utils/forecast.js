const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=804fe3706ccb8ca39274c5d6c766ad56&%20query=${lat},${long}&unit=c`

    request({url, json: true}, (error, response, {current, error: bodyError}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(bodyError){
            callback('Unable to find location', undefined)
        }else{
            callback( undefined, {
                weather: current.weather_descriptions[0],
                current: current.temperature,
                feelslike: current.feelslike
            })
        }   
    })
}


module.exports = forecast
