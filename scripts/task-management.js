// Imports
import { showTasks } from "./task-display";
import { stopPlayer, setAlarm, setAlarms, startMultipleFetch } from "./alarm-setup";

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

export function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}

   // Listener to trigger task creation — saves to array and storage, updates display, and initializes alarms
formElement.addEventListener("submit", (e) => {
    e.preventDefault();  
    stopPlayer();  //stops sound from currently selected option  
    createTask();
    addTask();
    showTasks();
    setAlarm(task);
});

    // Listener to recover data from local storage, update display, init task alarms, and load alarm sounds in select input
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        tasks.push(...JSON.parse(localStorage.getItem("tasks")));
        // Re-convert date strings from JSON.parse back into Date objects
        tasks.forEach((task) => {
            if (task.dateObj) {
                task.dateObj = new Date(task.dateObj);
            }    
            if (task.alarmDateObj) {
                task.alarmDateObj = new Date(task.alarmDateObj);
            }  
        });
        
        document.title == "Task Manager" && showTasks();
        setAlarms();
    }

    startMultipleFetch();  // to load alarm sounds in select input
});
