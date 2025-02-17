const countriesContainer = document.querySelector(".countries-container");
const themeSwitch = document.getElementById("theme-switch");
const searchInput = document.getElementById("search");
let allCountries;
const body = document.body;

function renderCountry(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryDiv = document.createElement("a");
    countryDiv.href = `country.html?name=${country.name.common}`;
    countryDiv.classList.add("country-card");
    countryDiv.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} flag">
          <div class="card-text">
              <h3>${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-BD"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital}</p>
          </div>
          `;
    countriesContainer.appendChild(countryDiv);
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((countries) => {
    renderCountry(countries);
    allCountries = countries;
  });

document.getElementById("filter").addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderCountry);
});

searchInput.addEventListener("input", (e) => {
  const afterSearch = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountry(afterSearch);
});

const savedMode = localStorage.getItem("dark-mode"); // Use a different variable name here
if (savedMode === "active") {
  body.classList.add("dark-mode");
}

themeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    localStorage.removeItem("dark-mode");
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "active");
  }
});

