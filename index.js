//Setup document elements
const icon = document.querySelector('#icon')
const statusP = document.querySelector('p.status')
const locationP = document.querySelector('p.location')
const tempP = document.querySelector('p.temp')
const toggle = document.querySelector('#CFToggle')
const spinner = document.querySelector('#loader')

//Setup temp conversion variables
let unit = 'f';
let temperatureC = '';
let temperatureF = '';

function getWeather(position) {
  //Get weather from freeCodeCamp.org weather api
  fetch(`https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
    .then(response => response.json()).then(json => {
      //Set data on elements
      statusP.textContent = json.weather[0].description.substr(0, 1).toUpperCase() + json.weather[0].description.substr(1)
      locationP.textContent = json.name
      temperatureC = Math.floor(json.main.temp) + '°'
      temperatureF = Math.floor((json.main.temp * 9 / 5) + 32) + '°'
      tempP.textContent = (unit == 'f') ? temperatureF : temperatureC

      //Set weather icon based on api weather category
      let FAIcon = '';
      switch (json.weather[0].main) {
        case 'Rain':
          FAIcon = 'cloud-showers-heavy'
          break;
        case 'Drizzle':
          FAIcon = 'cloud-sun-rain'
          break;
        case 'Clouds':
          FAIcon = 'cloud'
          break;
        case 'Snow':
          FAIcon = 'snowflake'
          break;
        case 'Clear':
          FAIcon = 'sun'
          break;
        case 'Thunderstorm':
          FAIcon = 'bolt'
          break;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Ash':
        case 'Squall':
        case 'Tornado':
          FAIcon = 'smog'
          break;
      }
      icon.className = `fas fa-${FAIcon} fa-8x`
    })
}

//Toggle temperature units between C and F when toggle is pressed.
function toggleCF() {
  (toggle.checked) ? unit = 'c' : unit = 'f'
  tempP.textContent = (unit == 'f') ? temperatureF : temperatureC
}

navigator.geolocation.getCurrentPosition((position) => getWeather(position), (err) => {
  icon.className = 'fas fa-exclamation-triangle fa-8x'
  icon.style = ('color: darkred')
  console.error(err)
  alert('ERROR! Please ensure your browser supports geolocation access and that it is enabled for this site.')
})