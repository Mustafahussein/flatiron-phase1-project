console.log('main.js connected');

document.addEventListener('DOMContentLoaded', function() {
    // API endpoint
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  
    // Event listeners
    const pokemonList = document.getElementById('pokemon-list');
    const searchBox = document.getElementById('search-box');
    const pokemonInfo = document.getElementById('pokemon-info');
  
    // Fetch Pokémon data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Store the Pokémon data for filtering
        const pokemonData = data.results;
  
        // Function to display the Pokémon list based on the search query
        function displayPokemonList(query = '') {
          pokemonList.innerHTML = '';
          pokemonData.forEach(pokemon => {
            if (pokemon.name.includes(query.toLowerCase())) {
              const listItem = document.createElement('li');
              listItem.textContent = pokemon.name;
  
              // Fetch the Pokémon details to get the sprites
              fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonDetails => {
                  const spriteURL = pokemonDetails.sprites.front_default;
                  const image = document.createElement('img');
                  image.src = spriteURL;
                  listItem.prepend(image);
                })
                .catch(error => console.error('Error fetching Pokémon details:', error));
  
              listItem.addEventListener('click', () => fetchPokemonInfo(pokemon.url));
              pokemonList.appendChild(listItem);
            }
          });
        }
  
        // Initial display of Pokémon list
        displayPokemonList();
  
        // Event listener for the search box
        searchBox.addEventListener('input', () => {
          const searchQuery = searchBox.value.trim();
          displayPokemonList(searchQuery);
        });
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
  
    // Function to fetch additional details of a selected Pokémon
    function fetchPokemonInfo(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Display the Pokémon's abilities
          const abilities = data.abilities.map(ability => ability.ability.name);
          pokemonInfo.innerHTML = `<h2>${data.name}</h2><p>Abilities: ${abilities.join(', ')}</p>`;
        })
        .catch(error => console.error('Error fetching Pokémon info:', error));
    }
  });
  