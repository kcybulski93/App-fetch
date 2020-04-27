const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const ul = document.getElementById('characterDetails');
const url = "http://swapi.dev/api/people";

fetch(url)
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
        ul.innerHTML =
            `<li><span>Namee: ${character.name}</span></li>
            <li><span>Genders: ${character.gender}</span></li>
            <li><span>Height: ${character.height}</span></li>
            <li><span>Mass: ${character.mass}</span></li>
            <li><span>Birth year: ${character.birth_year}</span></li>
            <li><span>Hair color: ${character.hair_color}</span></li>
            <li><span>Skin color: ${character.skin_color}</span></li>
            <li><span>Eye color: ${character.eye_color}</span></li>`
    })
    .catch(error => console.log(error))