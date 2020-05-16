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

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()
    locationResult.textContent = 'Loading'

    const inputLocation = searchLocation.value
    const url = 'http://localhost:4000/weather/?address=' + inputLocation

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
            }
            // console.log(data)
        })
    }))

} )