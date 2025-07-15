// Imports
import { showTasks } from "./task-display";
import { stopPlayer, setAlarm } from "./alarm-setup";

// Data
const formElement = document.getElementById('task-form');
let form = {};
let task = {};
export const tasks = [];

// Task Class: with specific properties and methods
class Task {
    constructor(form) {
        this.title = form.get("title");
        this.description = form.get("description");
        this.datetimeStr = form.get("datetime");
        this.dateStr = this.datetimeStr && this.datetimeStr.split("T")[0];
        this.timeStr = this.datetimeStr && this.datetimeStr.split("T")[1];
        [this.year, this.month, this.day] = this.dateStr && this.processDate();
        [this.hour, this.minute] = this.timeStr && this.processTime();
        this.dateObj = this.processDateObj();
        this.place = form.get("place");
        this.people = form.get("people");
        this.materials = form.get("materials");
        this.alarmDateTimeStr = form.get("alarm-datetime");
        this.alarmDateStr = this.alarmDateTimeStr && this.alarmDateTimeStr.split("T")[0];
        this.alarmTimeStr = this.alarmDateTimeStr && this.alarmDateTimeStr.split("T")[1];
        this.alarmDateObj = this.processAlarmDateObj();
        this.alarmSelectValue = form.get("alarm-select-input");
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
    processDateObj() {
        if (this.datetimeStr) {
            return new Date(this.datetimeStr);
        }
    }
    processAlarmDateObj() {
        if (this.alarmDateTimeStr) {
            return new Date(this.alarmDateTimeStr);
        }
    }
}

    // Function to create objects of the Task class
function createTask() {
    form = new FormData(formElement);
    task = new Task(form);
    formElement.reset();  // clears the form data using the reset() method
}

    // Function to add tasks to the "tasks" array, sort them, and save them to storage
function addTask() {
    tasks.push(task);
    saveTasksToStorage();
}

    // Function to delete a specific task by ID and update storage
export function deleteTask(id) {
    tasks.forEach((task, index) => {
        (task.id === id) && tasks.splice(index, 1);
        });
    saveTasksToStorage(); 
}

function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}

   // Listener para disparar la creación de tareas, guardarlas en tasks, en el storage y para actualizar display
formElement.addEventListener("submit", (e) => {
    e.preventDefault();  
    stopPlayer();  //stop sound from currently selected option  
    createTask();
    addTask();
    showTasks();
    setAlarm(task);
});
