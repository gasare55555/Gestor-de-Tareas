
    // Recursos globales comunes
let tasks = [];
const bootstrapColors = ["text-bg-primary", "text-bg-success", "text-bg-danger"];
let counterColors = -1;
let counterTasks = 0;

function traverseColors () {
    counterColors++;
    counterColors > 2 && (counterColors = 0);
    return bootstrapColors[counterColors];
}

function getTasksStorage () {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        // Para volver a convertir a objeto el string devuelto por JSON
        tasks.forEach((task) => task.dateObj = new Date(task.dateObj)); 
        document.title == "Gestor de Tareas" && showTasks(tasks);
    }
}



