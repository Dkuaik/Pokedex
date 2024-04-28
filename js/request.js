const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const promesasFetch= []
const botonesHeader = document.querySelectorAll(".btn-header")
console.log(botonesHeader)

for (let i = 1; i <= 300; i++) {
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
            pokemon.forEach(
                pokemon => mostrarPokemon(pokemon)
                /* pokemonTypes(pokemon); */
            )
         }
    ); 
    
console.log("hola")

function mostrarPokemon(poke){
    
    let tipos=poke.types.map( (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>` );
    tipos = tipos.join(''); //esto junta todos los elemntos en un string

    let pokeId= poke.id.toString()
    if (pokeId.length === 1){
        pokeId = "00"+pokeId
    } else if (pokeId.length === 2) {
        pokeId = "0"+pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML=`
    <div class="pokemon">
<p class="pokemon-id-back">#${pokeId}</p>
<div class="pokemon-imagen">
   <img src=${poke.sprites.other.showdown.front_default} alt="Pikachu" ">
</div>
<div class="pokemon-info">
    <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class=pokemon-tipos>
        ${tipos}
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
 
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML="";
    for (let i = 1; i <= 300; i++) {
        fetch(URL+i)
            .then(response =>response.json())
            .then(data => {
                const tipo = data.types.map(type => type.type.name);
                if (tipo.some (tipo => tipo.includes(botonId)) || botonId === "ver-todos"){
                    mostrarPokemon(data);
                } ; 
            })
    }

}  ) ) 
