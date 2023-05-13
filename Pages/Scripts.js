
// Request the JSON from the EXTERNAL folder
var pages;              // Decleared outside -> global
async function get_pages() {
    const response = await fetch('https://hit226-d1-2023.bitbucket.io/EXTERNAL/data.JSON');
    pages = await response.json();
    search_index();      // Display all pages
}

function search_nav_enter() {

    var input = document.getElementById("search_nav_box");
    // If the input was an enter key
    input.addEventListener("keypress", function _listener() {
        if (event.key === "Enter") {
            localStorage.setItem("search_query", document.getElementById("search_nav_box").value);
            window.location.href="../Search/index.html";
        } 
        // Removes listener
        input.removeEventListener("keypress", _listener, true);
    }, true);
}


// Display results
function dis_page(page) {
    var to_add = "";

    to_add += '<h1>' + page.title + '</h1>';
    to_add += page.desc;

    document.getElementById("main").innerHTML = to_add; // Adds the result to the page
}

// Searches all pages which match input, passes it to display_results
function search_index() {
    //const page_index = localStorage.getItem("page_index")
    const page_index = document.getElementById("input").value - 1;
    // Loop through all pages
    for (var i = 0; i < pages.length; i++) {
        if (i == page_index) {
            dis_page(pages[i]);
            break;
        }
    }
}