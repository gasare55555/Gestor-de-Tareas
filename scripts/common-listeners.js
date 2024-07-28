
    // Función para borrar tareas de tasks, del storage y para actualizar display
tasksContainer.addEventListener('click', (e) => {
    // Ejecuta solo si presionamos en el botón borrar y para la propagación del evento en el bubbling phase.
    if (e.target.className.includes("btn")){
        deleteTask(e.target.id);
        showTasks(tasks);

        e.stopPropagation();  
    }
});

    // Función para recuperar los datos del storage y actualizar el display
document.addEventListener("DOMContentLoaded", getTasksStorage);