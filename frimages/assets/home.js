const API = "https://portal.purplevortx.com";

fetch(API + "/public-feed")
    .then(res => res.json())
    .then(data => {
        const feed = document.getElementById("feed");

        data.forEach(img => {
            feed.innerHTML += `
        <div class="image-card">
          <img src="${API}/image/${img.id}">
        </div>
      `;
        });
    });