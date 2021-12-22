console.log("Premium content")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''
messageFour.textContent = ''
messageFive.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else {
                messageOne.textContent = "Location Found: " + data.location
                messageTwo.textContent = "Current Weather: " + data.forecast
                messageThree.textContent = "Temperature: " + data.actualTemp
                messageFour.textContent = "Feels Like: " + data.feelsTemp
                messageFive.textContent = "UV Index: " + data.uv
            }        
        })
    })
})