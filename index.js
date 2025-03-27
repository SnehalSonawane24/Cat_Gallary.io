const API_URL = "https://api.thecatapi.com/v1/images/search?api_key=live_wJV5u9f54uHVSi0dcs8Y7vUnu45sXdH7wn5S1LiORkaFVyUSeB5MiQAnXBsSi2a6&limit=10";
const grid = document.getElementById("grid");
const loadMoreBtn = document.getElementById("loadMore");

// Fetch cat images
async function loadCats() {
    grid.innerHTML = "";

    try {
        const response = await fetch(API_URL);
        const cats = await response.json();

        cats.forEach(cat => {
            let img = document.createElement("img");
            img.src = cat.url;
            grid.appendChild(img);
        });
    } catch (error) {
        console.error("Error fetching cats:", error);
    }
}

// Event Listener
loadMoreBtn.addEventListener("click", loadCats);

// Initial Load
loadCats();
