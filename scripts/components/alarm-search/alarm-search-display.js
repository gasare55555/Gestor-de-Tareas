    // Imports
import { searchInput, onSearchSubmission, searchResult, searchSucceeded } from "./alarm-search.js";
import { isPlaying, stopPlayer, startPlayer, audioElements } from "./alarm-search-play.js";
import { spinner } from "../spin-loader.js";

    //Data
const spinnerContainer = document.getElementById("search-spinner-container");
export const carousel = document.getElementById("search-carousel");
const soundImage = document.getElementById("sound-image");
const soundTitle = document.getElementById("sound-title");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
export const navigationIndex = { value: 0 };
let navigationIsPossible = false;
let navigationLimit = 14;


    // Function to hide the search section and stop the current player (used in alarm-setup)
export function hideSearchSection() {
    if (!carousel.classList.contains("d-none")) {
        carousel.classList.add("d-none");
        carousel.classList.remove("show");
        searchInput.value = "";
    } 
}

export function showSpinner() {
    if (carousel.classList.contains("d-none")) {
        carousel.classList.remove("d-none");
        carousel.style.height = "225px";
        spinnerContainer.classList.remove("d-none");
        spinnerContainer.appendChild(spinner.el);
    } else {
        carousel.classList.remove("transition", "show");
        spinnerContainer.classList.remove("d-none");
        spinnerContainer.appendChild(spinner.el);
    }
}

export function hideSpinner() {
    if (searchSucceeded.value){
        if (carousel.classList.contains("d-none")) {
            spinnerContainer.classList.add("d-none");
            carousel.classList.add("show");
            carousel.style.height = "revert";
        } else {
            spinnerContainer.classList.add("d-none");
            carousel.classList.add("transition", "show"); 
        }
    } else {
        spinnerContainer.classList.add("d-none");
        carousel.classList.add("d-none");
        !carousel.classList.contains("transition") && carousel.classList.add("transition");
    }
}

    // Function to display search results in the carousel
export function showSearchSounds() {
    if (onSearchSubmission.value) {
        navigationIndex.value = 0;  // sets the index at initial position
        soundImage.src = searchResult.current.results[navigationIndex.value].images.waveform_m;
        soundImage.onload = () => {
            soundTitle.innerText = searchResult.current.results[navigationIndex.value].name;
        };
        window.scrollTo(0, window.scrollY + 300);
    } else {
        carousel.classList.remove("show");
        setTimeout(() => {
            carousel.classList.add("show");
        }, 250);  
        soundImage.src = searchResult.current.results[navigationIndex.value].images.waveform_m;
        soundImage.onload = () => {
            soundTitle.innerText = searchResult.current.results[navigationIndex.value].name;
        };
    }    
}

    // ------------------------ Listeners -----------------------------
    // Listener to show next result preview
nextButton.addEventListener("click", () => {
    searchResult.current.count < 15
        ? (navigationLimit = navigationIndex.value - 1) 
        : (navigationLimit = 14);
    navigationIsPossible = navigationIndex.value < navigationLimit;    
    if (navigationIsPossible) {
        stopPlayer();
        !isPlaying && (audioElements[navigationIndex.value].currentTime = 0);
        navigationIndex.value++;
        startPlayer();
        showSearchSounds();
    }
    console.log(navigationIndex.value);
});

    // Listener to show previous result preview
prevButton.addEventListener("click", () => {
    navigationIsPossible = navigationIndex.value > 0;    
    if (navigationIsPossible) {
        stopPlayer();
        !isPlaying && (audioElements[navigationIndex.value].currentTime = 0);
        navigationIndex.value--;
        startPlayer();
        showSearchSounds();
    }
    console.log(navigationIndex.value);
});