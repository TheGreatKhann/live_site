 


// Request the JSON from the EXTERNAL folder
var pages;              // Decleared outside -> global
async function get_pages() {
    //Chrome 'lightens' fonts making them very hard to read. Following darkens fonts only on Chrome
    if(navigator.userAgent.match(/chrome|chromium|crios/i)) {   //Source: https://codepedia.info/detect-browser-in-javascript
        document.getElementsByTagName("body")[0].style.fontWeight = 400;  }

    const response = await fetch('https://hit226-d1-2023.bitbucket.io/EXTERNAL/data.JSON');
    pages = await response.json();
    if (localStorage.getItem("search_query") == null) {
        search(document.getElementById("search_box").value); // When no external call, display local search box
    } else {
        document.getElementById("search_box").value = localStorage.getItem("search_query"); // Remote query to searchbox
        search();                                            // Start the search
        localStorage.removeItem("search_query");             // Clear storage
    }
}


// Display results
function dis_results(matching) {

    if (matching.length == 0) { // If no results where found
        document.getElementById("results").innerHTML = "<h2>No results found...</h2>";
        return;    // Exits the function
    }
    // Loop through all results and turns them into HTML sections
    for (var i = 0; i < matching.length; i++) {
        var to_add = "";

        to_add += "<a href='Pages/page_test.html'>"
        to_add += "<section class='result'>";                   // Opens the section
        to_add += "<img src='imgs/" + matching[i].type + ".png' alt='" + matching[i].type + "' class='banner'></img>"; // Adds banner image
        to_add += "<h2>" + matching[i].title + "</h2>";         // Adds the title
        to_add += matching[i].desc + "<div class='tag_cont'>";  // Adds description + tag container
        // Loops through all the tags and puts them in their own span
        for (var j = 0; j < matching[i].tags.length; j++) {
            to_add += "<span class='tag'>" + matching[i].tags[j] + "</span>";
        }
        to_add += "</div></section></a>";                       // Closes container & section

        document.getElementById("results").innerHTML += to_add; // Adds the result to the page
    }
}

// Loops thorugh pages and passes matching to dis_results
function search(query) {
    // To prevent double results
    if (typeof display_delay !== 'undefined') {  clearTimeout(display_delay);  }
    // if no query was made, take it from the search box
    if (query == null) {query = document.getElementById("search_box").value;}

    // Remove all current results
    document.getElementById("results").innerHTML = "";

    const matching = [];

    // #How to loop through the keys of an object
    //const user = {name: 'John Doe', email: 'john.doe@example.com', age: 25, dob: '08/02/1989', active: true};
    //for (var key in user) {  alert(user[key]);  }

    // Loop through all pages
    for (var i = 0; i < pages.length; i++) {
        //if (i == 7) {  break;  }    // Limits number of results
        // Checks if input matches page
        if (( RegExp(query, "i").test(pages[i].tags) |        // In page tags?
              RegExp(query, "i").test(pages[i].title) ) &     // In page title?
              document.getElementById(pages[i].type + "_check").checked) {  // Include based on checkboxes
            // Adds all matching pages to an array
            matching.push(pages[i])
        }
    }
    // Wait a bit before passing the results to the display function
    // The delay is there so the user knows something has been searched
    display_delay = setTimeout(() => {
        dis_results(matching);
      }, 100);
}

// Calls when any key is pressed. Only searches if key was an "enter"
function search_enter() {

    var input = document.getElementById("search_box");
    // If the input was an enter key
    input.addEventListener("keypress", function _listener() {
        if (event.key === "Enter") {  search();  } 
        // Removes listener
        input.removeEventListener("keypress", _listener, true);
    }, true);
}