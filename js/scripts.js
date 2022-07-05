let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  let searchIcon = document.querySelector('.search-icon');
  
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

  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideDetails);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height}`;

      let weightElement = document.createElement('p');
      weightElement.innerText = `Weight: ${pokemon.weight}`;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  function hideDetails() {
    modalContainer.classList.remove('is-visible');
  }

  function getAll() {
    return pokemonList;
  }

  function search(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      console.error(error);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_shiny;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (error) {
      console.error(error);
    });
  }

  function showLoadingMessage() {
    document
      .querySelector('.loading-message')
      .classList
      .add('visible-on');
  }

  function hideLoadingMessage() {
    document
      .querySelector('.loading-message')
      .classList
      .remove('visible-on');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList
     .contains('is-visible')) {
      hideDetails();
     }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideDetails();
    }
  });

  searchIcon.addEventListener('click', function() {
    console.log('pikachu'.charAt(0).toUpperCase() + 'pikachu'.slice(1));
  });

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    serach: search,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})
