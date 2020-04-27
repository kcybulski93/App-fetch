function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el)
}

const div1 = document.getElementById('characters')
const url = "https://swapi.dev/api/people"

fetch(url)
    .then(response => {
        if (response.ok) {
            return response;
        }
        throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
        let characters = data.results
        return characters.map(character => {
            let div2 = createNode('div'),
                span = createNode('span'),
                a = createNode('a');
            div2.classList.add('character');
            span.innerHTML = `<i class="icon-star-1"> ${character.name}`;
            a.href = `character-details.html?id=${character.name}`;
            append(div1, div2);
            append(div2, a);
            append(a, span);
        })
    })
    .catch(error => console.log(error))