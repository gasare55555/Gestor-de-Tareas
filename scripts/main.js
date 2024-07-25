    // Clase del Objeto Task: con propiedades y métodos específicos.
class Task {
    constructor(form) {
        this.title = form.get("title");
        this.description = form.get("description");
        this.dateStr = form.get("date");
        this.timeStr = form.get("time");
        [this.year, this.month, this.day] = this.processDate();
        [this.hour, this.minute] = this.processTime();
        this.dateObj = new Date(this.year, this.month-1, this.day, this.hour, this.minute);
        this.place = form.get("place");
        this.people = form.get("people");
        this.materials = form.get("materials");
        this.id = getRandomId();
    }
    
    processDate() {
        const dateArray = this.dateStr.split("-").map((element) => parseInt(element));
        return dateArray;
    }
    processTime() {
        const timeArray = this.timeStr.split(":").map((element) => parseInt(element));
        return timeArray;
    }
}

    // Función para crear objetos de tipo Task
function createTask(form) {
    const task = new Task(form);
    return task;
}

    // Función para añadir las tareas a tasks, ordenarlas y guardarlas en el storage
function addTask(task) {
    tasks.push(task);
    
    saveTasksStorage(tasks);
    taskForm.reset();  // Vaciamos el formulario con el método reset()
}

    // Función para borrar una tarea específica de acuerdo al id y actualizar storage
function deleteTask(id) {
    tasks.forEach((task, index) => {
        task.id === id && tasks.splice(index, 1);
        });

    saveTasksStorage(tasks); 
}

    // Función para actualizar el display de las tareas
function showTasks(tasks) {
    tasksContainer.innerHTML = '';  // Reseteamos el contenedor de las tareas 
    counter = -1; // Reseteamos el orden de los colores

    const div = document.createElement("div");
    div.className = "row g-md-4";
    tasks.forEach(task => {
        const color = traverseColors();  // Elegimos el siguiente color del array
        div.innerHTML += `
            <div class="col-lg-6">
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
        tasksContainer.appendChild(div);
    });
}

function saveTasksStorage (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksStorage () {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        // Para volver a convertir a objeto el string devuelto por JSON
        tasks.forEach((task) => task.dateObj = new Date(task.dateObj)); 
        showTasks(tasks);
    }
}

function getRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}


    // Listeners
    //Función para guardar tareas en tasks, en el storage y para actualizar display
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(taskForm);
    const task = createTask(form);
    addTask(task);
    showTasks(tasks);
});

    // Función para borrar tareas de tasks, del storage y para actualizar display
tasksContainer.addEventListener('click', (e) => {
    // Ejecuta solo si presionamos en el botón borrar. Para la propagación del evento en el bubbling phase.
    if (e.target.className.includes("btn")){
        deleteTask(e.target.id);
        showTasks(tasks);

        e.stopPropagation();  
    }
});

    // Función para recuperar los datos del storage y actualizar el display
document.addEventListener("DOMContentLoaded", getTasksStorage);
