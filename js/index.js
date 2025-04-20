// var APIkey ='8f6dc3569539486995e144316251904';
// var BaseURL= "http://api.weatherapi.com/v1"


const form = document.querySelector('form');
const input = document.querySelector('#city');
const result = document.querySelector('#result');

// WeatherAPI Key
const apiKey = '8f6dc3569539486995e144316251904';


 async function getdata (city='cairo') {
  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`)
  .then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(function(data) {
    console.log(data); 
    console.log(data.current.condition); 
    displayWeather(data) 
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
}




function getDayName(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}

// Display current weather + next 2 days
function displayWeather(data) {
  const { location, current, forecast } = data;
  const forecastDays = forecast.forecastday;

  let html = `
  <div class="forecast col-lg-4 col-md-12  ">
    <div class="forecast-header">
              <h6 class="day">${getDayName(location.localtime)}</h6>
              <h6 class="date">${formatDate(location.localtime)}</h6>
    </div>
    <div class="forecast-body">
    <h2> ${location.name} , ${location.country}</h2>
    <p class="temp">${current.temp_c}°C</p>
        <p> Max: ${forecastDays[0].day.maxtemp_c}°C | Min: ${forecastDays[0].day.mintemp_c}°C</p>

    <img src="${current.condition.icon}" alt="" />
    <p> ${current.condition.text}</p>
    </div>
      <div class="forecast-footer">
      <div><img src="image/icon-umberella.png" alt="">${current.humidity}%</div>
    <div><img src="image/icon-wind.png" alt=""> ${current.wind_kph} km/h</div>
    <div><img src="image/icon-compass.png" alt=""> ${current.wind_dir} km/h</div>
      </div>
     </div>
  `;

  for (let i = 1; i <= 2; i++) {
    const day = forecastDays[i];
    console.log(day);
    html += `
     <div class="forecast col-lg-4 col-md-12  ">
    <div class="forecast-header">
        <h6 class="day">${getDayName(day.date)}</h6>
        <h6 class="date">${formatDate(day.date)}</h6>
    </div>
      
    <div class="forecast-body">
    <h2> ${location.name} , ${location.country} </h2>
     <p class="temp">${day.day.avgtemp_c}°C</p>
     <p> Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
      <img src="${day.day.condition.icon}" alt="" />
     <p> ${day.day.condition.text}</p>
      </div>
      
       <div class="forecast-footer">
      <div><img src="image/icon-umberella.png" alt="">${day.day.avghumidity}%</div>
    <div><img src="image/icon-wind.png" alt=""> ${day.day.avgvis_km} km/h</div>
      </div>
      
      </div>
    `;
    
  }

  result.innerHTML = html;
}

getdata ()

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city !== '') {
    getdata(city);
  }
});






