
    // Variables globales
let tasks = [];
const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const bootstrapColors = ["text-bg-primary", "text-bg-success", "text-bg-danger"];
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById("tasks-container");
const searchInput = document.getElementById("search-input");
const searchContainer = document.getElementById("search-container");
const searchSection = document.getElementById("search-section");
let counter = -1;

function traverseColors () {
    counter++;
    counter > 2 && (counter = 0);
    return bootstrapColors[counter];
}




