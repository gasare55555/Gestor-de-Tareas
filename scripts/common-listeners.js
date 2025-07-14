
    // Listener para disparar la recuperación de los datos del storage y actualizar el display
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        // Para volver a convertir a objetos Date los strings devueltos por JSON
        tasks.forEach((task) => {
            if (task.dateObj) {
                task.dateObj = new Date(task.dateObj);
            }    
            if (task.alarmDateObj) {
                task.alarmDateObj = new Date(task.alarmDateObj);
            }  
        });
        
        document.title == "Gestor de Tareas" && showTasks(taskContainer, tasks, colorCounter, taskCounter);
        setAlarms(tasks, selectPlayer);
    }

    startMultipleRequests(selectOptions);  // para cargar los sonidos cada vez que inicie la página
});