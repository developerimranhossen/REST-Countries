const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((countries) => {
    countries.forEach((country) => {
      const countryDiv = document.createElement("a");
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
  });
