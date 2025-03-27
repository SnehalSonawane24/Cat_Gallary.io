const API_KEY = "live_wJV5u9f54uHVSi0dcs8Y7vUnu45sXdH7wn5S1LiORkaFVyUSeB5MiQAnXBsSi2a6";
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
const grid = document.getElementById("grid");
const loadMoreBtn = document.getElementById("loadMore");
const breedSelect = document.getElementById("breedSelect");
const limitSelect = document.getElementById("limitSelect");

async function loadBreeds() {
    try {
        const response = await fetch(BREEDS_URL, { headers: { "x-api-key": API_KEY } });
        const breeds = await response.json();
        
        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading breeds:", error);
    }
}

async function loadCats() {
    grid.innerHTML = "";

    const breedId = breedSelect.value;
    const limit = limitSelect.value;
    let url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${API_KEY}`;

    if (breedId) {
        url += `&breed_ids=${breedId}`;
    }

    try {
        const response = await fetch(url);
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

loadMoreBtn.addEventListener("click", loadCats);
breedSelect.addEventListener("change", loadCats);
limitSelect.addEventListener("change", loadCats);

loadBreeds();
loadCats();
