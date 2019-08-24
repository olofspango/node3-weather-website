

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

const $sendLocationButton = document.querySelector('#send-location')
const $searchLocationButton = document.querySelector('#search-button')


$sendLocationButton.addEventListener('click', () => {
    console.log("Clicked!")
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    } 
    console.log("Before location")    
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("In location")
        fetch(`/weather?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error
                    console.log("There was an error." + data.error)
                } else {
                    console.log(data.forecast)
                    console.log(data.location)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
                
    }, (e) => {
        console.log(e)
    })
})

$searchLocationButton.addEventListener('click', (e) => {
    console.log("In the buttonListener. " + e)
    const location = search.value    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                console.log('There was an error. ' + data.error)
            } else {
                console.log(data.forecast)
                console.log(data.location)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
})