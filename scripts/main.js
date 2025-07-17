
    // ------------------------ Listeners -----------------------------

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchAlarmSounds(searchInput, APIKEY, searchResult, searchPlayer, searchNavigation);
    }
});

searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    searchAlarmSounds(searchInput, APIKEY, searchResult, searchPlayer, searchNavigation);
});

playButton.addEventListener("click", () => {
    if (soundIsPlaying) {
        searchPlayer[searchNavigation.index].pause();
        soundIsPlaying = false;
    } else {
        searchPlayer[searchNavigation.index].play();
        soundIsPlaying = true;
    }  
});

nextButton.addEventListener("click", () => {
    if (soundIsPlaying) {
        searchPlayer[searchNavigation.index].pause();
        soundIsPlaying = false;
    }
    searchNavigation.index == 0 && (searchIsPossible = true);
    searchNavigation.index != 14 && searchNavigation.index++;
    searchIsPossible && showSearchSounds(searchNavigation);
    searchNavigation.index == 14 && (searchIsPossible = false); 
    console.log(searchNavigation.index);
});

prevButton.addEventListener("click", () => {
    if (soundIsPlaying) {
        searchPlayer[searchNavigation.index].pause();
        soundIsPlaying = false;
    }
    searchNavigation.index == 14 && (searchIsPossible = true);
    searchNavigation.index != 0 && searchNavigation.index--;
    searchIsPossible && showSearchSounds(searchNavigation);
    searchNavigation.index == 0 && (searchIsPossible = false);
    console.log(searchNavigation.index);
});




    // Abajo va common-listeners script