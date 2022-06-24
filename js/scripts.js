/* create an array to store and display data regarding some different 
pokemon and a few details about them */
let pokemonList = [];

pokemonList[0] = {
  name: 'Charizard', 
  height: 1.7,
  weight: 90.5, 
  types: ['fire', 'flying']
};
document.write(
  `Name: ${pokemonList[0].name} <br>
  Height: ${pokemonList[0].height} <br> 
  Weight: ${pokemonList[0].weight} <br> 
  Types: [${pokemonList[0].types}] <br><br>`
);

pokemonList[1] = {
  name: 'Caterpie', 
  height: 0.3,
  weight: 2.9, 
  types: ['bug']
};
document.write(
  `Name: ${pokemonList[1].name} <br>
  Height: ${pokemonList[1].height} <br> 
  Weight: ${pokemonList[1].weight} <br> 
  Types: [${pokemonList[1].types}] <br><br>`
);

pokemonList[2] = {
  name: 'Nidoking', 
  height: 1.4,
  weight: 62, 
  types: ['grass', 'poison']
};
document.write(
  `Name: ${pokemonList[2].name} <br>
  Height: ${pokemonList[2].height} <br> 
  Weight: ${pokemonList[2].weight} <br> 
  Types: [${pokemonList[2].types}] <br><br>`
);

pokemonList[3] = {
  name: 'Pikachu', 
  height: 0.4,
  weight: 6, 
  types: ['electric']
};
document.write(
  `Name: ${pokemonList[3].name} <br>
  Height: ${pokemonList[3].height} <br> 
  Weight: ${pokemonList[3].weight} <br> 
  Types: [${pokemonList[3].types}] <br><br>`
);

pokemonList[4] = {
  name: 'Zubat', 
  height: 0.8,
  weight: 7.5, 
  types: ['poison', 'flying']
};
document.write(
  `Name: ${pokemonList[4].name} <br>
  Height: ${pokemonList[4].height} <br> 
  Weight: ${pokemonList[4].weight} <br> 
  Types: [${pokemonList[4].types}] <br><br>`
);
