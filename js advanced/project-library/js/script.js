const bookTitle = document.querySelector('#title')
const button = document.querySelector('button')

const addBook = document.querySelector('.add-book img')
const addForm = document.querySelector('.form')

button.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(bookTitle.value)
    bookTitle.value = ''

})

addBook.addEventListener('click', ()=>{
    if(addBook.classList.contains('active')){
        addForm.style.display = 'none'
        addBook.classList.remove('active')
    } else {
        addForm.style.display = 'block'
        addBook.classList.add('active')
    }
    
})