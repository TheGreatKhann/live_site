var nav_json;              // Decleared outside -> global
async function get_nav() {
    const response = await fetch('https://thegreatkhann.github.io/live_site/EXTERNAL/nav.JSON');
    nav_json = await response.json();
    
    place_nav();
}

function place_nav() {
    const nav = document.getElementsByTagName("nav")[0];

    nav.innerHTML = nav_json.link;
    //nav.innerHTML = "This is a JavaScript placed nav";
}