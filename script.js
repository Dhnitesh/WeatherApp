const currentDate = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = days[currentDate.getDay()];
const date = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
const currentTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
const amOrPm = currentTime.slice(-2);


document.getElementById('today').innerText = `${day}, ${date} ${currentTime}`;

const API_KEY = 'a9c001c6a7b8dc2d8044a547c5fac590';
const search = document.getElementById('search');
const cityName = document.getElementById('city_name');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');

const weatherIcon = document.getElementById('weatherIcon');



search.addEventListener('click', () => {
  const city = document.querySelector('input').value;
  makeRequest(city)
});
async function makeRequest(city){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    city_name.innerText = city
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C / ${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F`
    var icon_code = data.weather[0].icon
    var icon_url = ` https://openweathermap.org/img/wn/${icon_code}@2x.png`
    weatherIcon.src = icon_url;

    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`; 
    pressure.innerText = `${data.main.pressure}`; 
  }
  catch (error){
    console.log(error)
  }
}
makeRequest('Montgomery');