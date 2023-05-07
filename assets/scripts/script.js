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
const userData = document.querySelector("#userData")
const resultsList = document.querySelector("#resultsList")
const matchesCount = document.getElementById("matchesCount")
let searchTerms = [];
let userCopy = 
    {
        content: "",
        wordsArray: []
    };

let searchTermCount = [];

displaySearchTerms();
displayCopy();
checkOccurrences();

// Add event listener to copy box on any change
userData.addEventListener("keyup", function() {
    addUserCopy();
    checkOccurrences();

});

// Event listener onto the add search term button
addButton.addEventListener("click", function(event) {

    event.preventDefault();
    addSearchTerm();
    checkOccurrences()
});

// Render user specified keywords and anything already in local storage
function displaySearchTerms() {

    // Check to see if there is any local storage for searchTerms.  If not, prompt user to add search terms
    if(!localStorage.searchTerms){

        document.getElementById("searchTermList").innerHTML="Add some search terms";

    } else {

        // Clear the html list and Convert the string into an array as well as updating global wordsArray Variable with previous searches
        document.getElementById("searchTermList").innerHTML="";
        let parsedSearches = JSON.parse(localStorage.searchTerms);
        userCopy.wordsArray = parsedSearches;

        // Loop that checks for search term so that the entire argument can be broken if the search exists already
        parsedSearches.forEach(element => {

            let listedTerm = document.createElement('li');
            let textContent = document.createTextNode(element);
            listedTerm.appendChild(textContent);
            document.getElementById("searchTermList").appendChild(listedTerm);
        });
    };
};

// Display user content if already in local storage
function displayCopy() {

    // Checks if there is already data stored
    if (!localStorage.userContent) {
        userData.value = "";
        userData.placeholder="Enter your content here";
        return;
    };

    // Place the local storage content data into the content box
    let parsedContent = JSON.parse(localStorage.userContent);
    userData.value = parsedContent;
    userCopy.content = parsedContent;
};

// Test user's entry and either fail or trigger adding to storage
function addSearchTerm() {

    // Test if search box is empty
    if (!searchTermEntry.value) {

        alert("Enter some text");
        return;

    // Test if local storage contains previous searches **Removing this will throw an error when adding the first search term if there is no local storage present***
    } else if (!localStorage.searchTerms)  {

        addSearchData();

    // Test if users search is already stored in local storage
    } else if(termPresent()) {

        alert("You've already added this");
        return;
    
    // Trigger addData function
    } else {

        addSearchData();
    };
};

// Event listener onto the clear all searches button
clearStorageBtn.addEventListener("click", function(event) {

    event.preventDefault();
    clearData();
    displaySearchTerms();
    displayCopy();
});

// Removes the entire search history key from local storage and clears the local searched terms array variable
function clearData() {

    localStorage.clear();
    userCopy.wordsArray = [];
    userCopy.content = "";
    document.getElementById("resultsList").innerHTML = "";
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
function addSearchData() {
    
    userCopy.wordsArray.push(searchTermEntry.value);
    localStorage.setItem("searchTerms", JSON.stringify(userCopy.wordsArray));
    clearSearch();
    displaySearchTerms();
};

// Clears the search box
function clearSearch() {

    searchTermEntry.value="";
};

// Add user copy to local storage
function addUserCopy() {

    localStorage.setItem("userContent", JSON.stringify(userData.value));
    userCopy.content=userData.value;
};

function checkOccurrences() {

    // Check to see if local storage is empty. if not, run check occurrences
    if(!localStorage.userContent) {
        return;
    };

    // Clear searchTerm Variable so it's up to date with correct count
    let searchTermCount = [];

    // Clear the terms already there to ensure only up to date occurrences are displayed
    document.getElementById("resultsList").innerHTML = "";

    // **THIS IS THE MAIN PROCESS THAT CHECKS THE USER SEARCH TERMS AGAINST THE USER CONTENT**
    
    userCopy.wordsArray.forEach(element => {
        
        // This variable becomes the search term on each array iteration and is converted to RegExp. The \\b...\\b ensures only full word matches are returned positive. This means small words or single letter words like 'a', or' and 'the' will not be returned 
        var regex = new RegExp(`\\b${element}\\b`, 'gi');

        // This variable becomes an array containing every instance that the search term is found. We then display the array length for the number of times it is found
        const matches = userCopy.content.match(regex);

        // Display li item function
        displayTotalMatches(element, matches);

        // Update global variable
        var obj = {
            keyword: `${element}`,
            count: `${matches?matches.length:0}`
        };

        searchTermCount.push(obj);
        console.log(searchTermCount);

    });        
};

function displayTotalMatches(term, matchedTerm) {

    // Create list for each search term with the number of times it has been found
    let foundTerm = document.createElement('li');
    let termContent = document.createTextNode(`The term '${term}' appears ${matchedTerm?matchedTerm.length:0} times`);
    foundTerm.appendChild(termContent);
    document.getElementById("resultsList").appendChild(foundTerm);
};

console.log(searchTermCount);