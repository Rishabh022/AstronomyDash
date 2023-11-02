// for scroll
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  const navbar = document.getElementById("navbar");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    navbar.style.backgroundColor = "black";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
};

// news api
const apiKey = "wX2eDb05lcZeCksCzJ1FyENUpsGxQLg7kfWYzD8h";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=20`;

function getFormattedDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

async function getSpaceNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      displaySpaceNews(data);
    } else {
      throw new Error(`Failed to fetch space news. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching space news:", error.message);
    displayErrorMessage();
  }
}

function displaySpaceNews(newsArray) {
  const newsContainer = document.getElementById("newsContainer");

  // Create an unordered list
  const newsList = document.createElement("ul");

  // Loop through each news item and display
  newsArray.forEach((news) => {
    const newsItemContainer = document.createElement("li");

    const newsItem = document.createElement("div");
    newsItem.classList.add("big-box", "newsbox");

    const newsImgContainer = document.createElement("div");
    newsImgContainer.classList.add("box-img");

    const newsImg = document.createElement("img");
    newsImg.src = news.url;
    newsImg.alt = news.title;

    // Define the dimensions and borderRadius based on the screen size or container
    if (window.innerWidth < 1000) {
      // Adjust values for small screens
      newsImg.style.height = "200px";
      newsImg.style.width = "200px";
      newsImg.style.borderRadius = "10px";
    } else {
      // Default values for larger screens
      newsImg.style.height = "350px";
      newsImg.style.width = "350px";
      newsImg.style.borderRadius = "25px";
    }

    newsImg.style.backgroundColor = "transparent";

    newsImgContainer.appendChild(newsImg);

    const newsTextContainer = document.createElement("div");
    newsTextContainer.classList.add("box-text");

    const newsText = document.createElement("div");
    newsText.classList.add("text");

    const newsContent = document.createElement("div");
    newsContent.classList.add("news-item");

    newsContent.innerHTML = `
            <h2>${news.title}</h2>
            <p>${news.explanation}</p>
            <p><strong>Date:</strong> ${getFormattedDate(news.date)}</p>
        `;

    newsText.appendChild(newsContent);
    newsTextContainer.appendChild(newsText);

    newsItem.appendChild(newsImgContainer);
    newsItem.appendChild(newsTextContainer);
    newsItemContainer.appendChild(newsItem);
    newsList.appendChild(newsItemContainer);
  });

  // Append the unordered list to the news container
  newsContainer.appendChild(newsList);
}

function displayErrorMessage() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML =
    '<p style="color:white; text-align:center; top:500px; position:relative">Error fetching space news. Please try again later.</p>';
}

// Call the function to get and display space news every time
setInterval(getSpaceNews, 60000); // Fetch every 1 minute (adjust as needed)
getSpaceNews();

// Movies
document.addEventListener("DOMContentLoaded", fetchHollywoodMovies);

async function fetchHollywoodMovies() {
  const apiKey = "d506cd4af7d47ca276465c7d470fa450"; // Replace with your TMDb API key
  const hollywoodStudios = ["6194", "923", "33", "4", "56"]; // IDs of major Hollywood studios
  const studioQueryParam = hollywoodStudios
    .map((id) => `with_companies=${id}`)
    .join("&");
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&query=space&${studioQueryParam}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    displayMovies(data.results);
  } catch (error) {
    console.error(error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const titleElement = document.createElement("h2");
    titleElement.className = "movie-title"; // Add this line
    titleElement.textContent = movie.title;

    const imageElement = document.createElement("img");
    imageElement.className = "movie-poster"; // Add this line
    imageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    imageElement.alt = `${movie.title} Poster`;

    const tmdbLink = document.createElement("a");
    tmdbLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
    tmdbLink.target = "_blank";
    tmdbLink.textContent = "View on TMDb";

    movieCard.appendChild(titleElement);
    movieCard.appendChild(imageElement);
    movieCard.appendChild(tmdbLink);

    moviesContainer.appendChild(movieCard);
  });
}

// header
fetch("header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;
  });

// footer
fetch("footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer-container").innerHTML = html;
  });

// const bar = document.getElementById("bar");
// const nav = document.getElementById("navbar");
// const close = document.getElementById("close");

// if (bar) {
//   bar.addEventListener("click", () => {
//     nav.classList.add("active");
//   });
// }
// if (close) {
//   close.addEventListener("click", () => {
//     nav.classList.remove("active");
//   });
// }

// JavaScript to handle responsive navigation
// const menuButton = document.querySelector(".menu-button");
// const navBar = document.querySelector(".nav-bar");

// menuButton.addEventListener("click", () => {
//   navBar.classList.toggle("active");
// });
