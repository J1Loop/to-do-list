// Capturar elementos del DOM con los que interactuar:
const searchInput = document.querySelector('#search-input');
const prioritySelect = document.querySelector('#priority-select');
const addInput = document.querySelector('#add-input');
const sectionTarea = document.querySelector('#list-tarea')

// Pintar lista de tareas:
function printAllTareas(pList, pDom) {

    pDom.innerHTML = '';
    pList.forEach(tarea => printOneTarea(tarea, pDom));
}

function printOneTarea(pTarea, pDom) {


    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let textDiv = document.createElement('div');

    let h3 = document.createElement('h3');
    h3.innerText = `${pTarea.name}`;

    let p = document.createElement('p');
    p.innerText = `${pTarea.info}`;

    let iconosDiv = document.createElement('div');
    let check = document.createElement('i');
    check.classList.add('fa-solid', 'fa-check');
    check.dataset.id = pTarea.id;
    let trash = document.createElement('i');
    trash.classList.add('fa-solid', 'fa-trash');
    trash.dataset.id = pTarea.id;
    trash.addEventListener('click', deleteTarea);

    // iconosDiv.innerHTML = `
    // <i data-id="${pTarea.id}" class="fa-solid fa-check"></i>
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

    textDiv.append(h3, p);
    iconosDiv.append(check, trash);
    li.append(textDiv, iconosDiv);
    ul.appendChild(li);
    pDom.appendChild(ul);
    // console.log(pTarea);

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

addInput.addEventListener('keydown', addTarea);

function addTarea(event) {

    // console.log(event.target.value); // envía lo anterior al "enter"

    if (event.keyCode === 13 && prioritySelect.value !== '0' && addInput.value !== '') {
        let id = listaTareas[listaTareas.length - 1].id + 1;
        let newTarea =
        {
            id: id,
            name: event.target.value,
            info: '',
            priority: parseInt(prioritySelect.value),
        };

        listaTareas.push(newTarea);
        printAllTareas(filterByPrio(listaTareas, newTarea.priority), sectionTarea)
        // console.log(listaTareas);

    }
}

// Borrar

function deleteTarea(event) {

    // console.log(event.target.dataset.id);

    let posicionBusqueda = listaTareas.findIndex(tarea => tarea.id === parseInt(event.target.dataset.id));

    // console.log(posicionBusqueda);

    listaTareas.splice(posicionBusqueda, 1);
    printAllTareas(listaTareas, sectionTarea);

}
