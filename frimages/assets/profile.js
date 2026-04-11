const API = "https://portal.purplevortx.com";

async function loadProfile() {
  const res = await fetch(API + "/feed", {
    headers: { Authorization: "Bearer " + getToken() }
  });

  const data = await res.json();

  document.getElementById("email").innerText = "Your Images";

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  data.forEach(img => {
    feed.innerHTML += `
      <div class="image-card">
        <img src="${API}/image/${img.id}">
      </div>
    `;
  });
}

loadProfile();