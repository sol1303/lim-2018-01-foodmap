$(function () {
  setTimeout(function () {
    $('#splash').fadeOut(500);
  }, 2000);
});

// Acordeón
$('.ui.accordion')
  .accordion();

const restaurantTable = document.getElementById('restaurant-table');
const searchByName = document.getElementById('search-restaurant');
const amazonRest = document.getElementById('amazon-restaurants');
const tableAmazon = document.getElementById('amazon-table');
const americanRest = document.getElementById('american-restaurants');
const tableAmerican = document.getElementById('american-table');
const meatAndGrillRest = document.getElementById('meatandgrill-restaurants');
const tableMeatAndGrill = document.getElementById('meatandgrill-table');
const chifaRest = document.getElementById('chifa-restaurants');
const tableChifa = document.getElementById('table-chifa');
const fusionRest = document.getElementById('fusion-restaurant');
const tableFusion = document.getElementById('table-fusion');
const indiaRest = document.getElementById('india-restaurant');
const tableIndia = document.getElementById('table-india');
const internationalRest = document.getElementById('international-restaurant');
const tableInternational = document.getElementById('table-international');
const italianRest = document.getElementById('italian-restaurant');
const tableItalian = document.getElementById('table-italian');
const nikkeiRest = document.getElementById('nikkei-restaurant');
const tableNikkei = document.getElementById('table-nikkei');
const peruvianRest = document.getElementById('peruvian-restaurant');
const tablePeruvian = document.getElementById('table-peruavian');
const fishRest = document.getElementById('fish-restaurant');
const tableFish = document.getElementById('table-fish');
const snackRest = document.getElementById('snack-restaurant');
const tableSnack = document.getElementById('table-snack');
const pizzaRest = document.getElementById('pizza-restaurant');
const tablePizza = document.getElementById('table-pizza');
const thaiRest = document.getElementById('thai-restaurant');
const tableThai = document.getElementById('table-thai');
const restModal = document.getElementById('modal-restaurant');
let totalRestaurant;

const restaurantJson = () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      listRestaurant(xhrRestaurant);
      totalRestaurant = xhrRestaurant
    }
  }
  xhr.send();
}

const listRestaurant = (xhrRestaurant) => {
  restaurantTable.innerHTML = ``
  for (const rest of xhrRestaurant) {
    restaurantTable.innerHTML += `
      <tr class="collapsing">
        <th><a id="test">${rest.restaurant}</a></th>
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

const filterRest = (type, lugartabla) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', './data/restaurant.json', true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrRestaurant = JSON.parse(xhr.responseText);
      filterByType(xhrRestaurant, lugartabla);
    }
  }
  xhr.send();

  const filterByType = (xhrRestaurant, trPlace) => {
    trPlace.innerHTML = ``
    let restFilter = [];
    for (xhrRestaurants of xhrRestaurant)
      if (xhrRestaurants.type.includes(type)) {
        restFilter.push(xhrRestaurants);
      }
    for (rest of restFilter) {
      trPlace.innerHTML += `
      <tr class="collapsing">
      <th>${rest.restaurant}</th>
      <th><button class="ui button create_btn" type="button" id="${rest.restaurant}" onclick="filterModal('${rest.restaurant}')">Ver +</button>
	  
      </th>
      <th>${rest.type}</th>
    </tr>
    `
    }
    return restFilter;
  }
}

const filterModal = (id) => {
  const filter = totalRestaurant.filter(restaurant => {
    return restaurant.restaurant === id
  })
  filter.map(restaurant => {
createModal(restaurant)
  })
}

// const showModal = $( function(id){
//   $("#"+id).click(function(){
//     $(".test").modal('show');
//   });
//   $(".test").modal({
//     closable: true
//   });
// });


const createModal = (rest) => {
  restModal.innerHTML = ``
  restModal.innerHTML =
  `<div class="ui modal active test" id="show-modal">
  <i class="close icon" onclick="closeModal()"></i>
  <div class="header">
    <h5>${rest.restaurant}</h5>
  </div>
  <div class="image content">
    <div class="ui medium image">
      <img src="https://semantic-ui.com/images/avatar2/large/rachel.png">
    </div>
    <div class="description">
    <div class="ui list">
    <div class="item">${rest.address}</div>
    <div class="item">${rest.price}</div>
    <div class="item">${rest.type}</div>
  </div>
    </div>
  </div>
  </div>
</div>`
}

const closeModal = () => {
  document.getElementById('show-modal').classList.remove("active");
}

amazonRest.addEventListener('click', () => {
  const type = 'Amazónica'
  const trPlace = tableAmazon;
  filterRest(type, trPlace);
})

americanRest.addEventListener('click', () => {
  const type = 'Americana'
  const trPlace = tableAmerican;
  filterRest(type, trPlace);
})

meatAndGrillRest.addEventListener('click', () => {
  const type = 'Carnes y Parrillas'
  const trPlace = tableMeatAndGrill;
  filterRest(type, trPlace);
})

chifaRest.addEventListener('click', () => {
  const type = 'Chifa'
  const trPlace = tableChifa;
  filterRest(type, trPlace);
})

fusionRest.addEventListener('click', () => {
  const type = 'Fusión'
  const trPlace = tableFusion;
  filterRest(type, trPlace);
})

indiaRest.addEventListener('click', () => {
  const type = 'India'
  const trPlace = tableIndia;
  filterRest(type, trPlace);
})

internationalRest.addEventListener('click', () => {
  const type = 'Internacional'
  const trPlace = tableInternational;
  filterRest(type, trPlace);
})

italianRest.addEventListener('click', () => {
  const type = 'Italiana'
  const trPlace = tableItalian;
  filterRest(type, trPlace);
})

nikkeiRest.addEventListener('click', () => {
  const type = 'Nikkei / Japonesa'
  const trPlace = tableNikkei;
  filterRest(type, trPlace);
})

peruvianRest.addEventListener('click', () => {
  const type = 'Peruana'
  const trPlace = tablePeruvian;
  filterRest(type, trPlace);
})

fishRest.addEventListener('click', () => {
  const type = 'Pescados y Mariscos'
  const trPlace = tableFish;
  filterRest(type, trPlace);
})

snackRest.addEventListener('click', () => {
  const type = 'Piqueos'
  const trPlace = tableSnack;
  filterRest(type, trPlace);
})

pizzaRest.addEventListener('click', () => {
  const type = 'Pizzería'
  const trPlace = tablePizza;
  filterRest(type, trPlace);
})

thaiRest.addEventListener('click', () => {
  const type = 'Thai'
  const trPlace = tableThai;
  filterRest(type, trPlace);
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