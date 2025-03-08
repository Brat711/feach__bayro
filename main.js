const inp = document.querySelector(".inp");
const ota = document.querySelector(".wraper");
const dark = document.querySelector(".blac__mod");
const wayt = document.querySelector(".darc__mod");
const body = document.body;
let allCountries = [];

// Dark mode-ni saqlash uchun localStorage ishlatish
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

// Dark mode tugmalari
dark.addEventListener("click", () => {
  body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled"); // Saqlash
});

wayt.addEventListener("click", () => {
  body.classList.remove("dark-mode");
  localStorage.removeItem("darkMode"); // O‘chirish
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
  // innerHTML orqali butun tarkibni yaratish (tezroq ishlaydi)
  ota.innerHTML = countries
    .map((country) => `
      <li class="country-item">
        <img class="bayro__img" src="${country.flags.png}">
        <h1 class="bayro__text">${country.name.common}</h1>
      </li>
    `)
    .join("");
}

// Qidiruv funksiyasi
inp.addEventListener("input", () => {
  const val = inp.value.toLowerCase();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(val)
  );
  displayCountries(filteredCountries);
});

rendFlag();
