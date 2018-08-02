// Acordeón
$('.ui.accordion')
  .accordion();

const restaurantTable = document.getElementById('restaurant-table');
const searchByName = document.getElementById('search-restaurant');
const amazonRest = document.getElementById('amazon-restaurants'); 
const tableAmazon = document.getElementById('amazon-table');

const restaurantJson = () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      listRestaurant(xhrRestaurant);
    }
  }
  xhr.send();
}

const listRestaurant = (xhrRestaurant) => {
  restaurantTable.innerHTML = ``
  for (const rest of xhrRestaurant) {
    restaurantTable.innerHTML += `
      <tr class="collapsing">
        <th>${rest.restaurant}</th>
        <th>${rest.type}</th>
      </tr>
  `
  };
}

const sortRestaurant = (restaurantSurco) => {
  let dataRestaurant;
  dataRestaurant = restaurantSurco.sort((objt1, objt2) => {
    if (objt1.restaurant > objt2.restaurant) {
      return 1
    } else if (objt1.restaurant < objt2.restaurant) {
      return -1
    }
    return 0
  });
  listRestaurant(dataRestaurant);
  return dataRestaurant
}

searchByName.addEventListener('keyup', () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      searchRestaurant(xhrRestaurant);
    }
  }
  xhr.send();

  let restaurantSearch = searchByName.value;
  
  const searchRestaurant = (xhrRestaurant) => {
    let userFilter = [];
    for (xhrRestaurants of xhrRestaurant)
      if (xhrRestaurants.restaurant.includes(restaurantSearch.toUpperCase())) {
        userFilter.push(xhrRestaurants);
      }
    sortRestaurant(userFilter);
    return userFilter;
  };

});

const filterRest = (type) =>{
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      filterByType(xhrRestaurant);
    }
  }
  xhr.send();

  const filterByType = (xhrRestaurant) => {
      let restFilter = [];
      for (xhrRestaurants of xhrRestaurant)
        if (xhrRestaurants.type.includes(type)) {
          restFilter.push(xhrRestaurants);
        }
      for (rest of restFilter) {
        tableAmazon.innerHTML = `
        <tr class="collapsing">
          <th>${rest.restaurant}</th>
          <th>${rest.type}</th>
        </tr>
    `
      }
      ;
  console.log(restFilter);
      return restFilter;
  }
}


amazonRest.addEventListener('click', () => {
  const type = 'Amazónica'
  filterRest(type);
})





//Orden A-Z
window.onload = () => {
  restaurantJson();
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      sortRestaurant(xhrRestaurant);
    }
  }
  xhr.send();
}