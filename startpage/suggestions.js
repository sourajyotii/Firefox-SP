let suggestIndex = -1;
let suggestInput = "";

const getSettingg = (setting) => {
    // enable/disable
    return true
}

const suggest = () => {
    if (!getSettingg("autocomplete")) {
        return;
    }
    suggestInput = document.getElementById("web-search").value;
    let input = document.getElementById("web-search").value;
    suggestIndex = -1;
    if (input == "") {
        document.getElementById("suggestions").style.display = "none";
        suggestIndex = -1;
    } else {
        let script = document.createElement('script');
        script.type = 'text/javascript';

        script.src = `https://www.google.com/complete/search?client=chrome&q=${input}&callback=getSuggestions`;
        document.body.appendChild(script);
    }
}

const getSuggestions = (data) => {
    if (data[1].length > 0) {
        document.getElementById("suggestions").style.display = "block";
    } else {
        document.getElementById("suggestions").style.display = "none";
    }
    document.getElementById("suggestions").innerHTML = "<hr>";
    data[1].forEach((element, index) => {
        if (element.startsWith("https://")) {
            document.getElementById("suggestions").innerHTML += `<p id='sug${index}' onclick="location.href='${element}'">${element}</p>`;
        } else {
            document.getElementById("suggestions").innerHTML += `<p id='sug${index}' onclick="searchSuggestion(${index})">${element}</p>`;
        }
    })
} 

const hideSearchSuggest = () => {

    //focus out hide
    document.getElementById("web-search").addEventListener("focusout", (event) => {
        if (document.querySelector("#suggestions:hover") == null) {
            document.getElementById("suggestions").style.display = "none";
            suggestIndex = -1;
        } 
    });

    // focus in suggest
    document.getElementById("web-search").addEventListener("focusin", (event) => {
        suggest();
    });

    // move suggest index
    document.addEventListener("keydown", (event) => {
        if (document.getElementById("suggestions").style.display == "block") {

            // arrow down
            if (event.key == "ArrowDown" && suggestIndex < 7) {
                suggestIndex += 1;
                applySuggestions();
            }

            // arrow up
            if (event.key == "ArrowUp") {
                if (suggestIndex > 0) {
                    suggestIndex -= 1;
                } else {
                    suggestIndex = -1
                    document.getElementById("web-search").value = suggestInput;
                }
                applySuggestions();
            }

            // arrow right
            if (event.key == "ArrowRight" && suggestIndex >= 0) {
                suggestIndex = -1;
                suggestInput = document.getElementById("web-search").value;
                applySuggestions();
            }

            // arrow left
            if (event.key == "ArrowLeft" && suggestIndex >= 0) {
                suggestIndex = -1;
                document.getElementById("web-search").value = suggestInput;
                applySuggestions();
            }
        }
    });
}

const applySuggestions = () => {
    
    document.querySelectorAll("#suggestions p").forEach(element => {
        element.style.backgroundColor = "rgba(0,0,0,0)"
    });

    if (suggestIndex >= 0) {
        document.getElementById("web-search").value = document.getElementById(`sug${suggestIndex}`).innerHTML;
        document.getElementById(`sug${suggestIndex}`).style.backgroundColor = "rgba(0,0,0,0.2)";
    }
    
    setTimeout(selectionToEnd, 0)
}


const selectionToEnd = () => {
    document.getElementById("web-search").setSelectionRange(1000, 1000);
}

const searchSuggestion = (id) => {
    document.getElementById("web-search").value = document.getElementById(`sug${id}`).innerHTML;
    document.getElementById("search-button").click();
}

hideSearchSuggest();