const request = require('request')

const forecast = (latitud, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0655fc9533798ad986cbb2e4f9e81623&query=' + 
    latitud + ',' + longitud //+ '&units=f'

    request({ url , json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + 
            ' degrees out. It feels like ' + body.current.feelslike + ' degrres out. The humidity is ' + body.current.humidity + '%. The uv_index is: ' 
            + body.current.uv_index + ' out of 10' )
        }
    })
}

module.exports = forecast