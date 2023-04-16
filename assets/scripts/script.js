// This app will allow users to specify a list of search terms to see how many times they occur in their copy. A number will indicate the number of occurrences as well as a heatmap which will change from blue (low occurrences) to red (highest occurrences). The user will enter their copy into a text entry field. All words will be counted and they will be displayed in a more subtle container as this information isn't so important. When the system detects there has been no user-input for 1.5 seconds, the list of search terms will be re-ordered by number of occurrences, highest to lowest. All user data will be saved to local storage and can be cleared at any time.

// Single Page app
    // Instructions on how to use
    // Key phrase entry
    // Tracked key phrases, occurrences, heatmap and delete button
    // Copy entry
    
    // Enter key phrases 
        // Text-entry box to add search term
        // Press enter or 'add' button 
        // Each term is added to local storage
        // Display search term in container based on what is in local storage
            // Add delete button & delete all button
                // On delete, remove from array, local storage and container
        // Run calculation engine
    
    // Enter copy
        // User types or copies in content
        // On any change, the content is stored in local-storage
        // Clear button removes all content from the container and local storage
    
    //Calculation engine
        // User-specified search terms converted to lower case and spaces removed resulting in one string
        // User copy converted into two arrays and added to user copy object
            // Key 1: content. The user's content as written on screen
            // Key 2: lowercase. Entire copy converted to lower case as one long string
            // Key 3: wordsArray. All words separated by space character and stored individually as an array
        // Function checks how many times each search term stored in local storage occurs in the userCopy.lowercase string
        // Function checks how many times each word occurs in the userCopy.wordsArray array

// Future development
    // User can specify desired number of occurrences with color coding to indicate under or over use
    // User can enter paragraphs and DOM will render Paragraph breaks 


// Variables
const searchTerm = true; // This will determine what localStorage is modified
const searchTermEntry = document.querySelector("#searchTermEntry");
const addButton = document.querySelector("#addData");
const clearStorageBtn = document.querySelector("#clearStorage");
const noTerms = document.createElement('h3');

let searchTerms = [];

let userCopy = {
    content: "",
    lowercase: "",
    wordsArray: []
};

displaySearchTerms();

// Event listener onto the add search term button
addButton.addEventListener("click", function(event) {

    event.preventDefault();
    addSearchTerm();
});

// Render user specified keywords and anything already in local storage
function displaySearchTerms() {

    // Check to see if there is any history yet
    if(!localStorage.searchTerms){

        document.getElementById("searchTermList").innerHTML="Add some search terms";

    } else {

        // Check to see if the search term already exists so get local storage searchTerms key and convert the string into an array
        parsed = JSON.parse(localStorage.searchTerms);
        userCopy.wordsArray = parsed;
        document.getElementById("searchTermList").innerHTML="";

        // Run a loop that checks for search term so that the entire argument can be broken if the search exists already
        for (let i = 0; i < parsed.length; i++) {

            let listedTerm = document.createElement('li');
            let textContent = document.createTextNode(`${parsed[i]}`)
            listedTerm.appendChild(textContent);
            document.getElementById("searchTermList").appendChild(listedTerm);

        };
    };
};

// Test user's entry and either fail or trigger adding to storage
function addSearchTerm() {

    // Test if search box is empty
    if (!searchTermEntry.value) {

        alert("Enter some text")
        return;

    // Test if local storage contains previous searches
    } else if (!localStorage.searchTerms)  {

        addData()

    // Test if users search is already stored in local storage
    } else if(termPresent()) {

        alert("You've already added this")
        return;
    
    // Trigger addData function
    } else {

        addData();

    };
};

// Event listener onto the clear all searches button
clearStorageBtn.addEventListener("click", function(event) {

    event.preventDefault();
    removeData()

});

// Removes the entire search history key from local storage and clears the local searched terms array variable
function removeData() {

    localStorage.clear();
    userCopy.wordsArray = []
    displaySearchTerms();

};

// Check if a keyword has is already present in local storage
function termPresent() {

    // Check if any data already in local storage
    parsedSearchTerm = JSON.parse(localStorage.searchTerms);

    for (let j = 0; j < parsedSearchTerm.length; j++) {

        if (parsedSearchTerm[j] === searchTermEntry.value) {

            clearSearch();
            return true;

        };
    };
};

// Adds the search term to the local storage
function addData() {
    
    userCopy.wordsArray.push(searchTermEntry.value);
    localStorage.setItem("searchTerms", JSON.stringify(userCopy.wordsArray));
    clearSearch();
    displaySearchTerms();

};

// Clears the search box
function clearSearch() {

    searchTermEntry.value="";

};

function convertLowercase(data) {

};

function extractWords(data) {

};

function removeSpaces(data) {

};

function checkOccurrences(data) {

};

function calculateHeatMap(data) {

};

function addUserCopy(data) {

};