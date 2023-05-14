// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list protytype
UI.prototype.addBookToList = function(book) {
    // get book list table
    const list = document.getElementById('book-list');
    // create tr element called row
    const row = document.createElement('tr');
    // Insert cols to row using innerHTML
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    // Append row to list
    list.appendChild(row);
}

// UI clear fields protoype 
UI.prototype.clearFields = function() {
    title.value = '';
    author.value = '';
    isbn.value = '';
}

// Ui show alert prototype
UI.prototype.showAlert = function(message, className) {
    // Create a div element
    const div = document.createElement('div');
    // Add class list
    div.className = className;
    // Add text node
    div.appendChild(document.createTextNode(message));
    // Get the container
    const container = document.querySelector('.container');
    // Get the form element
    const form = document.querySelector('#book-form');
    // Insert div to the DOM
    container.insertBefore(div, form);

    // SetTimeOut
    setTimeout(function() {
        div.remove();
    }, 3000);
}

// Ui delete book prototype
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Store in local storage
function Store() {};

// Create getBooks prototype
Store.prototype.getBooks = function() {
    let bookList;
    if (localStorage.getItem('bookList') === null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem('bookList'));
    }
    return bookList;
}

// Create addBook prototype
Store.prototype.addBook = function(book) {
    // Instantiate the store object
    const store = new Store();

    const bookList = store.getBooks();
    bookList.push(book);

    localStorage.setItem('bookList', JSON.stringify(bookList));
}

// Create displayBooks prototype
Store.prototype.displayBooks = function() {
    // Instantiate the store object
    const store = new Store();

    const display = store.getBooks();

    display.forEach(function(book) {
        const ui = new UI();
        ui.addBookToList(book);
    });
}
// Create removeBook prototype
Store.prototype.removeBook = function() {
    // Instantiate the store object
    const store = new Store();

    const remove = store.getBooks();
    remove.forEach(function(book) {
        if (isbn) {
            remove.splice(book, 1);
        }
    });
    
    localStorage.setItem('bookList', JSON.stringify(remove));
}

// Add DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Instantiate the store object
    const store = new Store();

    store.displayBooks();
})

// Add Event Listener to the form to add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    // Instantiate the UI object
    const ui = new UI()

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        // Instantiate the book object
        const book = new Book(title, author, isbn);
        // Instantiate the store object
        const store = new Store();
        // Add book to list function call
        ui.addBookToList(book);
        // Store in local storage function call
        store.addBook(book);
        // Show alert when book is added
        ui.showAlert('Book added', 'success');
        // Clear Input field fuction call
        ui.clearFields();
    }

    e.preventDefault();
});

// Add event listener to book list to remove book
document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate the UI object
    const ui = new UI()
    // Instantiate the store object
    const store = new Store();
    // Delete book function call
    ui.deleteBook(e.target);
    // Remove from local storage
    store.removeBook(e.target.parentElement);
    // Show message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();
});
