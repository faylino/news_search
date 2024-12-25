const apiKey = "1446a770775aed19e4069f534664dfea"; // Replace with your actual API key
const blogContainer = document.getElementById("blog_container");

const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

// Fetch random news articles
async function fetchRandomNews() {
  try {
    const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&max=10`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Random News Data:", data); // Debugging
    return data.articles || []; // Return articles array from response
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

// Fetch news based on user query
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://gnews.io/api/v4/search?q=${query}&token=${apiKey}&lang=en&max=10`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Search Query News Data:", data); // Debugging
    return data.articles || []; // Return articles array from response
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

// Display blogs
function displayBlogs(articles) {
  // Clear the blog container before displaying new content
  blogContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    blogContainer.innerHTML = "<p>No articles available.</p>";
    return;
  }

  articles.forEach((article) => {
    // Ensure all required fields are available
    if (!article.title || !article.description || !article.image) {
      return; // Skip invalid articles
    }

    const blogCard = document.createElement("div");
    blogCard.classList.add("blog_card");

    const img = document.createElement("img");
    img.src = article.image || "https://placehold.co/600x400";
    img.alt = article.title || "No title available";

    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? `${article.title.slice(0, 30)}...`
        : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDescription =
      article.description.length > 120
        ? `${article.description.slice(0, 120)}...`
        : article.description;
    description.textContent = truncatedDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

// Search Button Event Listener
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query:", error);
    }
  } else {
    alert("Please enter a search term");
  }
});

// Fetch and display random news on page load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news:", error);
  }
});
