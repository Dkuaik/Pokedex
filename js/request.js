const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const promesasFetch= []


for (let i = 1; i <= 151; i++) {
    const fetchPromise = fetch(URL + i)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });

    promesasFetch.push(fetchPromise);
}

Promise.all(promesasFetch)
    .then(
        pokemon => { 
            pokemon.sort( (a,b) => a.id - b.id)
            pokemon.forEach(pokemon => mostrarPokemon(pokemon))
         }
    ); 

function mostrarPokemon(poke){
    console.log(poke);
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML=`
    <div class="pokemon">
<p class="pokemon-id-back">#${poke.id}</p>
<div class="pokemon-imagen">
   <img src=${poke.sprites.other.showdown.front_default} alt="Pikachu" ">
</div>
<div class="pokemon-info">
    <div class="nombre-contenedor">
        <p class="pokemon-id">#${poke.id}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class="pokemon-tipos">
        <p class="electric tipo">ELECTRIC</p>
        <p class="fighting tipo">FIGHTING</p>
    </div>
    <div class="pokemon-stats">
        <p class="stat">${poke.height} m</p>
        <p class="stat">${poke.weight} kg</p>
    </div>
</div>
</div>
    `;
    listaPokemon.append(div); 
}


/* <div class="pokemon">

<p class="pokemon-id-back">#025</p>
<div class="pokemon-imagen">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">
</div>
<div class="pokemon-info">
    <div class="nombre-contenedor">
        <p class="pokemon-id">#025</p>
        <h2 class="pokemon-nombre">Pikachu</h2>
    </div>
    <div class="pokemon-tipos">
        <p class="electric tipo">ELECTRIC</p>
        <p class="fighting tipo">FIGHTING</p>
    </div>
    <div class="pokemon-stats">
        <p class="stat">4m</p>
        <p class="stat">60kg</p>
    </div>
</div>

</div> */

