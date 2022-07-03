let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add(pokemon) {
    if (typeof pokemon === 'object' && "name" in pokemon 
    && "detailsUrl" in pokemon) { 
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function addListItem(pokemon) {
    var pokemonDisplay = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let listButton = document.createElement('button');
    listButton.innerHTML = `<strong>${pokemon.name}</strong>`;
    listButton.classList.add('selected-button');
    listItem.appendChild(listButton);
    pokemonDisplay.appendChild(listItem);
    listButtonEventListener(listButton, pokemon);
  }

  /* add a click eventlistener to the button elements that were 
  created in the addListItem function */
  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function getAll() {
    return pokemonList;
  }

  function search(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      console.error(error);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (error) {
      console.error(error);
    });
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    serach: search,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})
