// Funtions and variables

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

let link = "https://swapi.dev/api/people/";
const divCharacters = document.getElementById('characters');
const divButtons = document.getElementById('buttons');

function fetchFuction() {
    fetch(link)
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw Error(response.status)
        })
        .then(response => response.json())
        .then(data => {
            const characters = data.results;
            return characters.map(character => {
                const split = (character.url).split('/'),
                    id = split[split.length - 2];
                let div = createNode('div'),
                    span = createNode('span'),
                    a = createNode('a');
                div.classList.add('character');
                span.innerHTML = `<i class="icon-star-1">${character.name}`;
                a.href = `character-details.html?id=${id}`;
                append(divCharacters, div);
                append(div, a);
                append(a, span);
            })
        })
        .catch(error => console.log(error))
}

function newPage() {
    const txt = this.innerText;
    link = `https://swapi.dev/api/people/?page=${txt}`;
    divCharacters.innerHTML = null;
    fetchFuction()
}

//Create DOM 

fetchFuction()

fetch(link)
    .then(response => {
        if (response.ok) {
            return response;
        }
        throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
        const max = Math.ceil(data.count / data.results.length)

        for (let i = 0; i < max; i++) {
            let btn = createNode('button');
            btn.innerHTML = `${i+1}`;
            btn.id = `btn`;
            append(divButtons, btn);
        }

        const button = document.querySelectorAll('button');

        for (let i = 0; i < max; i++) {
            button[i].addEventListener('click', newPage)
        }

        $('button').on('click', function () {
            $('button').removeClass('selected');
            $(this).addClass('selected');
        });

        $('button:first').addClass('selected')
    })