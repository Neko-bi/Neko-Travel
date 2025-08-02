// Fetch data from JSON
async function fetchData() {
  try {
    const response = await fetch('neko_travel_api.json');
    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
    return {};
  }
}

 //Search on enter press
const searchButton=document.getElementById('searchBtn');

  searchButton.onclick = searchKeyword;
document.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     searchKeyword();
   }
});

// Search Function
async function searchKeyword() {
  const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!keyword) {
    resultsContainer.innerHTML = "<p>Please enter a keyword.</p>";
    return;
  }

  const data = await fetchData();
  const matchedResults = [];

  // City Search
  data.countries.forEach(country => {
    if (country.name.toLowerCase().includes(keyword)) {
      country.cities.forEach(city => matchedResults.push({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description
      }));
    } else {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
          matchedResults.push({
            name: city.name,
            imageUrl: city.imageUrl,
            description: city.description
          });
        }
      });
    }
  });

  // Temple Search
  if (keyword.includes("temple") || keyword === "temples") {
    data.temples.forEach(temple => matchedResults.push({
      name: temple.name,
      imageUrl: temple.imageUrl,
      description: temple.description
    }));
  } else {
    data.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: temple.name,
          imageUrl: temple.imageUrl,
          description: temple.description
        });
      }
    });
  }

  // Beach Search
  if (keyword.includes("beach") || keyword === "beaches") {
    data.beaches.forEach(beach => matchedResults.push({
      name: beach.name,
      imageUrl: beach.imageUrl,
      description: beach.description
    }));
  } else {
    data.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: beach.name,
          imageUrl: beach.imageUrl,
          description: beach.description
        });
      }
    });
  }

  // Display Results
  if (matchedResults.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  matchedResults.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" width="300" alt="${place.name}">
      <p>${place.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

// Clear Button Function
function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}