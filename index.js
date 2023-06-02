const searchinputEl = document.querySelector(".search_input");
const contentEl = document.querySelector(".content");
const moviecontainerEl = document.querySelector(".movie_container");
document.querySelector(".search_btn").addEventListener("click", movieInput);

function movieInput() {
  moviecontainerEl.innerHTML = "";
  makeAPICall(searchinputEl.value);
}

async function makeAPICall(search) {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=1ca668cb&s=${search}`
    );
    const data = await res.json();
    console.log(data);
    console.log(data.Search[0]);
    makeTitleCall(data);
  } catch (error) {
    console.log(error);
    contentEl.style.display = "flex";
    contentEl.innerHTML = `<h1> Unable to find what you're looking for. Please search again. </h1>`;
  }
}

async function makeTitleCall(data) {
  const imdbID = data.Search.map((e) => e.imdbID);
  console.log(imdbID);
  imdbID.forEach(async (id) => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=1ca668cb&s&i=${id}
  `);
    const movieData = await res.json();
    console.log(movieData);
    renderMovie(movieData);
  });
}

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

  document
    .querySelectorAll(".plus_icon")
    .forEach((icon) => icon.addEventListener("click", filterMovie));

  async function filterMovie(e) {
    const movieID = e.target.dataset.imdb;
    console.log(movieID);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=1ca668cb&s&i=${movieID}`
    );
    const data = await res.json();
    console.log(data);
    localStorage.setItem(movieID, JSON.stringify(data));
  }
}

makeAPICall("Toy Story");
