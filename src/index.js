import './style.css';

const form = document.querySelector('form');
const inputField = document.querySelector('input');
const myAPIKey = '30356c336ec44fd79a9144540232108';
const weatherCard = document.querySelector('.card');
const weatherCardHeading = document.querySelector('.weather-card-heading');
const weatherConditionText = document.querySelector('.weather-condition-text');
const errorText = document.querySelector('.error-text');
const content = document.querySelector('.content');
const pressure = document.querySelector('#pressure');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const temp = document.querySelector('#avgtemp');
const cor = document.querySelector('#cor');

weatherCard.style.display = 'none';

inputField.addEventListener('input', () => {
    if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity('Location should be only text.');
    } else {
        inputField.setCustomValidity('');
    }
});

async function fetchData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myAPIKey}&q=${inputField.value}&days=1&aqi=no&alerts=yes`);
        const weatherData = await response.json();

        if (weatherData.error) {
            throw new Error(weatherData.error.message);
        }

        return weatherData;
    } catch (err) {
        return err;
    }
}

async function renderBackground(msg) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=OjELug9Pvy6FiAuNEc6VUl9EZFI5ak6I&q=${msg}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);

    const GIFdata = await response.json();
    content.style.backgroundImage = `url(${GIFdata.data[0].images.original.url})`;
}

async function displayData() {
    const data = await fetchData();

    if (data.location) {
        errorText.style.display = 'none';
        weatherCard.style.display = 'flex';
        weatherCardHeading.textContent = `weather in ${data.location.name}`;
        weatherConditionText.textContent = data.forecast.forecastday[0].day.condition.text;
        wind.textContent = `${data.current.wind_kph}kph`;
        pressure.textContent = `${data.current.pressure_in}in`;
        humidity.textContent = `${data.current.humidity}%`;
        temp.textContent = `${data.forecast.forecastday[0].day.avgtemp_c}C`;
        wind.textContent = `${data.current.wind_kph}kph`;
        cor.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

        renderBackground(data.forecast.forecastday[0].day.condition.text);
    } else {
        console.log('true');
        weatherCard.style.display = 'none';
        errorText.style.display = 'block';
        errorText.textContent = data;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    displayData();
});
