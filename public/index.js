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

function showError(error) {
    switch (error.toString()) {
        case "Error: 404":
            divCharacters.innerHTML = `<div class="error">${error}</div> 
                        <h3>File not found.</h3> 
                        <h3>Check if the URL address is correct.</h3>`;
            break;
        case "Error: 403":
            divCharacters.innerHTML = `<div class="error">${error}</div> 
                <h3>File not found.</h3> 
                <h3>Forbidden.</h3>`;
            break;
        case "Error: 500":
            divCharacters.innerHTML = `<div class="error">${error}</div> 
                <h3>File not found.</h3> 
                <h3>Internal Server Error.</h3>`;
            break;
        case "Error: 503":
            divCharacters.innerHTML = `<div class="error">${error}</div> 
                <h3>File not found.</h3> 
                <h3>Service Unavailable.</h3>`;
            break;
        case "Error: 504":
            divCharacters.innerHTML = `<div class="error">${error}</div> 
                <h3>File not found.</h3> 
                <h3>Gateway Timeout</h3>`;
            break;
        default:
            divCharacters.innerHTML = `<div class="error">${error}</div>`;
            break;
    }
}

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
        .catch(error => showError(error))
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
    .catch(error => showError(error))