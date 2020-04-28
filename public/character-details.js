const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const div = document.getElementById('characterDetails');
const url = "https://swapi.dev/api/people/";

fetch(url)
    .then(response => {
        if (response.ok) {
            return response;
        }
        throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
        let count = data.count,
            i = 0;
        for (i = 1; i <= count + 1; i++) {
            url2 = `https://swapi.dev/api/people/${i}/`
            fetch(url2)
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.status)
                })
                .then(response => response.json())
                .then(character => {
                    if (myParam === character.name) {
                        return character
                    }
                })
                .then(character => {
                    if (character) {
                        div.innerHTML =
                            `<div class="text">Name:</div> <div class="data">${character.name}</div>
                            <div class="text">Gender:</div> <div class="data">${character.gender}</div>
                            <div class="text">Height:</div> <div class="data">${character.height}</div>
                            <div class="text">Mass:</div> <div class="data">${character.mass}</div>
                            <div class="text">Birth year:</div> <div class="data">${character.birth_year}</div>
                            <div class="text">Hair color:</div> <div class="data">${character.hair_color}</div>
                            <div class="text">Skin color:</div> <div class="data">${character.skin_color}</div>
                            <div class="text">Eye color:</div> <div class="data">${character.eye_color}</div>`
                    } else 0
                })
                .catch(error => console.log(error))

        }
    })
    .catch(error => console.log(error))