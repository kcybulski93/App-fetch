function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el)
}

function newPage() {
    let txt = this.innerText;
    let link = `https://swapi.dev/api/people/?page=${txt}`
    divCharacters.innerHTML = null;
    fetch(link)
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
                let div = createNode('div'),
                    span = createNode('span'),
                    a = createNode('a');
                div.classList.add('character');
                span.innerHTML = `<i class="icon-star-1">${character.name}`;
                a.href = `character-details.html?id=${character.name}&link=${link}`;
                append(divCharacters, div);
                append(div, a);
                append(a, span);
            })
        })
        .catch(error => console.log(error))
}

const divCharacters = document.getElementById('characters');
const url = "https://swapi.dev/api/people/";
const divButtons = document.getElementById('buttons');

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
            let div = createNode('div'),
                span = createNode('span'),
                a = createNode('a');
            div.classList.add('character');
            span.innerHTML = `<i class="icon-star-1"> ${character.name}`;
            a.href = `character-details.html?id=${character.name}&link=${url}`;
            append(divCharacters, div);
            append(div, a);
            append(a, span);
        })
    })
    .catch(error => console.log(error))

for (let i = 0; i < 9; i++) {
    let btn = createNode('button');
    btn.innerHTML = `${i+1}`;
    btn.id = `btn`;
    append(divButtons, btn);
}

let button = document.querySelectorAll('button');

for (let i = 0; i < 9; i++) {
    button[i].addEventListener('click', newPage)
}

$('button').on('click', function () {
    $('button').removeClass('selected');
    $(this).addClass('selected');
});

$('button:first').addClass('selected')