let serchButton = document.querySelector(".search")
let mainweathericon = document.getElementById('mainweather')
let geoButton = document.querySelector(".geolocation")
let box = document.querySelector('.container')
let disappear = document.querySelector('.disappear')
let display = document.querySelector(".weather")
let displaytwo = document.querySelector(".weather-c")
let mmhum = document.querySelector(".mm-hum")
let max = document.getElementById("max")
let hum = document.getElementById("hum")
let min = document.getElementById("min")
let textbox = document.getElementById('text-box')

//https://openweathermap.org/weather-conditions

const weatherstatus = {
    ebdb : [200, 299], //tunder
    f61e : [300, 504], //light rain
    f61d : [511, 511], //frozenrain
    f61f : [520, 531], //heavy rain
    eb3b : [600, 699], //snow
    f076 : [700, 799], // thermostat
    e81a : [800, 800], // sunny
    f172 : [801, 801], // sunnywithclouds
    f15b : [802, 804], // clouds
}

geoButton.addEventListener('click', () =>{
    navigator.geolocation.getCurrentPosition((position) =>{
        let lon = position.coords.longitude
        let lat = position.coords.latitude
        let APIK = "6aedb38ec1a7ba4eecfcaa6a13244fa2"
        let cityname = ""

        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${APIK}`).then(response => response.json()).then(data =>{
            if(data.cod != "404"){
                let objdata = data[0]
                cityname = objdata.name
                document.getElementById('text-box').value = cityname
            }
        })
    }) 
})

textbox.addEventListener('keyup', (buttonclick) =>{
    if(buttonclick.keyCode === 13){
        serchButton.click()
    }
})

serchButton.addEventListener('click', () =>{
    let APIK = "6aedb38ec1a7ba4eecfcaa6a13244fa2"
    let cityname = document.getElementById('text-box').value

    if (cityname === ""){
        clear()
        disappear.style.visibility = 'hidden';
        displaytwo.style.display = 'none'
        mmhum.style.display = 'none'
        box.style.height = '60px';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIK}&units=metric`).then(response => response.json()).then(data =>{
        if(data.cod === "404"){
            clear()
            box.style.height = '400px'
            disappear.style.visibility = 'visible'
            disappear.style.display = 'contents'
            displaytwo.style.display = 'none'
            mmhum.style.display = 'none'
            return
        }
        if(data.cod != "404"){
            weatherID = data.weather[0].id  
            mainweathericon.innerHTML = '&#x' + getweathercode(weatherID) + ';'
            disappear.style.visibility = 'hidden'
            displaytwo.style.display = 'flex'
            mmhum.style.display = 'flex'
            box.style.height = '400px'
            display.innerText = data.main.temp.toFixed(0) + " °C"
            max.innerText = data.main.temp_max.toFixed(0) + " °C"
            hum.innerText = data.main.humidity + " %"
            min.innerText = data.main.temp_min.toFixed(0) + " °C"
            return
        }
    })
})

function clear() {
    display.innerText = ""
    min.innerText = ""
    hum.innerText = ""
    max.innerText = ""
}

function getweathercode(weatherID) {
    let iconCode = ''
    for (const key in weatherstatus ) {
        let min = weatherstatus[key][0]
        let max = weatherstatus[key][1]
        if (weatherID >= min && weatherID <= max){
            iconCode = key
            break;
        }
    }
    return iconCode;
}