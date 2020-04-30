const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const link = `https://swapi.dev/api/people/${myParam}/`

const div = document.getElementById('characterDetails');

function showError(error) {
    if (error == "Error: 404") {
        div.innerHTML = `<div class="error">${error}</div> 
                        <h3>File not found.</h3> 
                        <h3>Check if the URL address is correct.</h3>`;
    } else if (error == "Error: 403") {
        div.innerHTML = `<div class="error">${error}</div> <h3>Forbidden.</h3>`;
    } else if (error == "Error: 500") {
        div.innerHTML = `<div class="error">${error}</div> <h3>Internal Server Error.</h3>`;
    } else if (error == "Error: 503") {
        div.innerHTML = `<div class="error">${error}</div> <h3>Service Unavailable.</h3>`;
    } else if (error == "Error: 504") {
        div.innerHTML = `<div class="error">${error}</div> <h3>Gateway Timeout.</h3>`;
    } else {
        div.innerHTML = `<div class="error">${error}</div>`;
    }
}

fetch(link)
    .then(response => {
        if (response.ok) {
            return response;
        }
        throw Error(response.status)
    })
    .then(response => response.json())
    .then(character => {
        div.innerHTML =
            `<div class="text">Name:</div> <div class="data">${character.name}</div>
            <div class="text">Gender:</div> <div class="data">${character.gender}</div>
            <div class="text">Height:</div> <div class="data">${character.height}</div>
            <div class="text">Mass:</div> <div class="data">${character.mass}</div>
            <div class="text">Birth year:</div> <div class="data">${character.birth_year}</div>
            <div class="text">Hair color:</div> <div class="data">${character.hair_color}</div>
            <div class="text">Skin color:</div> <div class="data">${character.skin_color}</div>
            <div class="text">Eye color:</div> <div class="data">${character.eye_color}</div>`
    })
    .catch(error => showError(error))