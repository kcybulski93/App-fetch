const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const link = urlParams.get('link');

const div = document.getElementById('characterDetails');

fetch(link)
    .then(response => {
        if (response.ok) {
            return response;
        }
        throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0, max = data.results.length; i < max; i++) {
            if (myParam === data.results[i].name)
                return data.results[i];
        }
    })
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
    .catch(error => console.log(error))