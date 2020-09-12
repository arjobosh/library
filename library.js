//-----------------------------------------------/
// library functions

const theLibrary = [];
const shelf = document.getElementById('shelf');

// book constructor
function Book(title, author, pages, didRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.didRead = didRead;
}

Book.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.didRead ? 'read' : 'not read');
}

Book.prototype.createBookCard = function() {
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', theLibrary.indexOf(this));

    let x = Object.getOwnPropertyNames(this);
    for (let i = 0; i < x.length; i++) {
        this.addInfoToCard(x[i], card);
    }

    card.appendChild(this.createBtn('remove'));
    card.appendChild(this.createBtn('toggle'));
    shelf.appendChild(card);
    this.bookCard = card;
}

Book.prototype.changeCardInfo = function(property, card) {

}

Book.prototype.addInfoToCard = function(property, card) {
    let p = document.createElement('p');

    if (property === 'pages') {
        p.className = property;
        p.innerHTML = this[property] + ' pages';
    }
    else if (property === 'didRead') {
        p.className = 'readStatus';
        p.innerHTML = this[property] ? 'finished' : 'unfinished';
    }
    else {
        p.className = property;
        p.innerHTML = this[property];
    }

    return card.appendChild(p);
}

Book.prototype.removeBookFromLibrary = function() {
    return theLibrary.splice(theLibrary.indexOf(this), 1);
}

Book.prototype.createBtn = function (btnValue) {
    let btn = document.createElement('input');
    let thisBook = this;
    btn.type = 'button';
    btn.value = btnValue;
    btn.className = 'book-card-btn';

    btn.addEventListener('click', function() {
        if (btn.value === 'remove') {
            let bookIndex = theLibrary.indexOf(thisBook);
            let bookNode = document.querySelector(`[data-index='${bookIndex}']`)
            document.querySelector('.card').parentNode.removeChild(bookNode);
            theLibrary.splice(bookIndex, 1);
        }
        else if (btn.value === 'toggle') {
            thisBook.toggleReadStatus();
            thisBook.setReadStatusText();
        }
        else {
            console.log('no function for button value');
        }
    });

    return btn;
}

Book.prototype.toggleReadStatus = function() {
    this.didRead = !this.didRead;
}

Book.prototype.setReadStatusText = function () {
    this.bookCard.querySelector('p.readStatus').innerHTML = this.getReadStatus() ? 'finished' : 'unfinished';
}

Book.prototype.getReadStatus = function() {
    return this.didRead;
}

Book.prototype.getBookCard = function() {
    return document.querySelector(`[data-index="${theLibrary.indexOf(this)}"]`);
}

Book.prototype.isInLibrary = function() {
    return theLibrary.includes(this);
}

Book.prototype.addToLibrary = function() {
    if (!this.isInLibrary()) {
        theLibrary.push(this);
        this.createBookCard();
    }
    else {
        'this book is already in the library!';
    }

    return this;
}

function printLibrary() {
    theLibrary.forEach(book => {
        console.log(book);
    });
}

//-----------------------------------------------/
// DOM manipulation functions

function addBookButton() {
    let x = document.getElementById('add-book-form');
    let info = [];

    for (let i = 0; i < x.length; i++) {
        
        if (x[i].type === 'text') {
            info.push(x[i].value);
        }
        else if (x[i].type === 'radio' && x[i].checked) {
            info.push(x[i].value === 'yes' ? true : false);
        }
        else {
            //console.log('no input was given');
        }
    }

    if (!info.includes('')) {
        let b = new Book(info[0], info[1], info[2], info[3]);
        console.log(b.addToLibrary());
    }
    /*else {
        console.log('at least one of the fields is empty');
    }*/

    document.getElementById('book-form').style.display = 'none';
    document.getElementById('add-btn').style.display = 'block';
}

function openBookForm() {
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('add-book-form').reset();
}