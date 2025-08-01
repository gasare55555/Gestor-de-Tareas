    // Imports
import { APIKEY, stopPlayer as stopSelectPlayer, selectInput, selectIndex } from "../alarm-select.js"; 
import { showSpinner, showSearchSounds, hideSpinner } from "./alarm-search-display.js";
import { isPlaying, stopPlayer as stopSearchPlayer, startPlayer as startSearchPlayer, loadSearchSounds } from "./alarm-search-play.js";
import "./alarm-search-display.js";
import "./alarm-search-play.js";

    // Data
export const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
export const onSearchSubmission = { value: false };
export const searchResult = { current: {} };
export const searchSucceeded = { value: false };


//     // Function to show search input (used in alarm-setup)
// export function showSearchInput() {
//     searchInputGroup.classList.remove("d-none");
//     searchInput.focus();
//     window.scrollTo(0, window.scrollY + 100);
// }

    // Function to fetch alarm sounds/info from API database and trigger load/display of results
async function searchAlarmSounds() {
    try {
        const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(searchInput.value)}&filter=duration:${encodeURIComponent("[* TO 120]")}&group_by_pack=1&fields=name,previews,images&token=${APIKEY}`);
        if (!response.ok) {
            throw new Error(`HTTP response is not ok, status: ${response.status}`);
        }
        searchResult.current = await response.json();
        console.log(searchResult.current);
        if (searchResult.current.count) {
            searchSucceeded.value = true;
            isPlaying.value && stopSearchPlayer();
            loadSearchSounds();
            showSearchSounds();
            hideSpinner();
            startSearchPlayer();
        } else {
            searchSucceeded.value = false;
            hideSpinner();
            Swal.fire({
                title: "No sounds found",
            });
        }
        
    } catch (error) {
        searchSucceeded.value = false;
        hideSpinner();
        console.error("Error fetching data:", error);
        Swal.fire({
            title: "Error",
            text: error,
        });
    }  
}

    // ------------------------ Listeners -----------------------------
    //Listener to reset select input and hide select player
searchInput.addEventListener("focusin", () => {
    if (selectIndex.value != "") {
        stopSelectPlayer();
        selectInput.value = "";
        selectIndex.value = "";
    }
});

    // Listener to submit search input on Enter key
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (searchInput.value) {
            onSearchSubmission.value = true;
            showSpinner();
            searchAlarmSounds();
            onSearchSubmission.value = false;
        }
    }
});

    // Listener to submit search input on click
searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchInput.value) {
        onSearchSubmission.value = true;
        showSpinner();
        searchAlarmSounds();
        onSearchSubmission.value = false;
    }
});
