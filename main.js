// driver
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let lastWish = new Book('The Last Wish', 'Andrzej Sapkowski', 288, true);
let bloodOfElves = new Book('Blood of Elves', 'Andrzej Sapkowski', 320, true);
let timeOfContempt = new Book('Time of Contempt', 'Andrzej Sapkowski', 352, false);
let doAndroidsDream = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', 210, true);
let dune = new Book('Dune', 'Frank Herbert', 412, false);

let books = [theHobbit, lastWish, bloodOfElves, timeOfContempt, doAndroidsDream, dune];

books.forEach(book => {
    book.addToLibrary();
});

