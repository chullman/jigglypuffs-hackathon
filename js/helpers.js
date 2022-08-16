const TOTAL_POKEMON = 915;

function applyStyles(el, styles) {
  for (let style in styles) {
    el.style[style] = styles[style];
  }
}

function randomPokemonID(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getRandomPokemon(count) {
  const results = [];
    let i = 1;
    let errorThrown = false;
    let errorObj = new Error();
    while (i <= count && !errorThrown) {
      const randomID = randomPokemonID(1, TOTAL_POKEMON);

      await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(JSON.stringify({
            code: response.status,
            message: `Error: HTTP Error Code ${response.status} returned from PokeAPI`
          }))
        }
        return response;
      })
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((json) => {
        results.push(json);
      })
      .catch((error) => {
        errorObj = error;
        errorThrown = true; // To break out of the while loop
      })

      i++;
    }
    if (results.length > 0 && !errorThrown) {
      return results;
    } else {
      throw errorObj;
    }

}

export {
  applyStyles,
  getRandomPokemon
}