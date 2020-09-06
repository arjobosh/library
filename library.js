
const theLibrary = [];

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
    let bookDetails = ['title', 'author', 'pages', 'didRead']
    for (let i = 0 ; i < bookDetails.length; i++) {
        addDetailToCard(book, bookDetails[i], bookCard);
    }
    shelf.appendChild(bookCard);
}

function addDetailToCard(book, detailType, card) {
    let p = document.createElement('p');

    if (detailType == 'pages') {
        p.className = detailType;
        p.textContent = book[detailType] + ' pages';
    }
    else if (detailType == 'didRead') {
        p.className = p.textContent = book[detailType] ? 'finished' : 'unfinished';
    }
    else {
        p.className = detailType;
        p.textContent = book[detailType];
    }

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

console.log(theWitcher['title']);