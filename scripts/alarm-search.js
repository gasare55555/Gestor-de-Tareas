    // data
const searchInputGroup = document.getElementById("search-input-group");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
let searchResult = {};

const searchNavigation = {
    carousel: document.getElementById("search-carousel"),
    soundImage: document.getElementById("sound-image"),
    soundTitle: document.getElementById("sound-title"),
    nextButton: document.getElementsByClassName("carousel-control-next")[0],
    prevButton: document.getElementsByClassName("carousel-control-prev")[0],
    index: 0,
    atBoundary: false,
};

const searchPlayer = {
    playButton: document.getElementById("play-button"),
    audioContainer: document.getElementById("search-audio-container"),
    audioElements: [],
    isPlaying: false,
};

const APIKEY = "WqH2tiQ4KnqLXBjOegB3JhanztNAGi7Z2V0E9zPP";

    // Function to show search input
function showSearchInput() {
    searchInputGroup.classList.remove("d-none");
}

    // Function to hide the search section and stop the current player
function hideSearchSection() {
    searchInputGroup.classList.add("d-none");
    !searchNavigation.carousel.classList.contains("d-none") && searchNavigation.carousel.classList.add("d-none");
    if (searchPlayer.audioElements.length) {
        searchPlayer.audioElements[searchNavigation.index].pause();
        searchPlayer.audioElements[searchNavigation.index].currentTime = 0;
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
                if (searchPlayer.isPlaying) {
                    searchPlayer.audioElements[searchNavigation.index].pause();
                    searchPlayer.isPlaying = false;
                }
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
        <audio preload="none" src="${result.previews["preview-hq-mp3"]}" class="search-audio-element"></audio>`; 
    });
    searchPlayer.audioElements = document.getElementsByClassName("search-audio-element");
}

    // Function to display search results in the carousel
function showSearchSounds() {
    const scrollPosition = window.scrollY;
    if (searchNavigation.carousel.classList.contains("d-none")) {
        setTimeout(() => {
            searchNavigation.carousel.classList.remove("d-none");
        }, 300); 
    }
    if (!searchNavigation.carousel.classList.contains("d-none")) {
        searchNavigation.carousel.classList.add("d-none");
        setTimeout(() => {    
            searchNavigation.carousel.classList.remove("d-none");
            window.scrollTo(0, scrollPosition);
        }, 300); 
    }
    searchNavigation.soundImage.src = searchResult.results[searchNavigation.index].images.waveform_m;
    searchNavigation.soundTitle.innerText = searchResult.results[searchNavigation.index].name;
    searchNavigation.soundImage.onload = () => window.scrollTo(0, scrollPosition);
}