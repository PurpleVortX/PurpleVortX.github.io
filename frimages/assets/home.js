const feed = document.getElementById("feed");

// Fake social feed (replace with backend later)
for (let i = 1; i <= 30; i++) {
  const username = "user" + i;

  feed.innerHTML += `
    <div class="image-card">
      <img src="https://picsum.photos/400?random=${i}">
      <div class="overlay-tag">@${username}</div>
    </div>
  `;
}