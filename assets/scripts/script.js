const searchTermEntry = document.querySelector("#searchTermEntry");
const addButton = document.querySelector("#addData");
const clearStorageBtn = document.querySelector("#clearStorage");
const noTerms = document.createElement('h3');
const userData = document.querySelector("#userData")
const d = new Date();
let searchTerms = [];
let userCopy = 
    {
        content: "",
        wordsArray: []
    };

const styleFound = "background-color: rgba(0, 255, 0, 0.25) !important;transition-duration: 1s;";
const styleNotFound = "background-color: rgba(255, 0, 0, 0.25) !important;transition-duration: 1s;";
const enterCopyPrompt = "Enter your wonderful copy here"

// Event listeners

// User Content to detect any key-presses
userData.addEventListener("keyup", function() {
    addUserCopy();
    displayCopy();
    checkOccurrences();

});

// Add keywords button to add user keywords to the array
addButton.addEventListener("click", function(event) {
    event.preventDefault();
    addSearchTerm();
    checkOccurrences();

});

// Event listener onto the clear all searches button
clearStorageBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeAllKeywords();
    displaySearchTerms();

});

// Initial render to DOM
displaySearchTerms();
displayCopy();
checkOccurrences();

// Render user specified keywords and anything already in local storage
function displaySearchTerms() {

    // Check to see if there is any local storage item for searchTerms. If not, show informative text
    if(checkLocalStorage("terms")){
        document.getElementById("searchTermList").innerHTML="Your keywords will show here";

    } else {
        // Clear the html list to prevent stacking
        document.getElementById("searchTermList").innerHTML="";

        // Convert the string into an array
        let parsedSearches = JSON.parse(localStorage.searchTerms);

        // Update global wordsArray variable with previous searches
        userCopy.wordsArray = parsedSearches;

        // Create and append to DOM a search term container for each user specified search term
        parsedSearches.forEach(term => {
            
            // Declare required variables
            var keyword = document.createTextNode(`"${term.toUpperCase()}" is used: ${isPlural(0)}`);
            var removeIcon = document.createElement(`i`);
            var keywordWrapper = document.createElement('div');
            var keywordLi = document.createElement('li');
            var keywordH6 = document.createElement('h6');
            var keywordDelete = document.createElement('h6');

            // Add required attributes / classes
            keywordWrapper.setAttribute("class", "flex-fill");
            keywordWrapper.setAttribute("style", styleNotFound);
            keywordWrapper.setAttribute("id", `${term}Style`);
            keywordLi.setAttribute("class","searchTerm d-flex gap-2 justify-content-between align-items-center");
            keywordH6.appendChild(keyword);
            keywordH6.setAttribute("id", term);
            removeIcon.setAttribute("class", "bi bi-trash3");
            keywordDelete.appendChild(removeIcon);
            keywordDelete.setAttribute("class", "remove");

            // Add an event lister to the remove button
            keywordDelete.addEventListener('click', () => {
                // Remove the item from the array
                localStorage.setItem("searchTerms", JSON.stringify(parsedSearches.filter(a => a !== term))); // It is the filter method here that takes out the search term from the array.
                //Reload the search terms 
                displaySearchTerms();
                // Reload the occurrences
                checkOccurrences();
            });

            // Add all generated HTML to the DOM
            keywordWrapper.appendChild(keywordLi);
            keywordLi.appendChild(keywordH6);
            keywordLi.appendChild(keywordDelete);
            document.getElementById("searchTermList").appendChild(keywordWrapper);

        });
    };
};

// Display user content if already in local storage
function displayCopy() {

    // Checks if there is already data stored. If not, add placeholder text
    if (checkLocalStorage("content")) {
        userData.value = "";
        userData.placeholder= enterCopyPrompt;
        return;

    } else {
        // Check if user content box is empty based on local storage string being present, but empty
        let parsedContent = JSON.parse(localStorage.userContent);

        if(parsedContent === "") {
            userData.placeholder= enterCopyPrompt;
            return;

        };

        // Set the value to the content of the local storage and update the global array variable
        userData.value = parsedContent;
        userCopy.content = parsedContent;

    };
};

