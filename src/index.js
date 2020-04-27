function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el)
}

const ul = document.getElementById('characters')
const url = "http://swapi.dev/api/people"

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
            let li = createNode('li'),
                span = createNode('span'),
                a = createNode('a');
            span.innerHTML = `${character.name}`;
            a.id = `${character.name}`;
            a.href = `character-details.html?id=${character.name}`;
            append(ul, li);
            append(li, a);
            append(a, span);
        })
    })
    .catch(error => console.log(error))