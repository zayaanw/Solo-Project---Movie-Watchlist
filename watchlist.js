const searchinputEl = document.querySelector(".search_input");
const contentEl = document.querySelector(".content");
const moviecontainerEl = document.querySelector(".movie_container");

function renderMovie(movie) {
  const { Title, Poster, Runtime, Plot, Genre, imdbRating, imdbID } = movie;
  contentEl.style.display = "none";
  moviecontainerEl.innerHTML += `<div class="movie_inner"> 
    <div class="movie_poster">
    <img class="poster_img" src='${Poster}'>
    </div>
    <div class="movie_info">
      <div class="movie_title">
        <div class="title">${Title}</div>
        <img class="star_icon" src='staricon.png'>
        <div>${imdbRating}</div>
      </div>
      <div class="movie_desc">
        <div>${Runtime}</div>
        <div>${Genre}</div>
        <div class="watchlist_container">
        <img data-imdb=${imdbID} class="plus_icon"  src='plusicon.png'>
        <div class="watchlist">Watchlist</div>
        </div>
      </div>
       <div class="plot">${Plot}</div> 
    </div>
    </div>`;
}

for (const key in localStorage) {
  renderMovie(JSON.parse(localStorage.getItem(key)));
  console.log(localStorage.getItem(key));
}