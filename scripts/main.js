
    // ------------------------ Listeners -----------------------------
    //Listener para disparar la carga del elemento audio correspondiente a la opción seleccionada
selectAlarm.addEventListener("change", (e) => {
    if (selectIndex != "" && selectIndex != "personalizada") {
        stopPlayer(selectPlayer, selectIndex);  //ocultamos el player anterior
    }

    if (selectIndex == "personalizada") {
        hideSearchSection(searchInputGroup, searchNavigation, searchPlayer, searchInput);  //ocultamos la sección de búsqueda
    }
    
    selectIndex = e.target.value;  

    if (selectIndex != "" && selectIndex != "personalizada") {
        startPlayer(selectPlayer, selectIndex);  //we show and start the player
    }

    if (selectIndex == "personalizada") {
        showSearchInput(searchInputGroup);  //we show the search section
    }

});

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