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
            let uvrating = ''
            if(current.uv_index < 3){
                uvrating = current.uv_index + ' - Low'  
           }
            else if(current.uv_index < 7){
                 uvrating = current.uv_index + ' - Moderate'  
            }
            else if(current.uv_index < 9){
                uvrating = current.uv_index + ' - High'  
           }
           else if(current.uv_index < 12){
            uvrating = current.uv_index + ' - Very High'  
       } else{
        uvrating = current.uv_index + ' - Extreme'
       }

            callback( undefined, {
                weather: current.weather_descriptions,
                current: current.temperature,
                feelslike: current.feelslike,
                uv: uvrating
            })
        }   
    })
}


module.exports = forecast
