const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWp1ZGdlIiwiYSI6ImNreDh3aTUyNDB0a3Mybm1uamM3azg0bDAifQ.MsMppFXFNa96kUqirRybkw`
    request({url, json: true}, (error, response, {features}) => {
    if(error){
        callback('Unable to connect to location services!', undefined)
    }else if(features.length === 0){
        callback('Could not find location ' + address, undefined)
    }    
    else{
        callback(undefined, {
            longitude: features[0].center[0],
            latitude: features[0].center[1],
            location: features[0].place_name
        })
    }
})
}

module.exports = geocode