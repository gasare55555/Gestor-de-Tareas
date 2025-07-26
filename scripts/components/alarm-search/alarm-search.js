    // Imports
import { navigationIndex, showSearchSounds } from "./search-display.js";
import { isPlaying, stopPlayer, audioContainer, loadSearchSounds } from "./search-play.js";
import { APIKEY } from "../alarm-setup.js";
import "./search-display.js";
import "./search-play.js";

    // Data
export const searchInputGroup = document.getElementById("search-input-group");
export const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
export const onSearchSubmission = { value: false };
export const searchResult = { current: {} };


//     // Function to show search input (used in alarm-setup)
// export function showSearchInput() {
//     searchInputGroup.classList.remove("d-none");
//     searchInput.focus();
//     window.scrollTo(0, window.scrollY + 100);
// }

    // Function to fetch alarm sounds/info from API database and trigger load/display of results
async function searchAlarmSounds() {
    if (searchInput.value) {
        try {
            const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(searchInput.value)}&filter=duration:${encodeURIComponent("[* TO 120]")}&group_by_pack=1&fields=name,previews,images&token=${APIKEY}`);
            if (!response.ok) {
                throw new Error(`HTTP response is not ok, status: ${response.status}`);
            }
            searchResult.current = await response.json();
            console.log(searchResult.current);
            if (searchResult.current.count) {
                isPlaying.value && stopPlayer();
                audioContainer.innerHTML = "";  // clears previous audio elements
                navigationIndex.value = 0;  // sets the index at initial position
                loadSearchSounds();
                showSearchSounds();
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

    // ------------------------ Listeners -----------------------------
    // Listener to submit search input on Enter key
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        onSearchSubmission.value = true;
        searchAlarmSounds();
    }
});

    // Listener to submit search input on click
searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    onSearchSubmission.value = true;
    searchAlarmSounds();
});
