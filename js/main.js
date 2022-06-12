// Capturar elementos del DOM con los que interactuar:
const searchInput = document.querySelector('#search-input');
const prioritySelect = document.querySelector('#priority-select');
const addInput = document.querySelector('#add-input');
const sectionTarea = document.querySelector('#list-tarea');
const obligatorios = document.querySelector('#obligatorios');

// Pintar lista de tareas:
function printAllTareas(pList, pDom) {
    if (pList.length !== 0) {
        pDom.innerHTML = '';
        pList.forEach(tarea => printOneTarea(tarea, pDom));
    } else {
        pDom.innerHTML = `<h4>NO HAY TAREAS EN LA LISTA</h4>`
    }
}

function printOneTarea(pTarea, pDom) {


    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let textDiv = document.createElement('div');

    let h3 = document.createElement('h3');
    h3.innerText = `${pTarea.name}`;

    let iconosDiv = document.createElement('div');
    let trash = document.createElement('i');
    trash.classList.add('fa-solid', 'fa-trash');
    trash.dataset.id = pTarea.id;
    trash.addEventListener('click', deleteTarea);

    // iconosDiv.innerHTML = `
    // <i data-id="${pTarea.id}" class="fa-solid fa-trash"></i>
    // `;



    switch (pTarea.priority) {

        case 1:
            li.classList.add('urgente');
            break;
        case 2:
            li.classList.add('diaria');
            break;
        case 3:
            li.classList.add('semanal');
            break;
        case 4:
            li.classList.add('mensual');
            break;
    }

    textDiv.appendChild(h3);
    iconosDiv.appendChild(trash);
    li.append(textDiv, iconosDiv);
    ul.appendChild(li);
    pDom.appendChild(ul);
}
printAllTareas(listaTareas, sectionTarea);

// Buscar semánticamente

searchInput.addEventListener('input', getSearch);

function getSearch(event) {
    // console.log(event.target.value);
    let search = event.target.value;
    printAllTareas(filterByName(listaTareas, search), sectionTarea);
}

// Filtrar

// Filtrado semántico

function filterByName(pList, pBusqueda) {
    return pList.filter(tarea => tarea.name.toLowerCase().includes(pBusqueda.toLowerCase()));
}

// Filtrado por prioridad
prioritySelect.addEventListener('input', filterByPriority);

function filterByPriority(event) {
    // console.log(event.target);

    return listaTareas.filter(tarea => tarea.priority === parseInt(event.target.value));
}
// console.log(prioritySelect);

// Otro filtrado IGUAL para poder pasarle parámetros y no tener que hacer evento custom
function filterByPrio(pList, pPriority) {
    return pList.filter(tarea => tarea.priority === parseInt(pPriority));
}

prioritySelect.addEventListener('input', getPriority);

function getPriority(event) {
    // console.log(event.target.value);
    let priority = event.target.value;
    if (priority !== '0') {
        printAllTareas(filterByPrio(listaTareas, priority), sectionTarea);
    } else {
        printAllTareas(listaTareas, sectionTarea);
    }
}

// Añadir y borrar

// Añadir
let span = document.createElement('span');
span.innerText = 'Los campos no pueden estar vacíos.';
span.style.color = 'red';
obligatorios.appendChild(span);
span.style.display = 'none';

addInput.addEventListener('keydown', addTarea);

function addTarea(event) {
    // console.log(event.target.value); // envía lo anterior al "enter"
    let lastID = 5; // a 5 porque nuestro array original tiene 4, luego le sumamos.
    let storageID = localStorage.getItem('lastID');
    if (storageID) {
        lastID = JSON.parse(localStorage.getItem('lastID'));
    }

    if (event.keyCode === 13 && prioritySelect.value !== '0' && addInput.value !== '') {

        let newTarea =
        {
            id: lastID,
            name: event.target.value,
            priority: parseInt(prioritySelect.value),
        };

        listaTareas.push(newTarea);
        lastID++;
        addInput.value = '';
        searchInput.value = '';
        printAllTareas(filterByPrio(listaTareas, newTarea.priority), sectionTarea)

        // Local Storage
        // console.log(listaTareas);

        localStorage.setItem('tareas', JSON.stringify(listaTareas));
        localStorage.setItem('lastID', JSON.stringify(lastID));
    } else if (event.keyCode === 13 && (addInput.value === '' || prioritySelect.value === '0')) {
        // console.log(obligatorios);
        span.style.display = 'block';
        setTimeout(() => {
            span.style.display = 'none';
        }, 2500)
    }
}

// Borrar

function deleteTarea(event) {

    // console.log(event.target.dataset.id);

    let posicionBusqueda = listaTareas.findIndex(tarea => tarea.id === parseInt(event.target.dataset.id));

    // console.log(posicionBusqueda);

    listaTareas.splice(posicionBusqueda, 1);
    printAllTareas(listaTareas, sectionTarea);
    addInput.value = '';
    searchInput.value = '';

    // Local Storage

    localStorage.setItem('tareas', JSON.stringify(listaTareas));
}

// Local Storage
let storage = localStorage.getItem('tareas');

if (storage) {
    listaTareas = JSON.parse(localStorage.getItem('tareas'));
    printAllTareas(listaTareas, sectionTarea);
}


