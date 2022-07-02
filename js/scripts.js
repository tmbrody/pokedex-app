/* create an array to store and display data regarding some 
different pokemon and a few details about them */
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Charizard', 
      height: 5.58,
      weight: 199.5, 
      types: ['fire', 'flying']
    },
    {
      name: 'Caterpie', 
      height: 1,
      weight: 6.4, 
      types: ['bug']
    },
    {
      name: 'Nidoking', 
      height: 4.58,
      weight: 136.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Pikachu', 
      height: 1.33,
      weight: 13.2, 
      types: ['electric']
    },
    {
      name: 'Zubat', 
      height: 2.58,
      weight: 16.5, 
      types: ['poison', 'flying']
    }
  ];
  /* only add a new item to the array if it is an Object with
  exactly the same contents as the items currently in the array */
  function add(item) {
    var array1 = Object.keys(item);
    var array2 = Object.keys(pokemonList[0]);

    if (typeof item === 'object' && 
    (Array.isArray(array1) && Array.isArray(array2)) &&
    (array1.length === array2.length) &&
    (array1.every( (item, idx) => item === array2[idx]))) { 
      pokemonList.push(item);
    }
  }

  function addListItem(pokemon) {
    /* use the class from the index page's ul element to add 
    list-item buttons that can display each pokemon's name and
    use eventlisteners for future functionality */ 
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
    console.log(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  /* compare a given name with the name values in the current array
  and return details about a specific pokemon only if its name 
  matches the requested name */ 
  function search(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    serach: search
  };

})();

/* display a list of buttons that are labelled with 
different pokemon names */ 
pokemonRepository.getAll().forEach(pokemon => {
  pokemonRepository.addListItem(pokemon);
});
