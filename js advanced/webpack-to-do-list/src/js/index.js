import '../css/style.css';

const expandBtn = document.querySelector('.expand');
const middlePart = document.querySelector('.middle');
const container = document.querySelector('.container');
const iconArrow = document.querySelector('i');
const addBtn = document.querySelector('.add')
const formModal = document.querySelector('.form-modal')
const addProjectBtn = document.querySelector('.add-project-btn')
const addNoteBtn = document.querySelector('.add-task-btn')
const chooseBtns = document.querySelector('.choose')
const addTask = document.querySelector('.add-task')
const addProject = document.querySelector('.add-project')
const submitBtn = document.querySelector('#submit-btn')

const todosDiv = document.querySelector('.todo-projects')
const notesDiv = document.querySelector('.notes-projects')

const selectProject = document.getElementById("project2")

class Note {
    constructor(title, type, project, description) {
        this.title = title
        this.type = type
        this.project = project
        this.description = description
    }
}


function hiddenStyle(el) {
    el.classList.toggle('hidden')
    if(el.classList.contains('hidden')){
        el.style.display = 'none'
    } else{
        el.style.display = 'block'
    }
}

function refreshPanels() {
    todosDiv.textContent = ''
    notesDiv.textContent = ''
    selectProject.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        const h2 = document.createElement('h2')
        const opt = document.createElement('option')
        opt.value = localStorage.getItem(key)
        opt.textContent = localStorage.getItem(key)
        h2.style.cursor = 'pointer'
        h2.textContent = localStorage.getItem(key)
        
        if(key.includes('notes')) {
            h2.classList.add('note')
            notesDiv.appendChild(h2)
        } else {
            h2.classList.add('todo')
            todosDiv.appendChild(h2)
        }
        selectProject.appendChild(opt)
    }
    const allNotesProjects = document.querySelectorAll('h2')
    allNotesProjects.forEach (el => {
        el.addEventListener('click', () => {
            console.log(el.textContent)
        })
    })
}

expandBtn.addEventListener('click', () => {
    expandBtn.classList.toggle('expanded')
    
    
    if (expandBtn.classList.contains('expanded')) {
        middlePart.style.height = '100vh';
        container.style.width = '80%'
        addBtn.style.left = '3rem';
        addBtn.style.top = '50%'
        iconArrow.classList.remove('fi-rs-angle-small-up')
        iconArrow.classList.add('fi-rs-angle-small-down')
        return true
    }
    iconArrow.classList.remove('fi-rs-angle-small-down')
    iconArrow.classList.add('fi-rs-angle-small-up')
    addBtn.style.top = '15%'
    addBtn.style.left = '48%'
    container.style.width = '60%'
    middlePart.style.height = '32rem';
})

addBtn.addEventListener('click', () => {
    hiddenStyle(chooseBtns)
    hiddenStyle(formModal)
    if (!addTask.classList.contains('hidden')){
        hiddenStyle(addTask)
        
    }  
    if(!addProject.classList.contains('hidden')) {
        hiddenStyle(addProject)
    }
    if(!submitBtn.classList.contains('hidden')) {
        hiddenStyle(submitBtn)
    }
})

// adding new notes

addNoteBtn.addEventListener('click', (e) => {
    e.preventDefault()
    
    refreshPanels()
    if (!addProject.classList.contains('hidden')){
        hiddenStyle(addProject)
        hiddenStyle(submitBtn)
    }
    hiddenStyle(addTask)
    hiddenStyle(submitBtn)
    formModal.style.height = 'fit-content';

})

// adding new project

addProjectBtn.addEventListener('click', e => {
    e.preventDefault()
    if(!addTask.classList.contains('hidden')){
        hiddenStyle(addTask)
        hiddenStyle(submitBtn)
    }
    hiddenStyle(addProject)
    hiddenStyle(submitBtn)
    formModal.style.height = 'fit-content';
    document.getElementById("add-form").addEventListener('submit', function (event) {
        event.preventDefault()
        const projectType = document.querySelector('#type').value
        const projectName = document.getElementById('project1').value
        localStorage.setItem(`${projectType}-${projectName}- project`, `${projectName}`)
        refreshPanels()
        hiddenStyle(formModal)
        hiddenStyle(chooseBtns)
    })
})


refreshPanels()