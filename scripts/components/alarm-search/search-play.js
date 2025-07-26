    // Imports
import { searchResult } from "./alarm-search.js";
import { navigationIndex } from "./search-display.js";

    // Data
const playButton = document.getElementById("play-button");
export const audioContainer = document.getElementById("search-audio-container");
let audioElements = [];
export const isPlaying = { value: false };

    // Function to iterate over search results and load sounds into audio elements.
export function loadSearchSounds() {
    searchResult.current.results.forEach((result) => {
        audioContainer.innerHTML += `
        <audio preload="none" src="${result.previews["preview-hq-mp3"]}" class="search-audio-element" data-is-listener-added="false"></audio>`; 
    });
    audioElements = document.getElementsByClassName("search-audio-element");
}

    // Function to start playback and switch the image to a pause icon
function startPlayer() {
    playButton.src = "./assets/pause.png";
    audioElements[navigationIndex.value].play();
    isPlaying.value = true;
}

    // Function to pause playback and switch the image to a play icon.
function pausePlayer() {
    playButton.src = "./assets/play.png";
    audioElements[navigationIndex.value].pause();
    isPlaying.value = false;
}

    // Function to stop playback and switch the image to a play icon.
export function stopPlayer() {
    playButton.src = "./assets/play.png";
    audioElements[navigationIndex.value].pause();
    audioElements[navigationIndex.value].currentTime = 0;
    isPlaying.value = false;
}

    // Listener to play result previews on click
playButton.addEventListener("click", () => {
    if (!isPlaying.value) {
        startPlayer();
        if (audioElements[navigationIndex.value].dataset.isListenerAdded === "false") {
            audioElements[navigationIndex.value].addEventListener("ended", () => {
                playButton.src = "./assets/play.png";
                isPlaying.value = false;
            }); 
            audioElements[navigationIndex.value].dataset.isListenerAdded = "true";
        }
    } else {
        pausePlayer();
    }  
});