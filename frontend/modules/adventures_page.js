import config from "../conf/index.js";

//Implementation to extract city from query params
// search = window.location.search
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityUrl = new URLSearchParams(search.slice(1));
  let city = cityUrl.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let adventures = await fetch(
    config.backendEndpoint + "/adventures?city=" + city
  )
    .then((res) => res.json())
    .catch((error) => null);

  return adventures;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let adventureCards = document.getElementById("data");
  let adventureCard = ``;
  adventures.forEach((adventure) => {
    adventureCard = `<a id="${adventure.id}"
    href="./detail/?adventure=${adventure.id}"
    class="activity-card col-6 col-md-6 col-lg-3 mb-4"
  >
    <div class="category-banner">${adventure.category}</div>
    <img src="${adventure.image}" alt="${adventure.name}" />
    <div class="card-body col-sm-12">
      <div class="d-flex justify-content-between">
          <p>${adventure.name}</p>
          <p>${adventure.currency} ${adventure.costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between">
          <p>Duration</p>
          <p>${adventure.duration} hours</p>
      </div>
    </div>
  </a>`;
    adventureCards.innerHTML += adventureCard;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let listFilteredByDuration = list.filter(
    (listItem) => listItem["duration"] >= low && listItem["duration"] <= high
  );

  return listFilteredByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let listFilteredByCategory = list.filter((listItem) =>
    categoryList.includes(listItem["category"])
  );

  return listFilteredByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

// list = adventures list
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // filter by category
  if (filters.category.length !== 0 && filters.duration === "") {
    return filterByCategory(list, filters.category);
  }

  // filter by duration
  let durationValues = filters.duration.split("-");
  let low = durationValues[0];
  let high = durationValues[1];

  if (filters.duration !== "" && filters.category.length === 0) {
    return filterByDuration(list, low, high);
  }

  // filter by both duration and category
  if (filters.duration !== "" && filters.category.length !== 0) {
    let listFilteredByDuration = filterByDuration(list, low, high);
    let listFilteredByCategory = filterByCategory(list, filters.category);

    let listFilteredByBoth = listFilteredByCategory.filter((listItem) =>
      listFilteredByDuration.includes(listItem)
    );

    return listFilteredByBoth;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // localStorage.setItem("category", filters["category"]);
  // localStorage.setItem("duration", filters["duration"]);

  let filtersString = JSON.stringify(filters);
  localStorage.setItem("filters", filtersString);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filtersFromLocal = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filtersFromLocal;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let selectedCategories = filters["category"];
  let categoryPills = document.getElementById("category-list");

  selectedCategories.forEach((category) => {
    let categoryItem = `<div class="category-filter">
      ${category}
    </div>`;
    categoryPills.innerHTML += categoryItem;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
