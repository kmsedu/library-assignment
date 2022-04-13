let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.hasBeenRead = function() {
    return this.read = true ? `has been read` : `not yet read`;
}

Book.prototype.getInfo = function() {
    return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.hasBeenRead()}`;
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBook('TestBook', 'Kris Sach', 1337, true);

console.log(`${myLibrary[0].title} ${myLibrary[0].hasBeenRead()}.`);