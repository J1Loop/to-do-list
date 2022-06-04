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
    h3.innerText = `${pTarea.name}`

    let p = document.createElement('p');
    p.innerText = `${pTarea.info}`

    let iconosDiv = document.createElement('div');
    iconosDiv.innerHTML = `<i data-id="${pTarea.id}" class="fa-solid fa-check"></i>
                     <i data-id="${pTarea.id}" class="fa-solid fa-trash"></i>`


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
    li.append(textDiv, iconosDiv);
    ul.appendChild(li);
    pDom.appendChild(ul);
    console.log(pTarea);

}

printAllTareas(listaTareas, sectionTarea)

// Buscar semánticamente

searchInput.addEventListener('input', getSearch);

function getSearch(event) {
    // console.log(event.target.value);
    let search = event.target.value;
    printAllTareas(filterByName(listaTareas, search), sectionTarea)
}

// Filtrar

// Filtrado semántico

function filterByName(pList, pBusqueda) {
    return pList.filter(tarea => tarea.name.toLowerCase().includes(pBusqueda.toLowerCase()));
}

// Filtrado por prioridad

