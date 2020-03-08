let array = JSON.parse(localStorage.getItem('storage'));
let myLibrary = (!array) ? [] : array;

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function render(template, node) {
    node.innerHTML = template;
    localStorage.setItem('storage', JSON.stringify(myLibrary));
}

function sortLibrary(parameter) {
    if(parameter == 'title')
        myLibrary.sort((a, b) => (a.title > b.title) ? 1 : -1);
    else if(parameter == 'author')
        myLibrary.sort((a, b) => (a.author > b.author) ? 1 : -1);
    else if(parameter == 'pages')
        myLibrary.sort((a, b) => (a.pages > b.pages) ? 1 : -1);
    else if(parameter == 'read')
        myLibrary.sort((a, b) => a.read - b.read);
}

function setParameter(e) {
    const parameterType = e.target.getAttribute('parameter');
    const dropdownText = document.querySelector('.dropdown-btn');
    const bookContainer = document.querySelector('.book-container');
    bookContainer.setAttribute('parameter', parameterType);
    dropdownText.textContent = parameterType.charAt(0).toUpperCase() + parameterType.slice(1); 
    
    setupLibrary();
}

function setupLibrary() {
    const bookContainer = document.querySelector('.book-container');
    let parameter = bookContainer.getAttribute('parameter');
    let template = '';
    let index = 0;

    if(myLibrary.length == 0) {
        template = 
            `<div class='empty-message'>
                <h3>It seems your library has no books.<br> Go ahead and add some to it!</h3>
            </div>`;

        render(template, bookContainer);
        return;
    }
    
    sortLibrary(parameter);

    myLibrary.forEach(book => {
        let attribute = book.read ? 'read' : '';
        let alreadyRead = book.read ? 'Already read' : 'Not read yet';

        template += 
            `<div class='book ${attribute}'>
                <h2>${book.title}</h2>
                <h3>${book.author}</h3>
                <p>${book.pages} pages</p>
                <p>${alreadyRead}</p>
                <button id='tg-${index}' class='tg-btn' book="${book.title}" onclick='toggleRead(this.id)'>Read Status</button>
                <button id='rm-${index++}' class='rmv-btn' book='${book.title}' onclick='removeBookFromLibrary(this.id)'>Remove</button>
            </div>`;
    });

    render(template, bookContainer);
}

function toggleRead(id) {
    const book = document.querySelector(`#${id}`);
    const title = book.getAttribute('book');
    const index = myLibrary.findIndex(book => book.title === title);

    myLibrary[index].read = !myLibrary[index].read;

    setupLibrary();
}

function submitInfo() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    let read = document.querySelector('input[type="checkbox"]');
    read = read.checked;

    if(title == '' || author == '' || pages == '' || isNaN(pages) || pages > 10000) {
        alert('Please input the correct information!');
        return;
    }
    
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    setupLibrary();
    formSetup(2);
}

function formSetup(opr) {
    let newContainer = document.querySelector('.new-container');
    let template = '';

    if(opr == 1) {
        template = 
            `<form class='form-group' autocomplete='off'>
                <input id='title' type='text' placeholder='Title'></input>
                <input id='author' type='text' placeholder='Author'></input>
                <input id='pages' type='text' placeholder='Pages'></input>
                <span>Already read?</span>
                <input type='checkbox'></input>
            </form>
            <button class='submit-btn' onclick='submitInfo()'>Submit</button>
            <button class='cancel-btn' onclick='formSetup(2)'>Cancel</button>`;
    }
    else {
        template = `<button class='new-btn' onclick='formSetup(1)'>Add Book</button>`;
    }

    render(template, newContainer);
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    setupLibrary();
}

function removeBookFromLibrary(id) {
    const btn = document.querySelector(`#${id}`);    
    const title = btn.getAttribute('book');
    const index = myLibrary.findIndex(book => book.title === title);
    myLibrary.splice(index, 1);
    
    setupLibrary();
}

function sortEvent() {
    const parameters = document.querySelectorAll('.sort-link');

    parameters.forEach(link => link.addEventListener('click', setParameter))
}

setupLibrary();
sortEvent();
