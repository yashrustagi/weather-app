console.log("Loaded a JS file. ")

// fetch('http://puzzle.mead.io/puzzle').then((response => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// }))



const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const locationResult = document.querySelector('#locationName')
const feelslikeResult = document.querySelector('#feelslike')
const tempratureResult = document.querySelector('#temprature')
const wind_speedResult = document.querySelector('#wind_speed')
const cloudcoverResult = document.querySelector('#cloudcover')

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()
    locationResult.textContent = 'Loading'

    const inputLocation = searchLocation.value
    const url = '/weather/?address=' + inputLocation

    fetch(url).then((response => {
        response.json().then((data) =>{
            debugger
            if(data.error){
                console.log(data.error)
                locationResult.textContent = 'Error! Code: ' + data.error.code + ' Details: ' + data.error.message
            }else{
                locationResult.textContent = data.location
                feelslikeResult.textContent = data.feelslike
                tempratureResult.textContent = data.temprature
                wind_speedResult.textContent = data.wind_speed
                cloudcoverResult.textContent = data.cloudcover
            }
            // console.log(data)
        })
    }))

} )