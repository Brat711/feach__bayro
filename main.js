const inp = document.querySelector(".inp");
const ota = document.querySelector(".wraper");
const dark = document.querySelector(".blac__mod");
const wayt = document.querySelector(".darc__mod");
const body = document.body;
let allCountries = [];

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

dark.addEventListener("click", () => {
  body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
});

wayt.addEventListener("click", () => {
  body.classList.remove("dark-mode");
  localStorage.removeItem("darkMode"); 
});

function rendFlag() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      allCountries = data; 
      displayCountries(allCountries);
    })
    .catch((error) => console.error("Xatolik yuz berdi:", error));
}

function displayCountries(countries) {
  ota.innerHTML = countries
    .map((country) => `
      <li class="country-item">
        <img class="bayro__img" src="${country.flags.png}">
        <h1 class="bayro__text">${country.name.common}</h1>
      </li>
    `)
    .join("");
}

inp.addEventListener("input", () => {
  const val = inp.value.toLowerCase();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(val)
  );
  displayCountries(filteredCountries);
});

rendFlag();
