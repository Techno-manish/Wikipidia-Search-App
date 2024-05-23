let userInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let loading = document.getElementById("spinner");

function addToview(result) {
    let {
        link,
        title,
        description
    } = result;
    console.log(link);
    console.log(title);
    console.log(description);
    let contentContainer = document.createElement("div");
    contentContainer.classList.add('result-item');
    searchResults.appendChild(contentContainer);

    let titleEl = document.createElement('a');
    titleEl.classList.add('result-title');
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    contentContainer.appendChild(titleEl);

    let lineBreakEl = document.createElement('br');
    contentContainer.appendChild(lineBreakEl);

    let linkEl = document.createElement('a');
    linkEl.classList.add('result-url');
    linkEl.textContent = link;
    linkEl.href = link;
    linkEl.target = "_blank";
    contentContainer.appendChild(linkEl);

    let lineBreakEl2 = document.createElement('br');
    contentContainer.appendChild(lineBreakEl2);

    let descriptionEl = document.createElement('a');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    contentContainer.appendChild(descriptionEl);
}

function displaySearch(searchResults) {
    loading.classList.toggle('d-none');
    for (let result of searchResults) {
        addToview(result);
    }
}

function showSearchResults(event) {
    console.log(event.key);
    if (event.key === "Enter") {

        loading.classList.toggle('d-none');
        searchResults.textContent = "";
        let userInputValue = userInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInputValue;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displaySearch(search_results);
            });
    }
}

userInput.addEventListener('keydown', showSearchResults);