let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let modalContainer = document.querySelector('.modal');
  let searchIcon = document.querySelector('.btn-outline-secondary');
  
  function add(pokemon) {
    if (typeof pokemon === 'object' && "name" in pokemon 
    && "detailsUrl" in pokemon) { 
      pokemonList.push(pokemon);
    } else {
      console.log("Pokémon is not correct");
    }
  }

  function addListItem(pokemon) {
    let pokemonDisplay = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'text-center');
    let listButton = document.createElement('button');
    listButton.innerHTML = `<strong>${pokemon.name}</strong>`;
    listButton.classList.add('selected-button');
    listButton.classList.add('btn', 'btn-lg', 'btn-outline-info');
    listButton.setAttribute('type', 'button');
    listButton.setAttribute('data-bs-toggle', '#pokemonModal');
    listButton.setAttribute('data-bs-target', '#pokemonModal');
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

      let modalDialog = document.createElement('div');
      modalDialog.classList.add('modal-dialog', 'pt-5');

      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      let modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header', 'row');

      let modalTitle = document.createElement('h5');
      modalTitle.classList.add('modal-title', 'col-sm-3');

      pokemon.types.forEach(t => {
        switch(t.type.name) {
          case 'fire':
            modalTitle.classList.add('text-danger');
            break;
          case 'grass':
            modalTitle.classList.add('text-success');
            break;
          case 'water':
            modalTitle.classList.add('text-primary');
            break;
          case 'electric':
            modalTitle.classList.add('text-warning');
            break;
          case 'flying':
            modalTitle.classList.add('text-info');
            break;
          case 'poison':
            modalTitle.classList.add('text-secondary');
            break;
        }
      });

      modalTitle.setAttribute('id', 'pokemonModalLabel');
      modalTitle.innerHTML = `<p><strong>${pokemon.name}</strong></p>`;

      let modalClose = document.createElement('button');
      modalClose.classList.add('btn-close', 'col-sm-9', 'me-3');
      modalClose.setAttribute('type', 'button');
      modalClose.setAttribute('data-bs-dismiss', 'modal');
      modalClose.setAttribute('aria-label', 'Close');
      modalClose.addEventListener('click', hideDetails);

      let modalBody = document.createElement('div');
      modalBody.classList.add('modal-body');

      modalBody.innerHTML = `
        Entry: ${pokemon.id}<br>
        Height: ${pokemon.height}<br>
        Weight: ${pokemon.weight}<br>
        Types: ${pokemon.types[0].type.name}`;

      if (pokemon.types.length === 2) {
        modalBody.innerHTML += `, ${pokemon.types[1].type.name}`;
      }

      modalBody.innerHTML += `<br>Abilities: ${pokemon.abilities[0].ability.name}`;
      
      if (pokemon.abilities.length === 2) {
        modalBody.innerHTML += `, ${pokemon.abilities[1].ability.name}`;
      }

      modalBody.innerHTML += `<br>
        <img src=${pokemon.imageFrontUrl} alt="${pokemon.name} front sprite">
        <img src=${pokemon.imageBackUrl} alt="${pokemon.name} back sprite">
      `;

      modalDialog.appendChild(modalContent);
      modalContent.appendChild(modalHeader);
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalClose);
      modalContent.appendChild(modalBody);
      modalContainer.appendChild(modalDialog);

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
      item.imageFrontUrl = details.sprites.front_shiny;
      item.imageBackUrl = details.sprites.back_shiny;
      item.id = details.id;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (error) {
      console.error(error);
    });
  }

  function showLoadingMessage() {
    document
      .querySelector('.text-danger')
      .classList
      .remove('d-none');
  }

  function hideLoadingMessage() {
    document
      .querySelector('.text-danger')
      .classList
      .add('d-none');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList
     .contains('modal')) {
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
    let bodyHeader = document.querySelector('.d-flex');
    if (bodyHeader.childElementCount === 1) {
      let searchQuery = document.createElement('input');
      searchQuery.setAttribute('placeholder', 'Pokémon name');
      searchQuery.setAttribute('type', 'search');
      searchQuery.setAttribute('aria-label', 'Search Pokémon name');
      searchQuery.classList.add('form-control', 'my-3', 'col-sm');
      searchIcon.blur(); 
      searchQuery.autofocus = true;
      bodyHeader.appendChild(searchQuery);

      searchQuery.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchQuery.value = searchQuery.value.charAt(0).toUpperCase() 
                              + searchQuery.value.slice(1);
          if (search(searchQuery.value)[0] !== undefined) {
            showDetails(search(searchQuery.value)[0]);
          }
        }
      });
    }
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
