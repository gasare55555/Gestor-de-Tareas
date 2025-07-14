    // data
export const searchInputGroup = document.getElementById("search-input-group");
export const searchInput = document.getElementById("search-input");
export const searchSubmit = document.getElementById("search-submit");
export const searchResult = { data: {} };

export const searchNavigation = {
    carousel: document.getElementById("search-carousel"),
    soundImage: document.getElementById("sound-image"),
    soundTitle: document.getElementById("sound-title"),
    nextButton: document.getElementsByClassName("carousel-control-next")[0],
    prevButton: document.getElementsByClassName("carousel-control-prev")[0],
    index: 0,
    atBoundary: false,
};

export const searchPlayer = {
    playButton: document.getElementById("play-button"),
    audioContainer: document.getElementById("search-audio-container"),
    audioElements: [],
    isPlaying: false,
};

export const APIKEY = "WqH2tiQ4KnqLXBjOegB3JhanztNAGi7Z2V0E9zPP";

    // Function to show search input
export function showSearchInput(searchInputGroup) {
    searchInputGroup.classList.remove("d-none");
}

    // Function to hide the search section and stop the current player
export function hideSearchSection(searchInputGroup, searchNavigation, searchPlayer, searchInput) {
    searchInputGroup.classList.add("d-none");
    !searchNavigation.carousel.classList.contains("d-none") && searchNavigation.carousel.classList.add("d-none");
    if (searchPlayer.audioElements.length) {
        searchPlayer.audioElements[searchNavigation.index].pause();
        searchPlayer.audioElements[searchNavigation.index].currentTime = 0;
    }
    searchInput.value = "";
}

    // Function to fetch alarm sounds/info from search input and trigger load/display of results
export async function searchAlarmSounds(searchInput, apiKEY, searchResult, searchPlayer, searchNavigation) {
    if (searchInput.value) {
        try {
            const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(searchInput.value)}&filter=duration:${encodeURIComponent("[* TO 120]")}&group_by_pack=1&fields=name,previews,images&token=${apiKEY}`);
            if (!response.ok) {
                throw new Error(`HTTP response is not ok, status: ${response.status}`);
            }
            searchResult.data = await response.json();
            console.log(searchResult.data);
            if (searchResult.data.count) {
                if (searchPlayer.isPlaying) {
                    searchPlayer.audioElements[searchNavigation.index].pause();
                    searchPlayer.isPlaying = false;
                }
                searchPlayer.audioContainer.innerHTML = "";  // clears previous sounds
                searchNavigation.index = 0;  // sets the index at initial position
                loadSearchSounds(searchResult, searchPlayer);
                showSearchSounds(searchNavigation, searchResult);
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

    // Function to iterate over search results and load sounds into audio elements.
export function loadSearchSounds(searchResult, searchPlayer) {
    searchResult.data.results.forEach((result) => {
        searchPlayer.audioContainer.innerHTML += `
        <audio preload="none" src="${result.previews["preview-hq-mp3"]}" class="search-audio-element"></audio>`; 
    });
    searchPlayer.audioElements = document.getElementsByClassName("search-audio-element");
}

    // Function to display search results in the carousel
export function showSearchSounds(searchNavigation, searchResult) {
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
    
    searchNavigation.soundImage.src = searchResult.data.results[searchNavigation.index].images.waveform_m;
    searchNavigation.soundTitle.innerText = searchResult.data.results[searchNavigation.index].name;
    searchNavigation.soundImage.onload = () => window.scrollTo(0, scrollPosition);
}