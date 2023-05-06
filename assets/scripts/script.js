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
const occurrencesList = document.querySelector("#occurrencesList")
const matchesCount = document.getElementById("matchesCount")


let searchTerms = [];

let userCopy = {
    content: "",
    wordsArray: []
};
let allWords = [];
let searchTermCount = {};
displaySearchTerms();
displayUserContent();
checkOccurrences();
checkMatches();

// Add event listener to copy box on any change
userData.addEventListener("keyup", function(event) {
addUserCopy();
checkMatches();
checkOccurrences();




});

// Event listener onto the add search term button
addButton.addEventListener("click", function(event) {

    event.preventDefault();
    addSearchTerm();
    checkMatches();
});

// Render user specified keywords and anything already in local storage
function displaySearchTerms() {

    // Check to see if there is any history yet
    if(!localStorage.searchTerms){

        document.getElementById("searchTermList").innerHTML="Add some search terms";

    } else {

        // Check to see if the search term already exists so get local storage searchTerms key and convert the string into an array
        document.getElementById("searchTermList").innerHTML="";
        let parsedSearches = JSON.parse(localStorage.searchTerms);
        userCopy.wordsArray = parsedSearches;

        // Run a loop that checks for search term so that the entire argument can be broken if the search exists already
        for (let i = 0; i < parsedSearches.length; i++) {

            let listedTerm = document.createElement('li');
            let textContent = document.createTextNode(`${parsedSearches[i]}`)
            listedTerm.appendChild(textContent);
            document.getElementById("searchTermList").appendChild(listedTerm);

        };
    };
};

function displayAllWords(data) {

    document.getElementById("occurrencesList").innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        let listedTerm = document.createElement('li');
        let textContent = document.createTextNode(`${data[i]}`)
        listedTerm.appendChild(textContent);
        document.getElementById("occurrencesList").appendChild(listedTerm);

    };
}

// Display user content if already in local storage
function displayUserContent() {

    // Checks if there is already data stored
    if (!localStorage.userContent) {
        userData.value = ""
        userData.placeholder="Enter your content here";

        return;

    };

    // Place the stored data into the content box
    let parsedContent = JSON.parse(localStorage.userContent)
    userData.value = parsedContent;
    userCopy.content = parsedContent;

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
    userCopy.wordsArray = [];
    userCopy.content = "";
    document.getElementById("occurrencesList").innerHTML = "";
    displaySearchTerms();
    displayUserContent();
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

// Add user copy to local storage
function addUserCopy() {

    localStorage.setItem("userContent", JSON.stringify(userData.value));


};

function convertLowercase(data) {

};

function checkMatches() {
   
    // Check to see if local storage is empty. if not, run check occurrences
    if (localStorage.searchTerms) {
        checkOccurrences()
    };

    // Clear existing HTML for overwriting
    matchesCount.innerHTML="";

    let foundWords=[];

    // Check to see if any of the user's search terms are contained in the list of words array and create a new array with matches
    for (let i = 0; i < userCopy.wordsArray.length; i++) {
        
        for (let b = 0; b < allWords.length; b++) {
            
            if(userCopy.wordsArray[i] === allWords[b]) {
                foundWords.push(allWords[b])

            };
        };
    };

    // Get the number of occurrences from the array
    for (let f = 0; f < foundWords.length; f++) {
        
        matchesCount.innerHTML=`"${foundWords[f]}" is displayed: ${searchTermCount[foundWords[f]]} times`;

    };
};

function checkOccurrences(data) {
    // Check to see if local storage is empty. if not, run check occurrences
    if(!localStorage.userContent) {
        return;
    };

    // Fetch copy string from local storage and convert it to a string
    parsedCopy = JSON.parse(localStorage.userContent);

    // Create an array containing all the words
    let allWordsArray = parsedCopy.match(/\b(\w+)\b/g);
    const duplicates = {};
    allWordsArray.forEach(function(x) { duplicates[x] = (duplicates[x] || 0) +1; });

    // Create an array with only one instance of words, no duplicates 
    let uniqueWords = [...new Set(allWordsArray)];
    allWords = uniqueWords;
    searchTermCount = duplicates;


    // Call function to display the words as a list item for testing
    displayAllWords(uniqueWords);

};


const test = "The alarm went off at exactly 6:00 AM as it had every morning for the past five years. Barbara began her morning and was ready to eat breakfast by 7:00 AM. The day appeared to be as normal as any other, but that was about to change. In fact, it was going to change at exactly 7:23 AM.She reached her goal, exhausted. Even more chilling to her was that the euphoria that she thought she'd feel upon reaching it wasn't there. Something wasn't right. Was this the only feeling she'd have for over five years of hard work?";


function findFullMatches() {

    for (let i = 0; i < userCopy.wordsArray.length; i++) {
console.log(userCopy.wordsArray[i]);
        var regex = new RegExp(`\\b${userCopy.wordsArray[i]}\\b`, 'gi');
console.log(regex);
        const matches = test.match(regex);
        console.log(matches?matches.length:0);

    }

}
findFullMatches()