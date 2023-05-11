# Rob's Keyword Counter for SEO

## Table of Contents

- [Project Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Testing](#Testing)
- [Questions](#Questions)
- [Original Pseudocode](#original-pseudocode)

## Description
This SEO Keyword Density (counter) tool is specifically designed to help SEOs count the number of times they have used their list of keywords/phrases when writing keyword-rich and search engine optimised content. As the SEO types/pastes in their copy, this app displays the number of times they have used each keyword/phrase within their copy - In real-time. Any number of keywords can be counted, and the keywords can be single-words and/or contain multiple words. The tool won’t include partial matches where the keyword matches a combination of letters within a word for example, if an SEO is tracking the word ‘the’, the app won’t match it to ‘thesaurus’.

To prevent any lost-data and lost-time frustrations, all user inputs are saved to local storage in real-time just in case there are any tekkie issues like a computer crash or an accidental browser/tab closure.

This tool is obviously not the first of its kind or anything ground-breaking etc, but I built it to practise my JavaScript knowledge and apply it to a real-world problem. As an SEO myself, I often write content that must include certain keywords but with my memory, I quickly forget which ones I’ve used and end up re-reading my copy repeatedly trying to gauge which words/phrases I’ve used on my list. It’s important not to use too many of the same word, so it quickly becomes difficult for me to keep track of how many I’ve used.

So, I knew I could Google it and probably find a tool that could do this already but for me it was the perfect opportunity to apply my knowledge and build something I (and maybe others) can use without trials or cost. Again, though, it’s amateur and of course not nearly as feature-rich as those professional versions - but it only needs to be simple.

## Installation
N/A

## Usage
Simply enter your list of keywords one at a time (for now) and start typing your copy in the text field below. You may also paste content into this box too. A counter will be added next to each keyword you added showing how many times it appears in the text

## Contributors
If you would like to contribute to this or have any suggestions please contact me using my email or gitHub below

## Testing
NA

## Questions
You can get in touch by using the following:

### GitHub
**[R0bsaunders](https://github.com/R0bsaunders)**

### Email
**[me@rob-saunders.co.uk](me@rob-saunders.co.uk)**

## Original Pseudocode
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