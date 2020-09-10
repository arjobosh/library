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
    //console.log(book);
});

