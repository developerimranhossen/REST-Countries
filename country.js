const countryName = new URLSearchParams(location.search).get("name");
const countriesContainer = document.querySelector(".countries-container");
const countryContainer = document.querySelector(".country-details");
const backBtn = document.querySelector(".back-btn");
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;

backBtn.addEventListener("click", () => {
  history.back();
});

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    const laguages = Object.keys(country.languages)[0];
    const currencies = Object.keys(country.currencies)[0];
    const borderToCountries = country.cca3;
    console.log(borderToCountries);

    countryContainer.innerHTML = `<img src="${country.flags.svg}" alt="flag">
            <div class="">
                <div class="country-info">
                    <div class="country-left-info">
                    <h1>${country.name.common}</h1>
                    <p><b>Native Name: </b>${
                      country.name.nativeName[laguages].common
                    }</p>
                    <p><b>Population: </b>${country.population.toLocaleString(
                      "en-BD"
                    )}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Sub Region: </b>${
                      country.subregion ?? "Unknown"
                    }</p>
                    </div>
                    <div class="country-right-info">
                    <p><b>Capital: </b>${country.capital}</p>
                    <p><b>Top Level Domain: </b>${country.tld}</p>
                    <p><b>Currencies: </b>${
                      country.currencies[currencies].name
                    }</p>
                    <p><b>Languages: </b>${Object.values(country.languages)
                      .slice(0, 3)
                      .join(",")}</p>
                    </div>
                </div>
                <div class="border-countries">
                     <p><b>Border Countries: </b></p>   
                        

                </div>
            </div>
        `;
    country?.borders?.forEach((border) => {
      const borderEl = document.createElement("a");
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then((country) => {
          console.log(country);
          borderEl.href = `country.html?name=${country[0].name.common}?fullText=true`;
          borderEl.innerText = country[0].name.common;
        });

      const borderContainer = document.querySelector(".border-countries");
      borderContainer.appendChild(borderEl);

      console.log(borderEl);
    });
  });

window.addEventListener("load", function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.opacity = "0"; // Start fade out

  loadingOverlay.addEventListener("transitionend", function () {
    document.body.removeChild(loadingOverlay);
  });
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

