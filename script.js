let serchButton = document.querySelector("button")
let box = document.querySelector('.container')
let disappear = document.querySelector('.disappear')
let display = document.querySelector(".weather")
let displaytwo = document.querySelector(".weather-c")
let mmhum = document.querySelector(".mm-hum")
let max = document.getElementById("max")
let hum = document.getElementById("hum")
let min = document.getElementById("min")


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
            displaytwo.style.display = 'none'
            mmhum.style.display = 'none'
            return
        }
        if(data.cod != "404"){
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

function clear(){
    display.innerText = ""
    min.innerText = ""
    hum.innerText = ""
    max.innerText = ""
}