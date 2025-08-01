    // Imports
import { searchResult } from "./alarm-search.js";
import { navigationIndex } from "./alarm-search-display.js";
import { fadeOutVolume } from "../alarm-select.js";

    // Data
const playButton = document.getElementById("play-button");
export const audioContainer = document.getElementById("search-audio-container");
export const audioElements = [];
export const isPlaying = { value: false };


    // Function to iterate over search results and load sounds into audio elements.
export function loadSearchSounds() {
    audioContainer.innerHTML = "";  // clears previous audio elements
    searchResult.current.results.forEach((result) => {
        audioContainer.innerHTML += `
        <audio preload="none" src="${result.previews["preview-hq-mp3"]}" class="search-audio-element" data-is-listener-added="false"></audio>`; 
    });
    audioElements.length = 0;
    audioElements.push(...document.querySelectorAll(".search-audio-element"));
}

    // Function to start playback and switch the image to a pause icon
export function startPlayer() {
    playButton.src = "./assets/pause.png";
    audioElements[navigationIndex.value].play();
    isPlaying.value = true;
    if (audioElements[navigationIndex.value].dataset.isListenerAdded === "false") {
            audioElements[navigationIndex.value].addEventListener("ended", () => {
                playButton.src = "./assets/play.png";
                isPlaying.value = false;
            }); 
            audioElements[navigationIndex.value].dataset.isListenerAdded = "true";
        }
}

    // Function to pause playback and switch the image to a play icon.
function pausePlayer() {
    playButton.src = "./assets/play.png";
    audioElements[navigationIndex.value].pause();
    isPlaying.value = false;
}

    // Function to stop playback and switch the image to a play icon.
export async function stopPlayer() {
    if (isPlaying.value) {
        playButton.src = "./assets/play.png";
        const audioElement = audioElements[navigationIndex.value];
        isPlaying.value = false;
        await fadeOutVolume(audioElement, 700);
        audioElement.pause();
        audioElement.volume = 1;
        audioElement.currentTime = 0;
    }
}

    // ------------------------ Listeners -----------------------------
    // Listener to play result previews on click
playButton.addEventListener("click", () => {
    !isPlaying.value ? startPlayer() : pausePlayer() 
});