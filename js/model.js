//Esta función regresa la información de un pokemon con Id = i
let URL2 = "https://pokeapi.co/api/v2/pokemon/";

function pokemonPerId(i) {
    return fetch(URL2 + i)
        .then(response => response.json())
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}

/* pk = pokemonPerId(2)
    .then(response => console.log(response.name))
    .catch(error => console.error(error)) */

async function pokemonPerId2(i) {
    const res = await fetch(URL2+i)
    const data = await res.json()
    console.log(data.name)
}

console.log(pokemonPerId2(2),"hola2")