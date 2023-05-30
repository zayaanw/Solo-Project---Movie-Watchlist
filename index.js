const searchinputEl = document.querySelector(".search_input");

const contentEl = document.querySelector(".content");

document.querySelector(".search_btn").addEventListener("click", movieInput);

function movieInput() {
  makeAPICall(searchinputEl.value);
}

async function makeAPICall(search) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=1ca668cb&s=${search}`
  );
  const data = await res.json();
  console.log(data.Search[0]);
  renderMovie(data.Search[0]);
}

function renderMovie(movie) {
  contentEl.innerHTML = "";
  const { Title, Poster, Year } = movie;
  console.log(Title);
  console.log(Poster);
  console.log(Year);
}
