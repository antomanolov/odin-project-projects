function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false


}
let library = [];

const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pagesCnt');
const isRead = document.querySelector('#read');
const button = document.querySelector('.submit-btn');
// err msg
const bookTitleErr = document.querySelector('.err-booktitle');
const bookAuthorErr = document.querySelector('.err-author');
const bookPagesErr = document.querySelector('.err-pages');

const addBook = document.querySelector('.add-book img');
const addForm = document.querySelector('.form');
const bookForm = document.querySelector('#bookform');

const removeBtn = document.querySelector('.delete-btn');

button.addEventListener('click', (e) => {
    e.preventDefault()


    if (bookTitle.value && bookAuthor.value && bookPages.value) {
        addForm.style.display = 'none'
        let readed = isRead.checked
        makeBook(bookTitle.value, bookAuthor.value, bookPages.value, readed)
        bookAuthor.value = ''
        bookTitle.value = ''
        bookPages.value = ''
    } else {
        if(!bookTitle.value){
            bookTitleErr.textContent = 'Please enter a title'
            bookTitleErr.style.display = 'block'
        } else {
            bookTitleErr.style.display = 'none'
        }
        if(!bookAuthor.value) {
            bookAuthorErr.textContent = 'Please enter an author'
            bookAuthorErr.style.display = 'block'
        } else {
            bookAuthorErr.style.display = 'none'
        }
        if(!bookPages.value) {
            bookPagesErr.textContent = 'Please enter number of pages'
            bookPagesErr.style.display = 'block'
        }else {
            bookPagesErr.style.display = 'none'
        }
    }
})

if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.remove()

    })
}


addBook.addEventListener('click', () => {
    if (addBook.classList.contains('active')) {
        addForm.style.display = 'none'
        addBook.classList.remove('active')
    } else {
        addForm.style.display = 'block'
        addBook.classList.add('active')
    }

})

function makeBook(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead)
    library.push(book)
    loadBooks()
}

function loadBooks() {
    let bookDiv = document.createElement('div')
    
    let authorTitleDiv = document.createElement('div')
    let titleH2 = document.createElement('h2')
    let authorH3 = document.createElement('h3')

    let buttonsPagesDiv = document.createElement('div')
    let pagesDiv = document.createElement('div')
    let pagesP = document.createElement('p')
    let buttonsDiv = document.createElement('div')
    let buttonDel = document.createElement('button')
    let buttonRead = document.createElement('button')

    bookDiv.classList.add('book')

}


