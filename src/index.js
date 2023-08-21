import './style.css';

const form = document.querySelector('form');
const inputField = document.querySelector('input');
const myAPIKey = '30356c336ec44fd79a9144540232108';
const weatherCardHeading = document.querySelector('.weather-card-heading');
const weatherConditionText = document.querySelector('.weather-condition-text');
const errorText = document.querySelector('.error-text');
// const weatherDescription = document.querySelector('weather-description');

inputField.addEventListener('input', () => {
    if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity('Location should be only text.');
    } else {
        inputField.setCustomValidity('');
    }
});

async function fetchData() {
    try {
        errorText.textContent = '';
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myAPIKey}&q=${inputField.value}&days=1&aqi=no&alerts=yes`);
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('No matching location found.');
            }
        }
        const weatherData = await response.json();
        weatherCardHeading.textContent = `weather in ${inputField.value}`;
        weatherConditionText.textContent = weatherData.forecast.forecastday[0].day.condition.text;
    // console.log(weatherData.forecast.forecastday[0].day.condition.text);
    } catch (err) {
        errorText.textContent = err;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchData();
});
