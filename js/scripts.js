const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  const searchIcon = document.querySelector('.btn-outline-secondary');

  const modalContainer = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal-dialog');
  const modalContent = document.querySelector('.modal-content');
  const modalHeader = document.querySelector('.modal-header');
  const modalTitle = document.querySelector('.modal-title');
  const modalClose = document.querySelector('.btn-close');
  const modalBody = document.querySelector('.modal-body');

  const listItemArray = document.getElementsByTagName('li');

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon 
    && 'detailsUrl' in pokemon) { 
      pokemonList.push(pokemon);
    } else {
      console.log('Pokémon is not correct');
    }
  }

  function addListItem(pokemon) {
    const pokemonDisplay = document.querySelector('.list-group-horizontal');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'text-center', 'col-sm-6', 
                            'col-md-4', 'border', 'border-primary', 
                            'bg-image', 'img-fluid');
    const listTitle = document.createElement('p');
    listTitle.classList.add('display-6');
    listTitle.innerHTML = `<strong>${pokemon.name}</strong>`;
    const listSprite = document.createElement('div');

    loadDetails(pokemon).then(function () {
      listSprite.innerHTML = `<img src=${pokemon.imageFrontUrl} 
                            alt="${pokemon.name} sprite">`;
    });

    const listButton = document.createElement('button');
    listButton.innerHTML = 'Show more';
    listButton.classList.add('mb-2', 'btn', 'btn-secondary');
    listButton.setAttribute('type', 'button');
    listButton.setAttribute('data-bs-toggle', 'modal');
    listButton.setAttribute('data-bs-target', '#pokemonModal');
    listItem.appendChild(listTitle);
    listItem.appendChild(listSprite);
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
      
      modalTitle.className = 'modal-title h5 col-sm-3';

      const pokeType = {fire: 'text-danger', grass: 'text-success', 
                        water: 'text-primary', electric: 'text-warning', 
                        flying: 'text-info', poison: 'text-secondary'};

      pokemon.types.forEach(t => modalTitle.classList.add(pokeType[t.type.name]));
      modalTitle.innerHTML = `<p><strong>${pokemon.name}</strong></p>`;

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
        <br>
        <img src=${pokemon.imageFrontShinyUrl} alt="${pokemon.name} front shiny sprite">
        <img src=${pokemon.imageBackShinyUrl} alt="${pokemon.name} back shiny sprite">
      `;

      modalDialog.appendChild(modalContent);
      modalContent.appendChild(modalHeader);
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalClose);
      modalContent.appendChild(modalBody);
      modalContainer.appendChild(modalDialog);
    });
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
        const pokemon = {
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
    const url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageFrontUrl = details.sprites.front_default;
      item.imageBackUrl = details.sprites.back_default;
      item.imageFrontShinyUrl = details.sprites.front_shiny;
      item.imageBackShinyUrl = details.sprites.back_shiny;
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

  modalClose.addEventListener('click', () => {
    modalContainer.classList.remove('modal-open');
    modalContainer.setAttribute('style', 'display:none');

    listItemArray[0].lastChild.click();
  });

  searchIcon.addEventListener('click', function() {
    const bodyHeader = document.querySelector('.d-flex');
    if (bodyHeader.childElementCount === 1) {
      const searchQuery = document.createElement('input');
      searchQuery.setAttribute('placeholder', 'Pokémon name');
      searchQuery.setAttribute('type', 'search');
      searchQuery.setAttribute('aria-label', 'Search Pokémon name');
      searchQuery.classList.add('form-control', 'my-3', 'ps-2', 'col-sm');
      searchIcon.blur(); 
      searchQuery.autofocus = true;
      bodyHeader.appendChild(searchQuery);

      searchQuery.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchQuery.value = searchQuery.value.charAt(0).toUpperCase() 
                              + searchQuery.value.slice(1);
                              
          for (let i = 0; i < listItemArray.length; i++) {
            if (902 > listItemArray[i].lastChild.getBoundingClientRect()['top'] && 
            listItemArray[i].lastChild.getBoundingClientRect()['top'] > 42) {
              listItemArray[i].lastChild.click();
            }
          }

          for (let i = 0; i < listItemArray.length; i++) {
            if (listItemArray[i].innerText.split('\n')[0] === searchQuery.value) {
              setTimeout(function() { listItemArray[i].lastChild.click() }, 5);
            }
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
