const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const WeatherData = async function (countryName) {
  const res = await fetch(
    `http://localhost:1234/weather?address=${countryName}`
  );

  const data = await res.json();

  if (data.error) {
    messageOne.textContent = data.error;
    messageTwo.textContent = "";
  } else {
    messageOne.textContent = data.Location;
    messageTwo.textContent = data.forcastdata;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  WeatherData(search.value);
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  search.value = "";
});
