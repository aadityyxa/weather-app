import './style.css';

const form = document.querySelector('form');
const inputField = document.querySelector('input');
const myAPIKey = '30356c336ec44fd79a9144540232108';
const weatherCard = document.querySelector('.card');
const weatherCardHeading = document.querySelector('.weather-card-heading');
const weatherConditionText = document.querySelector('.weather-condition-text');
const errorText = document.querySelector('.error-text');
// const weatherDescription = document.querySelector('weather-description');

weatherCard.style.display = 'none';

inputField.addEventListener('input', () => {
    if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity('Location should be only text.');
    } else {
        inputField.setCustomValidity('');
    }
});

function displayData(obj) {
    errorText.style.display = 'none';
    weatherCard.style.display = 'flex';
    weatherCardHeading.textContent = `weather in ${obj.location.name}`;
    weatherConditionText.textContent = obj.forecast.forecastday[0].day.condition.text;
}

async function fetchData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myAPIKey}&q=${inputField.value}&days=1&aqi=no&alerts=yes`);
        const weatherData = await response.json();

        if (weatherData.error) {
            throw new Error(weatherData.error.message);
        }

        displayData(weatherData);
    } catch (err) {
        weatherCard.style.display = 'none';
        errorText.style.display = 'block';
        errorText.textContent = err;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchData();
});
