const form = document.getElementById('form');
const input = document.querySelector('#form input');
const weatherDiv = document.getElementById('weather');
console.log(form, input, weatherDiv);

form.addEventListener('submit', e => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  let apikey = 'c85fdb7a128fd14da9130ad65c2e554b';
  let inputValue = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  const res = await axios.get(url);
  const data = res.data;
  weatherDiv.innerHTML = `
    <h1>${data.name}</h1>
    <h3>${data.weather[0].description}</h3>
    <p>${Math.round(data.main.temp)} C</p>
    `;
  console.log(data);
};
