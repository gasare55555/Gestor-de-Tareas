    // Imports
import { tasks } from "./task-management";

    // Data
const selectInput = document.getElementById("alarm-select-input");
const selectIndex = { value:  selectInput.value, };
const selectOptions = [
    {id: 210612, description: "Beeping alarm sound"},
    {id: 128138, description: "Loud alarm sound"},
    {id: 679738, description: "Calm music alarm"},
    {id: 693304, description: "Natural alarm sound"},
    {id: 153316, description: "Please be alarmed"},
    {id: 579575, description: "Dance style alarm"},
    {id: 528648, description: "Beethoven style alarm"}
];
const selectPlayer = {
    soundInstances: [],
    audioElements: document.getElementsByClassName("select-audio-element"),
};

    // --------------- Player functions ------------------
    // Function to show and start player
function startPlayer(selectPlayer, selectIndex) {
    selectPlayer.audioElements[selectIndex.value].controls = true;
    selectPlayer.audioElements[selectIndex.value].play();
}

    // Function to hide and stop player
export function stopPlayer() {
    if (selectIndex.value != "" && selectIndex.value != "personalizada") {
        selectPlayer.audioElements[selectIndex.value].controls = false;  
        selectPlayer.audioElements[selectIndex.value].pause();
        selectPlayer.audioElements[selectIndex.value].currentTime = 0;
    }
}

    // ------------- Fetching and loading sounds ----------------
    // Function to perform multiple simultaneous fetch requests
function startMultipleRequests(selectOptions) {
    selectOptions.forEach((selectOption, index) => {
        fetchSoundInstance(selectOption, index); 
    })
}

    // Function to fetch sound instances and load sounds into the audio elements
async function fetchSoundInstance(selectOption, index) {
    try {
        const response = await fetch(`https://freesound.org/apiv2/sounds/${selectOption.id}/?token=${APIKEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        } 
        const soundInstance = await response.json();
        const soundUrl = soundInstance.previews["preview-hq-mp3"];
        selectPlayer.soundInstances[index] = soundInstance;
        selectPlayer.audioElements[index].src = soundUrl;
        console.log(soundInstance);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    // -------------- Initializing alarms ------------------
    // Function to calculate the time at which the task alarm sounds
function calculateDelay(task) {
    return task.alarmDateObj.getTime() - Date.now();
}

    // Function to initialize the alarm for the newly added task
export function setAlarm(task) {
    if (task.alarmDateObj && calculateDelay(task) > 0) {
        setTimeout(() => {
            triggerAlarm(task);
        }, calculateDelay(task));
    }
}

    // Function to initialize all task alarms on DOM load
function setAlarms() {
    tasks.forEach((task) => {
        if (task.alarmDateObj && calculateDelay(task) > 0) {
            setTimeout(() => {
                triggerAlarm(task);
            }, calculateDelay(task));
        }
    });
}

    // Function to trigger a SweetAlert and play the alarm sound
function triggerAlarm(task) {
        task.alarmSelectValue && selectPlayer.audioElements[task.alarmSelectValue].play();
        
        Swal.fire({
            title: task.title,
            text: task.dateStr && task.timeStr && `El ${task.dateObj.toLocaleDateString()} a las ${task.dateObj.toLocaleTimeString()}`
        }).then(() => {
            if (task.alarmSelectValue) {
                selectPlayer.audioElements[task.alarmSelectValue].pause();
                selectPlayer.audioElements[task.alarmSelectValue].currentTime = 0;
            } 
        });
}





