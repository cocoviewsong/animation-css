const id = '9505fd1df737e20152fbd78cdb289b6a';
let url =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
const city = document.querySelector('.name');
const form = document.querySelector('form');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const valueSearch = document.querySelector('#name');
const clouds = document.querySelector('#clouds');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (valueSearch.value !== '') {
    searchWeather();
  }
});

const searchWeather = () => {
  fetch(url + '&q=' + valueSearch.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === 200) {
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector(
          'img'
        ).src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector(
          'img'
        ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('span').innerText = data.main.temp;
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
      } else {
        main.classList.add('error');
        setTimeout(() => {
          main.classList.remove('error');
        }, 1000);
      }
      valueSearch.value = '';
    });
};

const initApp = () => {
  valueSearch.value = 'Washington';
  searchWeather();
};
initApp();
