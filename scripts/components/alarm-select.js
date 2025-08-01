    //Imports
import { hideSearchSection } from "./alarm-search/alarm-search-display.js";
import { stopPlayer as stopSearchPlayer } from "./alarm-search/alarm-search-play.js";

    //Data
export const selectInput = document.getElementById("alarm-select-input");
export const selectIndex = { value: "" };
const selectOptions = [
    {id: 210612, description: "Beeping alarm sound"},
    {id: 128138, description: "Loud alarm sound"},
    {id: 679738, description: "Calm music alarm"},
    {id: 693304, description: "Natural alarm sound"},
    {id: 153316, description: "Please be alarmed"},
    {id: 579575, description: "Dance style alarm"},
    {id: 528648, description: "Beethoven style alarm"}
];
const soundInstances = [];
export const audioElements = document.getElementsByClassName("select-audio-element");
export const APIKEY = "WqH2tiQ4KnqLXBjOegB3JhanztNAGi7Z2V0E9zPP";


// ------------- Fetching and loading sounds ----------------
    // Function to perform multiple simultaneous fetch requests
export function startMultipleFetch() {
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
        soundInstances[index] = soundInstance;
        audioElements[index].src = soundUrl;
        console.log(soundInstance);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    // --------------- Player functions ------------------
export function fadeOutVolume(audioElement, duration) {
    return new Promise((resolve) => {
        const step = 0.05;
        const interval = duration * step / audioElement.volume;

        const id = setInterval(() => {
            audioElement.volume = Math.max(0, audioElement.volume - step);
            if (audioElement.volume <= 0) {
                clearInterval(id);
                resolve();
            }
        }, interval);
    });
}

    // Function to show and start player
function startPlayer() {
    if (selectIndex.value) {
        audioElements[selectIndex.value].controls = true;
        audioElements[selectIndex.value].play();
    }
}

    // Function to hide and stop player
export async function stopPlayer() {
    if (selectIndex.value) {
        const audioElement = audioElements[selectIndex.value];
        audioElement.controls = false;  
        if (!audioElement.paused) {
            await fadeOutVolume(audioElement, 1000);
            audioElement.pause();
            audioElement.volume = 1;
        }
        audioElement.currentTime = 0;
    }
}


    // ------------------------ Listeners -----------------------------
    // Listener to play the selected alarm sound and stop any previously playing sound
selectInput.addEventListener("change", (e) => {
    stopPlayer();  // hides and stops previous player
    stopSearchPlayer();
    hideSearchSection(); 
    selectIndex.value = e.target.value;  
    startPlayer();  // shows and starts new player
});