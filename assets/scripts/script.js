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

userData.addEventListener("keyup", function() {
    addUserCopy();
    displayCopy();
    checkOccurrences();

});

addButton.addEventListener("click", function(event) {
    event.preventDefault();
    addSearchTerm();
    checkOccurrences();

});

clearStorageBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeAllKeywords();
    displaySearchTerms();

});

displaySearchTerms();
displayCopy();
checkOccurrences();

function displaySearchTerms() {

    if(checkLocalStorage("terms")){
        document.getElementById("searchTermList").innerHTML="Your keywords will show here";

    } else {
        document.getElementById("searchTermList").innerHTML="";

        let parsedSearches = JSON.parse(localStorage.searchTerms);

        userCopy.wordsArray = parsedSearches;

        parsedSearches.forEach(term => {
            
            var keyword = document.createTextNode(`"${term.toUpperCase()}" is used: ${isPlural(0)}`);
            var removeIcon = document.createElement(`i`);
            var keywordWrapper = document.createElement('div');
            var keywordLi = document.createElement('li');
            var keywordH6 = document.createElement('h6');
            var keywordDelete = document.createElement('h6');

            keywordWrapper.setAttribute("class", "flex-fill");
            keywordWrapper.setAttribute("style", styleNotFound);
            keywordWrapper.setAttribute("id", `${term}Style`);
            keywordLi.setAttribute("class","searchTerm d-flex gap-2 justify-content-between align-items-center");
            keywordH6.appendChild(keyword);
            keywordH6.setAttribute("id", term);
            removeIcon.setAttribute("class", "bi bi-trash3");
            keywordDelete.appendChild(removeIcon);
            keywordDelete.setAttribute("class", "remove");

            keywordDelete.addEventListener('click', () => {
                localStorage.setItem("searchTerms", JSON.stringify(parsedSearches.filter(a => a !== term))); 
                displaySearchTerms();
                checkOccurrences();
            });

            keywordWrapper.appendChild(keywordLi);
            keywordLi.appendChild(keywordH6);
            keywordLi.appendChild(keywordDelete);
            document.getElementById("searchTermList").appendChild(keywordWrapper);

        });
    };
};

function displayCopy() {

    if (checkLocalStorage("content")) {
        userData.value = "";
        userData.placeholder= enterCopyPrompt;
        return;

    } else {
        let parsedContent = JSON.parse(localStorage.userContent);

        if(parsedContent === "") {
            userData.placeholder= enterCopyPrompt;
            return;

        };

        userData.value = parsedContent;
        userCopy.content = parsedContent;

    };
};

function addSearchTerm() {

    if (!searchTermEntry.value) {
        alert("Enter a search term or keyword");
        return;

    } else if (checkLocalStorage("terms"))  {
        addTermLocalStorage();

    } else if(termPresent()) {
        alert(`You've already added: "${searchTermEntry.value}"`);
        clearSearch();
        return;
    
    } else {
        addTermLocalStorage();

    };
};

function removeAllKeywords() {
    localStorage.removeItem("searchTerms");
    userCopy.wordsArray = [];

};

function termPresent() {

    wordPresentTest = JSON.parse(localStorage.searchTerms.toUpperCase());

    for (let j = 0; j < wordPresentTest.length; j++) {
        if (wordPresentTest[j] === searchTermEntry.value.toUpperCase()) {
            return true;

        };
    };
};
// A Function
function addTermLocalStorage() {
    userCopy.wordsArray.push(searchTermEntry.value);
    localStorage.setItem("searchTerms", JSON.stringify(userCopy.wordsArray));
    clearSearch();
    displaySearchTerms();

};

function clearSearch() {
    searchTermEntry.value="";

};

function checkLocalStorage(data) {
    if(data == "terms" && !localStorage.searchTerms) {
        return true;

    } else if(data == "content" && !localStorage.userContent) {
        return true;

    } else {
        return false;

    };
};

function addUserCopy() {
    localStorage.setItem("userContent", JSON.stringify(userData.value));
    userCopy.content=userData.value;

};

function checkOccurrences() {

    if(checkLocalStorage("content")) {
        return;

    };

    userCopy.wordsArray.forEach(userKeyword => {

        var regex = new RegExp(`\\b${userKeyword}\\b`, 'gi');

        const matches = userCopy.content.match(regex);

        var liElement = document.getElementById(userKeyword);

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

function isPlural(data) {
    if(data == 0 || data > 1) {
        return `${data} times`;

    } else {
        return `${data} time`;

    };
};

document.getElementById("copyright").innerHTML = `Copyright ${d.getFullYear()} SEO Keyword Counter | Rob Saunders, UK | All rights reserved`