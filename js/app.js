const innerColumn = document.querySelectorAll(".innerColumn")
const firstColumn = innerColumn[0]
const secondColumn = innerColumn[1]
const currentTime = document.querySelector('.currentTime')
const dateAndTime = document.querySelector('.dateAndTime')
const button = document.querySelector("button")
currentTime.innerHTML = dateFunc()
dateAndTime.innerHTML = `${new Date().toLocaleString(['en-us'], { month: 'short' })} ${new Date().getDay()} ${dateFunc()}`
setInterval(()=>{
    currentTime.innerHTML = dateFunc()
    console.log(currentTime.innerHTML)
},10000)
button.addEventListener("click",()=>document.location.reload())
const url = 'http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19'
function dateFunc(){
    const date = new Date()
    let dateHour = date.getHours()
    let dateMin = date.getMinutes()
    if(dateMin<10){
        dateMin = `0${dateMin}`
    }
    const amOrPm = (()=>{
        if(dateHour>=12){
            dateHour-=12
            return "PM"
        }else{
            return "AM"
        }
    })()
    return `${dateHour}:${dateMin} ${amOrPm}`
}
fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        firstColumn.insertAdjacentHTML("beforeend",`
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Wind: ${data.wind.speed} km/h SSE</p>
            <p>Deg: ${data.wind.deg}°</p>
        `)
        secondColumn.insertAdjacentHTML("afterbegin",`
            <img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>
            <p>${data.main.temp}°C</p>
            <p>Feels like: ${data.main.feels_like}°C</p>
            <p>${data.weather[0].description}</p>
        `)

    })