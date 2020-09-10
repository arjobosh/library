
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

function addBookToLibrary(book) {
    return theLibrary.push(book);
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
        p.innerHTML = book[detailType] + ' pages';
    }
    else if (detailType == 'didRead') {
        p.className = p.innerHTML = book[detailType] ? 'finished' : 'unfinished';
    }
    else {
        p.className = detailType;
        p.innerHTML = book[detailType];
    }

    card.appendChild(p);
}

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
            console.log('no input was given');
        }
    }

    if (!info.includes('')) {
        let b = new Book(info[0], info[1], info[2], info[3]);
        addBookToLibrary(b);
        appendBookCard(b);
        //console.log(b);
    }
    else {
        console.log('at least one of the fields is empty');
    }

    document.getElementById('book-form').style.display = 'none';
    document.getElementById('add-btn').style.display = 'block';
    
}

function openBookForm() {
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('add-btn').style.display = 'none';
}