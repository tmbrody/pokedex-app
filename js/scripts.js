/* create an array to store and display data regarding some different 
pokemon and a few details about them */
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

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add
  };

})();

// display the list of pokemon names and their heights
pokemonRepository.getAll().forEach(pokemon => {
  document.write(
    `<div class="test"><strong>${pokemon.name}</strong>
    <span class="green">Weight: ${pokemon.weight} lb</span>`
  );
  // modify the 'types' text based on the number of types per pokemon
  pokemon.types.length > 1 
  ? document.write(
    `<span class="red">Types: ${pokemon.types}</span>`
  )
  : document.write(
    `<span class="red">Type: ${pokemon.types}</span>`
  );

  document.write(
    `<span class="blue">Height: ${pokemon.height} ft</span>`
  );
  /* insert a new line after the pokemon's details or additional text
  if it is big enough */
  pokemon.height > 5 ? document.write('<em>Wow, that\'s big!</em></div>') 
                      : document.write('</div>');
});
