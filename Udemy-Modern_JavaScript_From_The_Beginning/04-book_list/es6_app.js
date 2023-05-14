// Rewriting the book-list app using ES6 features

// Create the book list class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Create the UI class
class UI {
    // Create addBookToList constructor function
    addBookToList(book) {
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

    // Create showAlert construtor function
    showAlert(message, className) {
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

    // Create deleteBook constructor function
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // Create clearFields constructor function
    clearFields() {
        title.value = '';
        author.value = '';
        isbn.value = '';
    }
}

// Create Store class
 class Store {
    static getBooks() {
        let bookList;
        if (localStorage.getItem('bookList') === null) {
            bookList = [];
        }
        else {
            bookList = JSON.parse(localStorage.getItem('bookList'));
        }
        return bookList;
    }

    static addBook(book) {
        const bookList = Store.getBooks();
        bookList.push(book);

        localStorage.setItem('bookList', JSON.stringify(bookList));
    }

    static displayBooks() {
        const display = Store.getBooks();

        // display.forEach(book => {
        //     const ui = new UI();
        //     ui.addBookToList(book);
        // });

        // Using for of loop
        for (let book of display) {
            const ui = new UI();
            ui.addBookToList(book); 
        }
    }


    static removeBook(isbn) {
        const remove = Store.getBooks();

        remove.forEach(book => {
            if (isbn) {
                remove.splice(book, 1);
            }
        });
        
        localStorage.setItem('bookList', JSON.stringify(remove));
    }
}

// Add DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add Event Listener to the form to add book
document.getElementById('book-form').addEventListener('submit', (e) => {
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
        // Add book to list function call
        ui.addBookToList(book);
        // Store in local storage function call
        Store.addBook(book);
        // Show alert when book is added
        ui.showAlert('Book added', 'success');
        // Clear Input field fuction call
        ui.clearFields();
    }

    e.preventDefault();
});

// Add event listener to book list to remove book
document.getElementById('book-list').addEventListener('click', (e) => {
    // Instantiate the UI object
    const ui = new UI()
    // Delete book function call
    ui.deleteBook(e.target);
    // Remove from local storage
    Store.removeBook(e.target.parentElement);
    // Show message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();
});
