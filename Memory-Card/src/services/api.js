const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemonData = async () => {
  try {
    // Fetch the list of Pokémon
    const response = await fetch(`${API_URL}?limit=25`);
    const data = await response.json();

    // Fetch details for each Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return {
          id: details.id,
          name: details.name,
          imageUrl: details.sprites.front_default,
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};