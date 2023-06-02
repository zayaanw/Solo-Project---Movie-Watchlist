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
      `https://www.omdbapi.com/?apikey=1ca668cb&s=${search}`
    );
    const data = await res.json();
    makeTitleCall(data);
  } catch (error) {
    console.log(error);
  }
}

async function makeTitleCall(data) {
  try {
    const imdbID = data.Search.map((e) => e.imdbID);
    imdbID.forEach(async (id) => {
      const res =
        await fetch(`https://www.omdbapi.com/?apikey=1ca668cb&s&i=${id}
    `);
      const movieData = await res.json();
      renderMovie(movieData);
    });
  } catch (error) {
    contentEl.style.display = "flex";
    contentEl.innerHTML = `<h1> Unable to find what you're looking for. Please search again. </h1>`;
  }
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
      <img class="star_icon" src='images/staricon.png'>
      <div>${imdbRating}</div>
    </div>
    <div class="movie_desc">
      <div>${Runtime}</div>
      <div>${Genre}</div>
      <div class="watchlist_container">
      <img data-imdb=${imdbID} class="plus_icon"  src='images/plusicon.png'>
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
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=1ca668cb&s&i=${movieID}`
    );
    const data = await res.json();
    localStorage.setItem(movieID, JSON.stringify(data));
    document.querySelector(".added_text").classList.add("visble");
    setTimeout(() => {
      document.querySelector(".added_text").classList.remove("visble");
    }, 2000);
  }
}
