const request = require('request')


const geoCode = (adress, callback) => {
    const  url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
    //encodeURLComponent(adress) 
    adress + '.json?access_token=pk.eyJ1IjoiYWxleHBpY3plbmlrIiwiYSI6ImNrczk1amh2ODB3YzEycnJvbmhmcm1tb3oifQ.AfhRCtRishJXOH5jvgT-mg&limit=1'
    request ({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            const latitud = body.features[0].center[1]
            const longitud = body.features[0].center[0]
            const placeName = body.features[0].place_name
            const data = {
                latitud: latitud,
                longitud: longitud,
                placeName: placeName
            }
            callback(undefined, data)
        }
    })
}

module.exports = geoCode