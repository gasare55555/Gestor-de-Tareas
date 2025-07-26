    // Imports
import { tasks, saveTasksToStorage } from "./task-management.js"; 

    // Data
const colors = ["text-bg-primary", "text-bg-success", "text-bg-danger"];
let color = "";
let colorCounter = 0;

const taskContainer = document.getElementById("task-container");
let taskCard = null;
let itemContainer = {};
let taskCounter = 0;


    // Function to delete a specific task by ID and update storage
function deleteTask(id) {
    tasks.forEach((task, index) => {
        (task.id === id) && tasks.splice(index, 1);
        });
    saveTasksToStorage(); 
}

    //Function to change card color
function traverseColors() {
    color = colors[colorCounter];
    colorCounter++;
    colorCounter > 2 && (colorCounter = 0);
}

    // Function to update the task display
export function showTasks() {
    taskContainer.innerHTML = '';  // clears the task container
    const div = document.createElement("div");
    div.className = "row g-md-4";
    taskContainer.appendChild(div);
    
    tasks.forEach(task => {
        traverseColors();  // selects the color from the array
        div.innerHTML += `
            <div class="col-lg-6">
                <div class="card ${color} p-3 h-100 text-center">
                    <div class="card-body d-flex align-items-center w-100 px-4 py-0" style="height: 80%;">
                        <ul class="list-group list-group-flush w-100">
                            <li class="list-group-item ${color}">
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">${task.title}</p>
                            </li>
        `;

        itemContainer = document.getElementsByClassName("list-group list-group-flush")[taskCounter];
        task.description && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Description</h5>
                                <p class="card-text">${task.description}</p>
                            </li>
        `);

        task.dateObj && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Date</h5>
                                <p class="card-text">${task.dateObj.toLocaleDateString()}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Time</h5>
                                <p class="card-text">${task.dateObj.toLocaleTimeString()}</p>
                            </li>
        `);

        task.place && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Place</h5>
                                <p class="card-text">${task.place}</p>
                            </li>
        `);

        task.people && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">People</h5>
                                <p class="card-text">${task.people}</p>
                            </li>
        `);

        task.materials && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Materials</h5>
                                <p class="card-text">${task.materials}</p>
                            </li>
        `);

        task.alarmDateObj && (itemContainer.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Alarm</h5>
                                <p class="card-text">${task.alarmDateObj.toLocaleString()}</p>
                            </li>
        `);

        taskCard = document.getElementsByClassName("card p-3 h-100")[taskCounter];
        taskCard.innerHTML += `
                    <div class="card-body w-100 px-4">
                        <button href="#" class="btn btn-light w-100" id="${task.id}" name="delete">Delete</button>
                    </div>                    
        `;  

        taskCounter++;  
    });

    taskCard && taskCard.scrollIntoView();  // scrolls to the latest task
    taskCounter = 0;
}

    // Listener to delete task from object and storage, and update the UI
taskContainer.addEventListener('click', (e) => {
    // Execute only if we click on delete button
    if (e.target.className.includes("btn")){
        deleteTask(e.target.id);
        showTasks(); 
    }
});