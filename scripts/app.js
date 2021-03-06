const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

console.log(forecast);

const updateUI = (data) => {
    const {cityDetails, weatherDetails} = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weatherDetails.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    let timeSrc = 'img/night.svg';
    if (weatherDetails.IsDayTime) {
        timeSrc = 'img/day.svg';
    }
    time.setAttribute('src', timeSrc);

    icon.setAttribute('src', `img/${weatherDetails.WeatherIcon}.svg`)

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCityDetails(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCityDetails(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
