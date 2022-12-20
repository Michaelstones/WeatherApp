const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const mainEl = document.querySelector(".main");

const apikey = "fdf76fc187cc1a5a6e27ed2e1a4211c9";
const url = (locale) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${apikey}`;

async function getWeather(input) {
  const res = await fetch(url(input), { origin: "cors" });
  const data = await res.json();
  loadWeather(data);
  //   console.log(ktoC(data.main.temp));
  //   console.log(data);
}

// getWeather("london");

function ktoC(k) {
  return (k - 273.15).toFixed(2);
}
function loadWeather(data) {
  const tempe = ktoC(data.main.temp);
  const input = inputEl.value;
  const div = document.createElement("div");
  div.classList.add("weather");

  div.innerHTML = `
        <img src ="http://api.openweathermap.org/img/w/${data.weather[0].icon}.png" 
        alt='${input}'/>
        <h3>${tempe} °C</h3>
        <small>${data.weather[0].main}</small>
     `;
  mainEl.innerHTML = "";
  mainEl.appendChild(div);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = inputEl.value;

  getWeather(input);
  inputEl.value = "";
});
