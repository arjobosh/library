let theLibrary = [];

// constructor
function Book(title, author, pages, didRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.didRead = didRead;
}

Book.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.didRead ? 'read' : 'not read');
}

function addBookToLibrary(title) {
    return theLibrary.push(title);
}

function printLibrary() {
    theLibrary.forEach(book => {
        console.log(book);
    });
}

function appendBookCard(book) {
    let bookCard = document.createElement('div');
    bookCard.className = 'card';
    addDetailToCard(book.title, bookCard);
    addDetailToCard(book.author, bookCard);
    addDetailToCard(book.pages + ' pages', bookCard);
    addDetailToCard(book.didRead ? 'finished' : 'unfinished', bookCard);
    shelf.appendChild(bookCard);
}

function addDetailToCard(detail, card) {
    let p = document.createElement('p');
    p.textContent = detail;
    card.appendChild(p);
}

const shelf = document.getElementById('shelf');

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let theWitcher = new Book('The Last Wish', 'Andrzej Sapkowski', 288, true);


addBookToLibrary(theHobbit);
addBookToLibrary(theWitcher);
addBookToLibrary(theHobbit);
addBookToLibrary(theWitcher);
addBookToLibrary(theHobbit);
addBookToLibrary(theWitcher);
addBookToLibrary(theHobbit);
addBookToLibrary(theWitcher);

theLibrary.forEach(book => {
    appendBookCard(book);
});
