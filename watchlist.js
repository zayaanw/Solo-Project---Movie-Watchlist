const searchinputEl = document.querySelector(".search_input");
const contentEl = document.querySelector(".content");
const moviecontainerEl = document.querySelector(".movie_container");

getKeys();

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
        <img class="star_icon" src='images/staricon.png'>
        <div>${imdbRating}</div>
      </div>
      <div class="movie_desc">
        <div>${Runtime}</div>
        <div>${Genre}</div>
        <div class="watchlist_container">
        <img data-imdb=${imdbID} class="plus_icon"  src='images/removeicon.png'>
        <div class="watchlist">Remove</div>
        </div>
      </div>
       <div class="plot">${Plot}</div> 
    </div>
    </div>`;

  document
    .querySelectorAll(".plus_icon")
    .forEach((icon) => icon.addEventListener("click", removeMovie));
}

function removeMovie(e) {
  document.querySelector(".removed_text").classList.add("visble");
  setTimeout(() => {
    document.querySelector(".removed_text").classList.remove("visble");
  }, 2000);
  const movieID = e.target.dataset.imdb;
  localStorage.removeItem(movieID);
  if (localStorage.length === 0) {
    contentEl.style.display = "flex";
    moviecontainerEl.innerHTML = "";
  } else getKeys();
}

function getKeys() {
  moviecontainerEl.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    renderMovie(JSON.parse(localStorage.getItem(key)));
  }
}
