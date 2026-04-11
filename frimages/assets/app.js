const API = "https://portal.purplevortx.com";

async function upload() {
    const file = document.getElementById("file").files[0];
    const form = new FormData();
    form.append("image", file);

    await fetch(API + "/upload", {
        method: "POST",
        headers: { Authorization: "Bearer " + getToken() },
        body: form
    });

    loadFeed();
}

async function loadFeed() {
    const res = await fetch(API + "/feed", {
        headers: { Authorization: "Bearer " + getToken() }
    });

    const data = await res.json();
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

loadFeed();