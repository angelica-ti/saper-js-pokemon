qS = (selector) => document.querySelector(selector);
qSAll = (selector) => document.querySelectorAll(selector);

function setText(selector, text) {
    let element = document.querySelector(selector);
    element.innerHTML = text;
}

function setName({name}) {
    if(!name) {
        qS('.name').innerHTML = '&nbsp;';
        return;
    }

    qS('.name').innerHTML =  name.toUpperCase();

}

function setSprite( {sprites: {front_default: sprite}} ) {
    if(!sprite) {
        qS('img').src = '';
        qS('img').classList.add('placeholder');    
    } else {
        qS('img').classList.remove('placeholder');    
        qS('img').src = sprite;
    }
}

function setStats( {stats} ) {
    spans = qSAll('span');
    if(!stats) {
        spans.forEach( span => span.innerHTML = '&nbsp;' );
        return;
    } 

    stats.forEach( (st, idx) => spans[idx].innerHTML =  st.base_stat);

}

function cleanPokemonData() {
    setPokemonData( {sprites: undefined, name: '', stats: undefined} );
}

function setPokemonData( pokemonJson ) {
    setName(pokemonJson);
    setSprite(pokemonJson);
    setStats(pokemonJson);

    return false;
}


const fetchPokeApi = (url, fn) =>  
    fetch(url)
        .then( (resp) => resp.json() )
        .then( fn )
        .catch( (err) => { cleanPokemonData(); alert(err); } );

const fetchPokemon = (name) => fetchPokeApi(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    setPokemonData
);



window.addEventListener('load', (event) => {
    fetchPokemon('pikachu');
});