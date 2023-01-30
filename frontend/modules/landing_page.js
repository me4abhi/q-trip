import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("cities", cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const citiesData = await (
      await fetch(config.backendEndpoint + "/cities")
    ).json();
    console.log("citiesData", citiesData);
    return citiesData;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.getElementById("data");
  const cityCard = `<div class="col-sm-12 col-md-6 col-lg-3 mt-4">
  <a id="${id}" href="./pages/adventures/?city=${id}">
      <div class="tile">
          <div class="tile-text">
              <h3>${city}</h3>
              <h6>${description}</h6>
          </div>
          <img src=${image} alt=${city}>
      </div>
    </a>
  </div>`;

  data.innerHTML += cityCard;
  return cityCard;
}

export { init, fetchCities, addCityToDOM };
