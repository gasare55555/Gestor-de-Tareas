
function searchTasks() {
    let searchValue = searchInput.value;

    if (searchValue) {
        searchValue = searchValue.toLowerCase();
        const searchResult = tasks.filter((task) => {
            return task.title.toLowerCase().includes(searchValue) || task.description.toLowerCase().includes(searchValue) || task.dateObj.toLocaleDateString() == searchValue || convertMonth(task.month) == searchValue || task.year == searchValue || task.hour == searchValue || task.place.toLowerCase().includes(searchValue) || task.people.toLowerCase().includes(searchValue) || task.materials.toLowerCase().includes(searchValue)
        });

        searchInput.value = "";  // reseteamos el input
        searchResult.length == 0 ? alert("No hubieron coincidencias") :  showSearchResults(searchResult);           
    } else {
        alert("El valor ingresado no es correcto");
    }    
}

function showSearchResults(searchResult) {
    searchContainer.innerHTML = '';  // Reseteamos el contenedor de las tareas 
    counter = -1; // Reseteamos el orden de los colores
    searchResult.sort((taskA, taskB) => taskA.dateObj.getTime() - taskB.dateObj.getTime()); //ordenamos las tareas en orden cronológico

    searchResult.forEach(task => {
        const color = traverseColors();  // Elegimos el siguiente color del array
        searchContainer.innerHTML += `
            <div class="col-md-6 col-xl-4">
                <div class="card ${color} p-3 h-100 text-center">
                    <div class="card-body d-flex align-items-center w-100 px-4 py-0" style="height: 80%;">
                        <ul class="list-group list-group-flush w-100">
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Título</h5>
                                <p class="card-text">${task.title}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Descripción</h5>
                                <p class="card-text">${task.description}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Fecha</h5>
                                <p class="card-text">${task.dateObj.toLocaleDateString()}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Hora</h5>
                                <p class="card-text">${task.dateObj.toLocaleTimeString()}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Lugar</h5>
                                <p class="card-text">${task.place}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Personas</h5>
                                <p class="card-text">${task.people}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Materiales</h5>
                                <p class="card-text">${task.materials}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body w-100 px-4">
                        <button href="#" class="btn btn-light w-100" id="${task.id}" name="delete">Borrar</button>
                    </div>                    
                </div>
            </div>
        `;
        searchSection.appendChild(searchContainer);
    });
}

function convertMonth(monthNumber) {
    let monthStr = months.find((month, index) => index == (monthNumber - 1));
    return monthStr;
}

function getTasksStorage () {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        // Para volver a convertir a objeto el string devuelto por JSON
        tasks.forEach((task) => task.dateObj = new Date(task.dateObj)); 
    }
}

searchInput.addEventListener("keydown", (e) => {
    e.key == "Enter" && searchTasks();
});

    // Función para recuperar los datos del storage y actualizar el display
document.addEventListener("DOMContentLoaded", getTasksStorage);
