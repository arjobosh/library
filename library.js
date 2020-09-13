//-----------------------------------------------/
// library functions

const theLibrary = [];
const shelf = document.getElementById('shelf');

// book constructor
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.readStatus ? 'read' : 'not read');
}

Book.prototype.createBookCard = function() {
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', theLibrary.indexOf(this));

    let x = Object.getOwnPropertyNames(this);
    for (let i = 0; i < x.length; i++) {
        this.addInfoToCard(x[i], card);
    }

    card.querySelector('p.readStatus').appendChild(this.createBtn('toggle'));
    //card.appendChild(this.createBtn('toggle'));
    card.appendChild(this.createBtn('remove'));
    
    shelf.appendChild(card);
    this.bookCard = card;
}

Book.prototype.addInfoToCard = function(property, card) {
    let p = document.createElement('p');

    if (property === 'pages') {
        p.className = property;
        p.innerHTML = this[property] + ' pages';
    }
    else if (property === 'readStatus') {
        p.className = 'readStatus';
        p.style.display = 'flex';
        p.style.alignItems = 'center';
        p.style.justifyContent = 'center';
        
        if (this[property]) {
            p.style.color = 'darkgreen';
            p.innerHTML = 'completed';
        }
        else {
            p.style.color = 'darkred';
            p.innerHTML = 'uncompleted'
        }
    }
    else {
        p.className = property;
        p.innerHTML = this[property];
    }

    return card.appendChild(p);
}

Book.prototype.createBtn = function (btnValue) {
    let btn = document.createElement('input');
    let thisBook = this;
    
    if (btnValue === 'toggle') {
        btn.value = '';
        btn.style.width = '20px';
    }
    else if (btnValue === 'remove') {
        btn.value = btnValue;
        btn.style.backgroundColor = 'rgba(255, 61, 61, 0.9)';
        btn.style.border = '1px solid black';
    }
    else {
        // other button type
    }

    btn.type = 'button';
    btn.className = 'book-card btn';
    
    btn.style.margin = '0 5px';

    btn.addEventListener('click', function() {
        if (btnValue == 'remove') {
            let bookIndex = thisBook.bookCard.getAttribute('data-index');
            let bookNode = document.querySelector(`.card[data-index='${bookIndex}']`);
            
            document.querySelector('.card').parentNode.removeChild(bookNode);
            
            theLibrary.splice(theLibrary.indexOf(thisBook), 1);
        }
        else if (btnValue == 'toggle') {
            thisBook.toggleReadStatus();
            thisBook.setReadStatusText();
        }
        else {
            console.error('no function for input type');
        }

        console.log(theLibrary);
    });

    return btn;
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = !this.readStatus;
}

Book.prototype.setReadStatusText = function () {
    let readStatusNode = this.bookCard.querySelector('p.readStatus');

    if (this.getReadStatus()) {
        readStatusNode.style.color = 'darkgreen';
        readStatusNode.innerHTML = 'completed';
    }
    else {
        readStatusNode.style.color = 'darkred';
        readStatusNode.innerHTML = 'uncompleted';
    }

    readStatusNode.appendChild(this.createBtn('toggle'));
}

Book.prototype.getReadStatus = function() {
    return this.readStatus;
}

Book.prototype.getBookCard = function() {
    return document.querySelector(`[data-index="${theLibrary.indexOf(this)}"]`);
}

Book.prototype.removeBookFromLibrary = function() {
    return theLibrary.splice(theLibrary.indexOf(this), 1);
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
        console.error('this book is already in the library!');
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
            //console.error('no input was given');
        }
    }

    if (!info.includes('')) {
        let b = new Book(info[0], info[1], info[2], info[3]);
        b.addToLibrary();
    }
    else {
        //console.error('at least one of the fields is empty');
    }

    document.getElementById('book-form').style.display = 'none';
    document.getElementById('add-btn').style.display = 'block';
}

function openBookForm() {
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('add-book-form').reset();
}