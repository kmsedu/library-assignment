const libraryWindow = document.querySelector('.library');
const popUpWindow = document.querySelector('.pop-up');
const addBookForm = document.getElementById('add-book');
const addCard = document.querySelector('.add-card');

let libraryArray = [];

function Book(title, author, pages, read, language, isbn) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.language = language;
  this.isbn = isbn;
}

function Card(book) {
  this.book = book;
}

Card.prototype.getDiv = function() {

  const cardWrapper = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const cardAuthor = document.createElement('p');
  const cardPages = document.createElement('p');
  const cardLanguageDisplay = document.createElement('p');
  const cardIsbn = document.createElement('p');
  const cardToolSection = document.createElement('div');
  const cardDeleteButton = document.createElement('button');
  const cardReadButton = document.createElement('button');

  cardWrapper.classList.add('book');
  cardTitle.classList.add('book-title');
  cardAuthor.classList.add('book-author');
  cardPages.classList.add('pages-number');
  cardLanguageDisplay.classList.add('language-display');
  cardIsbn.classList.add('isbn-number');
  cardToolSection.classList.add('tool-section');
  cardDeleteButton.classList.add('hidden');
  cardDeleteButton.classList.add('delete-button');
  cardDeleteButton.classList.add('material-icons');
  cardReadButton.classList.add('read-button');
  cardReadButton.classList.add('material-icons-outlined');

  if (this.book.read == true) {
    cardReadButton.classList.add('been-read');
  } else {
    cardReadButton.classList.add('not-been-read');
  }

  cardTitle.textContent = `${this.book.title}`;
  cardAuthor.textContent = `by ${this.book.author}`;
  cardPages.textContent = `${this.book.pages} pages`;
  cardLanguageDisplay.textContent = `Language: ${this.book.language}`;
  cardIsbn.textContent = `ISBN-13: ${this.book.isbn}`;
  cardDeleteButton.textContent = `delete`;
  cardReadButton.textContent = `auto_stories`;

  cardReadButton.addEventListener('click', (e) => {
    if (e.target.classList[e.target.classList.length - 1] === 'been-read') {
      e.target.classList.remove('been-read');
      e.target.classList.add('not-been-read');
    } else {
      e.target.classList.remove('not-been-read');
      e.target.classList.add('been-read');
    };
  })

  cardDeleteButton.addEventListener('click', (e) => {
    if (confirm("Are you sure you want to delete this book?")) {e.path[2].remove()};
  })

  cardToolSection.appendChild(cardReadButton);
  cardToolSection.appendChild(cardDeleteButton);

  cardWrapper.appendChild(cardTitle);
  cardWrapper.appendChild(cardAuthor);
  cardWrapper.appendChild(cardPages);
  cardWrapper.appendChild(cardLanguageDisplay);
  cardWrapper.appendChild(cardIsbn);
  cardWrapper.appendChild(cardToolSection);

  cardWrapper.addEventListener('mouseenter', () => {
    cardDeleteButton.classList.remove('hidden');
  })

  cardWrapper.addEventListener('mouseleave', () => {
    cardDeleteButton.classList.add('hidden');
  })

  return cardWrapper;
}

Card.prototype.displayInWindow = function() {
  libraryWindow.insertBefore(this.getDiv(), libraryWindow.lastChild.previousSibling);
}

function hidePopUpWindow() {
  popUpWindow.style.visibility = 'hidden';
}

function showPopUpWindow() {
  popUpWindow.style.visibility = 'visible';
}

  popUpWindow.addEventListener('click', (event) => {
    const targetClass = event.target.classList[0];
    if (targetClass === 'pop-up' || targetClass === 'pop-up-close-button') {
      hidePopUpWindow();
    }
  })

  addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    let formValues = {};

    for (let pair of form.entries()) {
      formValues[pair[0]] = pair[1];
    }

    const newCard = new Card(new Book(formValues.title, 
                                      formValues.author, 
                                      formValues.pages, 
                                      formValues.read,
                                      formValues.language,
                                      formValues.isbn));

    newCard.displayInWindow();
    hidePopUpWindow();
    event.target.reset(); // Resets form and clears the data
  })

  addCard.addEventListener('click', showPopUpWindow);

  const testBook = new Book(`Harry Potter and the Philosopher's stone`, `J.K. Rowling`, 223, true, 'English', '0-7475-3269-9');
  const testCard = new Card(testBook);

  testCard.displayInWindow();