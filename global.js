//var nav_json = `{"link": "`;
//   nav_json += `<span> <a href='index.html'>Home</a></span> |`;
//   nav_json += `<span> <a href='Search/search_page.html'>Search box</a></span> |`;
//   nav_json += `<span> <a href='Pages/page_test.html'>Display JSON test</a></span> |`;
//   nav_json += `<span> <a href='menu/index.html'>Menu page</a></span> |`;
//   nav_json += `<span> <a href='footer/index.html'>Footer</a></span> |`;
//   nav_json += `<span> <a href='recipes/index.html'>Recipes</a></span>"}`;

//nav_json = JSON.parse(nav_json);

//var nav_json;              // Decleared outside -> global
async function get_nav(exclude) {
    const response = await fetch('https://thegreatkhann.github.io/live_site/EXTERNAL/nav.JSON');
    nav_json = await response.json();
    
    place_nav(exclude);
}
// Create the HTML for the header
function place_nav(exclude) {
    document.getElementsByTagName("head")[0].innerHTML += "<base href='https://thegreatkhann.github.io/live_site/'>";
    document.getElementsByTagName("head")[0].innerHTML += "<link rel='stylesheet' href='global.css'>"

    const header = document.getElementsByTagName("header")[0];
    var to_add = "";    // Have to use a variable as adding HTML tags on by one dosent work

    to_add = "<nav>";
    
    if (!exclude) { // If exclude input was used
        to_add += "<input type='search' name='search_box' placeholder='Search for page...' id='search_nav_box' onkeydown='search_nav_enter()'>";
        to_add += "<input type='button' value='Search' id='search_nav_button' onclick='search_nav()'><br>"
    };
    to_add += nav_json.link;
    to_add += "</nav>";

    header.innerHTML = to_add;
    //nav.innerHTML = "This is a JavaScript placed nav";
}
// Passess the search query to local storage, then navagates to the search page
function search_nav() {
    localStorage.setItem("search_query", document.getElementById("search_nav_box").value); // Storages query
    window.location.href="Search/search_page.html";
}

// Used when the user enters a search
function search_nav_enter() {

    var input = document.getElementById("search_nav_box");
    // If the input was an enter key
    input.addEventListener("keypress", function _listener() {
        if (event.key === "Enter") {  search_nav();  } 
        // Removes listener
        input.removeEventListener("keypress", _listener, true);
    }, true);
}