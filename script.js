const apiKey = "33839a7ed2a04472ae2551d7ef680a61"; // Your API key
const blogContainer = document.getElementById("blog_container");

const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

async function fetchRandomNews() {
  try {
    // Construct the API URL to fetch top headlines
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apiKey}`;

    // Fetch data from the News API
    const response = await fetch(apiUrl);

    // Convert response to JSON
    const data = await response.json();

    // Log the data to debug if needed
    console.log(data);

    // Return the articles array from the API response
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim(); // Correct property for getting input value
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  } else {
    alert("Please enter a search term"); // Optionally, alert if input is empty
  }
});

async function fetchNewsQuery(query) {
  try {
    // Construct the API URL to fetch top headlines
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`;

    // Fetch data from the News API
    const response = await fetch(apiUrl);

    // Convert response to JSON
    const data = await response.json();

    // Log the data to debug if needed
    console.log(data);

    // Return the articles array from the API response
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

function displayBlogs(articles) {
  // Clear the blog container before displaying new content
  blogContainer.innerHTML = "";

  // Loop through each article and create a blog card
  articles.forEach((article) => {
    // Skip articles that are missing title, description, or image
    if (!article.title || !article.description || !article.urlToImage) {
      return; // Skip this article if any essential content is missing
    }

    // Create a new blog card element
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog_card");

    // Create an image element for the article's image
    const img = document.createElement("img");
    img.src = article.urlToImage || "https://placehold.co/600x400"; // Fallback image if urlToImage is missing
    img.alt = article.title || "No title available";

    // Create a title element for the article
    const title = document.createElement("h2");
    // Truncate the title if it is longer than 30 characters
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    // Set the truncated title as the content of the title element
    title.textContent = truncatedTitle;

    // Create a description element for the article
    const description = document.createElement("p");
    // Truncate the description if it is longer than 120 characters
    const truncatedDescription =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    // Set the truncated description as the content of the description element
    description.textContent = truncatedDescription;

    // Append the elements to the blog card
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    // Append the blog card to the container
    blogContainer.appendChild(blogCard);
  });
}

// Ensure that the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch articles from the API
    const articles = await fetchRandomNews();

    // Display the fetched articles
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
});
