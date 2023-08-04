function Book(title, author, pages, read=false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read


}
let library = [];
let dataNum = 0;

const bookCards = document.querySelector('.book-cards');

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
        if (!bookTitle.value) {
            bookTitleErr.textContent = 'Please enter a title'
            bookTitleErr.style.display = 'block'
        } else {
            bookTitleErr.style.display = 'none'
        }
        if (!bookAuthor.value) {
            bookAuthorErr.textContent = 'Please enter an author'
            bookAuthorErr.style.display = 'block'
        } else {
            bookAuthorErr.style.display = 'none'
        }
        if (!bookPages.value) {
            bookPagesErr.textContent = 'Please enter number of pages'
            bookPagesErr.style.display = 'block'
        } else {
            bookPagesErr.style.display = 'none'
        }
    }
})

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
    loadBook(book)
}

function loadBook(obj) {
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
    
    authorTitleDiv.classList.add('author-title')
    titleH2.textContent = obj.title
    authorH3.textContent = obj.author
    
    buttonsPagesDiv.classList.add('buttons-pages')
    pagesDiv.classList.add('pages')
    pagesP.textContent = `Pages: ${obj.pages}`
    buttonsDiv.classList.add('buttons')
    
    buttonDel.classList.add('btn', 'delete-btn', 'data-idx')
    buttonDel.addEventListener('click', (e)=> {
        console.log(library[e.target.dataset.idx].read)
        library[e.target.dataset.idx] = ''
        e.target.parentNode.parentNode.parentNode.remove()
    })
    buttonDel.textContent = 'Delete'
    
    buttonRead.classList.add('btn', 'read-btn')
    if(obj.read == true) {
        buttonRead.textContent = 'Unread'
    } else {
        buttonRead.textContent = 'Read'
    }
    buttonRead.addEventListener('click', (e)=>{
        if(library[e.target.dataset.idx].read == false) {
            e.target.textContent = 'Unread'
            library[e.target.dataset.idx].read = true
        } else {
            e.target.textContent = 'Read'
            library[e.target.dataset.idx].read = false
        }
    })

    if(dataNum == 0){
        buttonDel.dataset.idx = 0
        buttonRead.dataset.idx = 0
    } else {
        buttonDel.dataset.idx = dataNum
        buttonRead.dataset.idx = dataNum
    }

    authorTitleDiv.append(titleH2, authorH3)
    pagesDiv.appendChild(pagesP)
    buttonsDiv.append(buttonDel, buttonRead)
    buttonsPagesDiv.append(pagesDiv, buttonsDiv)

    bookDiv.append(authorTitleDiv, buttonsPagesDiv)
    bookCards.append(bookDiv)
    dataNum++
}




