// get value from input
// fetch weather info from API
// Populate the info on Page
const form = document.querySelector(".top-banner .container form");
const input = document.querySelector(".top-banner .container input");
const citiesList = document.querySelector(".cities");
const message = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});

// fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=85e04a82ec711f00f486e363c6934efd')
//   .then(res => res.json() )
//   .then(json => console.log(json));

const getWeatherData = () => {
  const inputVal = input.value;
  console.log(inputVal);

  if (inputVal) {
    message.innerHTML = "";
    input.value = "";

    const cityCardsCollection = document.querySelectorAll(".city"); // Array like collection
    const cityCardsArray = Array.from(cityCardsCollection);

    if (cityCardsArray.length > 0) {
      const filteredCards = cityCardsArray.filter(
        (card) => card.querySelector(".city-name span").innerText == inputVal
      );
      console.log(filteredCards);
      if (filteredCards.length > 0) {
        message.innerHTML = "You've got that city.";
        return;
      }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=85e04a82ec711f00f486e363c6934efd&units=metric`;

    axios(url)
      .then((res) => {
        const cityCard = document.createElement("li");
        cityCard.classList.add("city");

        cityCard.innerHTML = `
          <h2 class="city-name">
            <span>${res.data.name}</span>
            <sup>${res.data.sys.country}</sup>
          </h2>
          <div class="city-temp">
            ${Math.round(res.data.main.temp)}
            <sup>°C</sup>
          </div>
          <figure>
            <img src="http://openweathermap.org/img/wn/${
              res.data.weather[0].icon
            }@2x.png" alt="${res.data.weather[0].description}">
            <figcaption>${res.data.weather[0].main}</figcaption>
          </figure>
        `;
        citiesList.appendChild(cityCard);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    message.innerHTML = "Enter a city name.";
  }
};
