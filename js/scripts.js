/* create an array to store and display data regarding some different 
pokemon and a few details about them */
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

//display the list of pokemon names and their heights
for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    `<strong>${pokemonList[i].name}</strong> 
    (height: ${pokemonList[i].height} ft)`
  );
  /* insert a new line after the pokemon's details or additional text
  if it is big enough */
  pokemonList[i].height > 5 ? document.write(' - <em>That\'s big!</em>') 
                            : document.write('<br>');
}