// Test user's entry and either fail with alerts or add to storage and search term list
function addSearchTerm() {

    // Test if search box is empty
    if (!searchTermEntry.value) {
        alert("Enter a search term or keyword");
        return;

    // Test if local storage exists and  **Removing this will throw an error when adding the first search term if there is no local storage present***
    } else if (checkLocalStorage("terms"))  {
        addTermLocalStorage();

    // Test if users search is already stored in local storage
    } else if(termPresent()) {
        alert(`You've already added: "${searchTermEntry.value}"`);
        clearSearch();
        return;
    
    // Other wise add term to local storage
    } else {
        addTermLocalStorage();

    };
};

// Removes the entire search history key from local storage and clears the local searched terms array variable
function removeAllKeywords() {
    localStorage.removeItem("searchTerms");
    userCopy.wordsArray = [];

};

// Check if a keyword has is already present in local storage
function termPresent() {

    // Check if any data already in local storage and converting to uppercase to avoid capitalisation duplicates
    wordPresentTest = JSON.parse(localStorage.searchTerms.toUpperCase());

    for (let j = 0; j < wordPresentTest.length; j++) {
        if (wordPresentTest[j] === searchTermEntry.value.toUpperCase()) {
            return true;

        };
    };
};

// Adds the search term to the local storage
function addTermLocalStorage() {
    userCopy.wordsArray.push(searchTermEntry.value);
    localStorage.setItem("searchTerms", JSON.stringify(userCopy.wordsArray));
    clearSearch();
    displaySearchTerms();

};

// Clears the keyword entry box
function clearSearch() {
    searchTermEntry.value="";

};

// Function to test if local storage keys are empty returning true if it is
function checkLocalStorage(data) {
    if(data == "terms" && !localStorage.searchTerms) {
        return true;

    } else if(data == "content" && !localStorage.userContent) {
        return true;

    } else {
        return false;

    };
};

// Add user copy to local storage
function addUserCopy() {
    localStorage.setItem("userContent", JSON.stringify(userData.value));
    userCopy.content=userData.value;

};

// Checks for and Calculates the number of matches each keyword is found inside the user's content
function checkOccurrences() {

    // Check to see if local storage is empty. if not, run continue 
    if(checkLocalStorage("content")) {
        return;

    };

    // **THIS IS THE MAIN PROCESS THAT CHECKS THE USER SEARCH TERMS AGAINST THE USER CONTENT**
    userCopy.wordsArray.forEach(userKeyword => {
        // This variable becomes the search term on each array iteration and is converted to RegExp. The \\b...\\b ensures only full word matches are returned positive. This means small words or single letter words like 'a', or' and 'the' will not be returned 
        var regex = new RegExp(`\\b${userKeyword}\\b`, 'gi');

        // This variable becomes an array containing every instance that the search term is found. We then display the array length for the number of times it is found
        const matches = userCopy.content.match(regex);

        // Gets the current HTML element based on the keyword being checked
        var liElement = document.getElementById(userKeyword);

        // Change the style of keyword occurrences based on if found or not. Red for not found, green for at least one
        if(liElement) {
            liElement.innerHTML = `"${userKeyword.toUpperCase()}" is used: ${isPlural(matches?matches.length:0)}`;
            
            if(matches?matches.length:0 > 0) {
                document.getElementById(`${userKeyword}Style`).setAttribute("style", `${styleFound}`);

            } else {
                document.getElementById(`${userKeyword}Style`).setAttribute("style", `${styleNotFound}`);

            };
        };
    });        
};

// Function to return times or time based 0, 1 or greater than one
function isPlural(data) {
    if(data == 0 || data > 1) {
        return `${data} times`;

    } else {
        return `${data} time`;

    };
};

// Footer Copyright notice
document.getElementById("copyright").innerHTML = `Copyright ${d.getFullYear()} SEO Keyword Counter | Rob Saunders, UK | All rights reserved`