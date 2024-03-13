const key = "9b23ce95";
const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");
const display = document.getElementById("result");


let findMovie = () => {
    let movieName = searchInput.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    display.innerHTML = ``;
    if (movieName.length <= 0) {
        display.innerHTML = `<h3 class="msg"></h3>`;
    } else {
        fetch(url).then((response) => response.json()).then((data) => {
            if (data.Response == "True") {
                unload();
                display.innerHTML = `
                <div class="post">
                    <img src="${data.Poster}" alt="" class="poster">
                    <div>
                        <h1 class="topic">${data.Title}</h1>
                        <div class = "movie_type">
                            <h3>Writer: </h3>
                            <h4>${data.Writer}</h4>
                        </div>
                        <div class="details">
                            <h3>Rating: </h3>
                            <i class="bi bi-star-fill"></i>
                            <h4>${data.imdbRating}/10</h4>
                        </div>
                        <div class="details">
                            <h3>Details: </h3>
                            <span>${data.Released}</span>
                            <span>${data.Rated}</span>
                        </div>
                        <div class="details">
                            <h3>Country: </h3>
                            <h4>${data.Country}</h4>
                        </div>
                        <div class="details">
                            <h3>Awards: </h3>
                            <h4>${data.Awards}</h4>
                        </div>
                        <div class="genre">
                            <h3>Genre: </h3>
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot: </h3>
                <p>${data.Plot}</p>
                <h3>Cast: </h3>
                <p>${data.Actors}</p> `;
            } else {
                unload();
                display.innerHTML = `<h3 class = "msg">${data.Error}</h3>`;
            }
        })
    }

}

searchBtn.addEventListener("click", findMovie);
searchBtn.addEventListener("keypress", findMovie());

searchInput.addEventListener("keypress", function (find) {
    // If the user presses the "Enter" key on the keyboard
    if (find.key === "Enter") {
        // Cancel the default action, if needed
        find.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search_btn").click();
    }
});


window.addEventListener("load", findMovie);


function load() {
    let spin = document.getElementById("ring");
    // document.getElementById("msg").style.display = "none";
    spin.style.display = "block";
}

function unload() {
    let spin = document.getElementById("ring");
    spin.style.display = "none";
}