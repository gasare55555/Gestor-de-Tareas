    // Imports
import { tasks } from "./task-management.js";
import { fadeOutVolume, audioElements as selectAudioElements } from "./alarm-select.js";

    // Data
const searchAlarmContainer = document.getElementById("search-alarm-container");


    // -------------- Initializing alarms ------------------
    // Function to calculate the time at which the task alarm sounds
function calculateDelay(task) {
    return task.alarmDateObj.getTime() - Date.now();
}

function checkAudioSource(task) {
    if (task.alarmSelectValue) {
        const audioElement = selectAudioElements[task.alarmSelectValue];
        return audioElement;
    } else if (task.alarmSearchResult) {
        const audioElement = document.createElement("audio");
        audioElement.src = task.alarmSearchResult.previews["preview-hq-mp3"];
        audioElement.className = "search-alarm-element"
        searchAlarmContainer.appendChild(audioElement);
        return audioElement;
    }
}

    // Function to initialize the alarm for the newly added task
export function setAlarm(task) {
    if (task.alarmDateObj && calculateDelay(task) > 0) {
        const audioElement = checkAudioSource(task);
        setTimeout(() => {
            triggerAlarm(task, audioElement);
        }, calculateDelay(task));
    }
}

    // Function to initialize all task alarms on DOM load
export function setAlarms() {
    tasks.forEach((task) => {
        if (task.alarmDateObj && calculateDelay(task) > 0) {
            const audioElement = checkAudioSource(task);
            setTimeout(() => {
                triggerAlarm(task, audioElement);
            }, calculateDelay(task));
        }
    });
}

    // Function to trigger a SweetAlert and play the alarm sound
function triggerAlarm(task, audioElement) {
    if (audioElement) {
        audioElement.loop = true;
        audioElement.play();
    }
    
    Swal.fire({
        title: task.title,
        text: task.dateStr && task.timeStr && `${task.dateObj.toLocaleDateString()} at ${task.dateObj.toLocaleTimeString()}`
    }).then(() => {
        if (audioElement) {
            fadeOutVolume(audioElement, 1000)
            .then(() => {
                audioElement.pause();
                audioElement.volume = 1;
                audioElement.currentTime = 0;
            });   
        } 
    });
}

