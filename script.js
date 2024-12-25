const apiKey = "33839a7ed2a04472ae2551d7ef680a61"; // Your API key
const blogContainer = document.getElementById("blog_container");
const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching top headlines: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data); // Debugging: Check if the API response is correct
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching news query: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data); // Debugging: Check if the API response is correct
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = ""; // Clear the container first

  if (articles.length === 0) {
    blogContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }

  articles.forEach((article) => {
    if (!article.title || !article.description || !article.urlToImage) return;

    const blogCard = document.createElement("div");
    blogCard.classList.add("blog_card");

    const img = document.createElement("img");
    img.src = article.urlToImage || "https://placehold.co/600x400";
    img.alt = article.title || "No title available";

    const title = document.createElement("h2");
    title.textContent =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;

    const description = document.createElement("p");
    description.textContent =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
});

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  } else {
    alert("Please enter a search term.");
  }
});
``;
