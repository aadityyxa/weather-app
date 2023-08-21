import './style.css';

const inputField = document.querySelector('input');

inputField.addEventListener('input', () => {
    if (inputField.validity.patternMismatch) {
        console.log('true');
    inputField.setCustomValidity('Location should be only text.');
    } else {
        inputField.setCustomValidity('');
    }
});
