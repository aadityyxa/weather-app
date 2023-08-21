import './style.css';

const form = document.querySelector('form');
const inputField = document.querySelector('input');
const myAPIKey = '30356c336ec44fd79a9144540232108';

inputField.addEventListener('input', () => {
    if (inputField.validity.patternMismatch) {
        console.log('true');
    inputField.setCustomValidity('Location should be only text.');
    } else {
        inputField.setCustomValidity('');
    }
});

async function fetchData() {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myAPIKey}&q=${inputField.value}&days=1&aqi=no&alerts=yes`);
    const weatherData = await response.json();

    console.log(weatherData);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchData();
});
