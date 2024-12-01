const contenedor = document.getElementById("contenedor");

let movies = [];

fetch("peliculas.json")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    movies = data;
  });

//Función para mostrar las películas
function showMovies(moviesArray) {
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = ""; // Limpiar el contenedor

  moviesArray.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const title = document.createElement("h2");
    title.textContent = movie.Title;
    movieDiv.appendChild(title);

    const poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.alt = movie.Title + " poster";
    movieDiv.appendChild(poster);

    const rating = document.createElement("p");
    rating.textContent = "Rating: " + movie.imdbRating;
    rating.classList.add("rating");
    movieDiv.appendChild(rating);

    moviesContainer.appendChild(movieDiv);
  });
}

// Función para buscar películas
function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchInput)
  );
  showMovies(filteredMovies);
}

// Función para aplicar filtros
function applyFilters() {
  const year = document.getElementById("year").value;
  const title = document.getElementById("title").value.toLowerCase();
  const rating = document.getElementById("rating").value.toLowerCase();
  const releaseDate = document.getElementById("releaseDate").value;

  let filteredMovies = movies;

  if (year) {
    filteredMovies = filteredMovies.filter((movie) => movie.Year == year);
  }

  if (title) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(title)
    );
  }

  if (rating) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.Rated.toLowerCase().includes(rating)
    );
  }

  if (releaseDate) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.Released === releaseDate
    );
  }

  showMovies(filteredMovies);
}

// Función para obtener las mejores películas por rating
function topMoviesByRating() {
  const sortedMovies = movies
    .sort((a, b) => b.imdbRating - a.imdbRating)
    .slice(0, 3);
  showMovies(sortedMovies);
}

// Función para ordenar por fecha de lanzamiento
function sortByReleaseDate() {
  const sortedMovies = movies.sort(
    (a, b) => new Date(a.Released) - new Date(b.Released)
  );
  showMovies(sortedMovies);
}

// Función para ordenar alfabéticamente por título
function sortByTitle() {
  const sortedMovies = movies.sort((a, b) => a.Title.localeCompare(b.Title));
  showMovies(sortedMovies);
}

// Mostrar todas las películas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  showMovies(movies);
});
