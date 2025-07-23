   // Imports
import { APIKEY } from "./alarm-setup.js";

   // Data
const searchInputGroup = document.getElementById("search-input-group");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
let searchResult = {};

const searchNavigation = {
    carousel: document.getElementById("search-carousel"),
    soundImage: document.getElementById("sound-image"),
    soundTitle: document.getElementById("sound-title"),
    nextButton: document.getElementById("next-button"),
    prevButton: document.getElementById("prev-button"),
    index: 0,
    isPossible: false,
    limit: 14,
};

const searchPlayer = {
    playButton: document.getElementById("play-button"),
    audioContainer: document.getElementById("search-audio-container"),
    audioElements: [],
    isPlaying: false,
};


    // Function to show search input (used in alarm-setup)
export function showSearchInput() {
    searchInputGroup.classList.remove("d-none");
    window.scrollTo(0, window.scrollY + 100);
}

    // Function to hide the search section and stop the current player (used in alarm-setup)
export function hideSearchSection() {
    searchInputGroup.classList.add("d-none");
    if (!searchNavigation.carousel.classList.contains("d-none")) {
        searchNavigation.carousel.classList.add("d-none");
        searchNavigation.carousel.classList.toggle("show");
        searchPlayer.isPlaying && stopPlayer();
    } 
    searchInput.value = "";
}

    // Function to fetch alarm sounds/info from API database and trigger load/display of results
async function searchAlarmSounds() {
    if (searchInput.value) {
        try {
            const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(searchInput.value)}&filter=duration:${encodeURIComponent("[* TO 120]")}&group_by_pack=1&fields=name,previews,images&token=${APIKEY}`);
            if (!response.ok) {
                throw new Error(`HTTP response is not ok, status: ${response.status}`);
            }
            searchResult = await response.json();
            console.log(searchResult);
            if (searchResult.count) {
                searchPlayer.isPlaying && stopPlayer();
                searchPlayer.audioContainer.innerHTML = "";  // clears previous audio elements
                searchNavigation.index = 0;  // sets the index at initial position
                loadSearchSounds();
                showSearchSounds();
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

    // Function to iterate over search results and load sounds into audio elements.
function loadSearchSounds() {
    searchResult.results.forEach((result) => {
        searchPlayer.audioContainer.innerHTML += `
        <audio preload="none" src="${result.previews["preview-hq-mp3"]}" class="search-audio-element" data-is-listener-added="false"></audio>`; 
    });
    searchPlayer.audioElements = document.getElementsByClassName("search-audio-element");
}

    // Function to display search results in the carousel
function showSearchSounds() {
    if (searchNavigation.carousel.classList.contains("d-none")) {
        searchNavigation.carousel.classList.remove("d-none");
        setTimeout(() => {
            searchNavigation.carousel.classList.toggle("show");
        }, 1000);  
    } else {
        searchNavigation.carousel.classList.toggle("show");
        setTimeout(() => {
            searchNavigation.carousel.classList.toggle("show");
        }, 250);   
    }

    searchNavigation.soundImage.src = searchResult.results[searchNavigation.index].images.waveform_m;
    searchNavigation.soundImage.onload = () => {
        searchNavigation.soundTitle.innerText = searchResult.results[searchNavigation.index].name;
        setTimeout(() => {
            window.scrollTo(0, window.scrollY + 300); 
        }, 300);   
    };
}

    // Function to start playback and switch the image to a pause icon
function startPlayer() {
    searchPlayer.playButton.src = "./assets/pause.png";
    searchPlayer.audioElements[searchNavigation.index].play();
    searchPlayer.isPlaying = true;
}

    // Function to pause playback and switch the image to a play icon.
function pausePlayer() {
    searchPlayer.playButton.src = "./assets/play.png";
    searchPlayer.audioElements[searchNavigation.index].pause();
    searchPlayer.isPlaying = false;
}

    // Function to stop playback and switch the image to a play icon.
function stopPlayer() {
    searchPlayer.playButton.src = "./assets/play.png";
    searchPlayer.audioElements[searchNavigation.index].pause();
    searchPlayer.audioElements[searchNavigation.index].currentTime = 0;
    searchPlayer.isPlaying = false;
}

    // ------------------------ Listeners -----------------------------
    // Listener to submit search input on Enter key
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchAlarmSounds();
    }
});

    // Listener to submit search input on click
searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    searchAlarmSounds();
});

    // Listener to play result previews on click
searchPlayer.playButton.addEventListener("click", () => {
    if (!searchPlayer.isPlaying) {
        startPlayer();
        if (searchPlayer.audioElements[searchNavigation.index].dataset.isListenerAdded === "false") {
            searchPlayer.audioElements[searchNavigation.index].addEventListener("ended", () => {
                searchPlayer.playButton.src = "./assets/play.png";
                searchPlayer.isPlaying = false;
            }); 
            searchPlayer.audioElements[searchNavigation.index].dataset.isListenerAdded = "true";
        }
    } else {
        pausePlayer();
    }  
});

    // Listener to show next result preview
searchNavigation.nextButton.addEventListener("click", () => {
    searchResult.count < 15
        ? (searchNavigation.limit = searchNavigation.index - 1) 
        : (searchNavigation.limit = 14);
    searchNavigation.isPossible = searchNavigation.index < searchNavigation.limit;    
    if (searchNavigation.isPossible) {
        searchPlayer.isPlaying && stopPlayer();
        searchNavigation.index++;
        showSearchSounds();
    }
    console.log(searchNavigation.index);
});

    // Listener to show previous result preview
searchNavigation.prevButton.addEventListener("click", () => {
    searchNavigation.isPossible = searchNavigation.index > 0;    
    if (searchNavigation.isPossible) {
        searchPlayer.isPlaying && stopPlayer();
        searchNavigation.index--;
        showSearchSounds();
    }
    console.log(searchNavigation.index);
});