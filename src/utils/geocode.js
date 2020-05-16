const request = require('postman-request')


const geoCode = (address, callback) => {
    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaHJ1c3RhZ2kiLCJhIjoiY2thMjBqNG55MDcyeDNncGp5NDU4MjU2NiJ9.TMU2gCM7lIArVuuz5G_FxQ'
    // console.log(urlMap)
    request({url: urlMap, json: true},(error, response) => {
        if(error){
            callback({code: 100, message: "Low Level Error"}, undefined)
        } else {
            if(response.body.features.length === 0) {
                callback({code: 101, message: "No City Found"}, undefined)
            }else{
                // console.log('Longitude ' + response.body.features[0].center[0] + '. Latitude ' + response.body.features[0].center[1])
                const longitude = response.body.features[0].center[0]
                const latitude = response.body.features[0].center[1]
                callback(undefined,{
                    longitude
                    ,latitude
                    ,location: response.body.features[0].place_name
                })
                // console.log(response.body)
            }
        }
    } )

}

module.exports=geoCode
