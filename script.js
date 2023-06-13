let serchButton = document.querySelector("button")
let box = document.querySelector('.container')
let disappear = document.querySelector('.disappear')


serchButton.addEventListener('click', () =>{
    let APIK = "6aedb38ec1a7ba4eecfcaa6a13244fa2"
    let cityname = document.getElementById('text-box').value

    if (cityname === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIK}`).then(response => response.json()).then(data =>{
        if(data.cod === "404"){
            box.style.height = '400px'
            disappear.style.visibility = 'visible'
            return
        }

        disappear.style.visibility = 'hidden';
        box.style.height = '60px';
    })
})
