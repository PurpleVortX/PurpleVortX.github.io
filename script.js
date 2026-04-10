const API_KEY = "AIzaSyD2Iurcaf1oW6-BIiDbwxHe6Es7-UqdiDk";
const CHANNEL_ID = "UCaoOIkun5N7cpgEgGUkfsgg";

fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

        return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${API_KEY}`);
    })
    .then(res => res.json())
    .then(data => {
        const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(",");

        return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${API_KEY}`);
    })
    .then(res => res.json())
    .then(data => {

        function isRealUpload(video) {
            const duration = video.contentDetails.duration;

            // Convert ISO 8601 duration to minutes
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            const hours = parseInt(match[1] || 0);
            const minutes = parseInt(match[2] || 0);

            const totalMinutes = hours * 60 + minutes;

            // Filter rule: skip long videos (likely streams)
            return totalMinutes < 30;
        }

        const realVideo = data.items.find(isRealUpload);

        if (!realVideo) throw new Error("No valid video found");

        const videoId = realVideo.id;
        const title = realVideo.snippet.title;
        const thumbnail = realVideo.snippet.thumbnails.high.url;
        const link = `https://www.youtube.com/watch?v=${videoId}`;

        document.getElementById("latest-video-link").href = link;
        document.getElementById("latest-video-thumb").src = thumbnail;
        document.getElementById("latest-video-title").textContent = title;
    })
    .catch(err => console.error(err));


// Fade IN on page load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

// Fade OUT on navigation
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignore:
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      this.target === "_blank"
    ) return;

    e.preventDefault();

    document.body.classList.remove("page-loaded");

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

const indicator = document.querySelector(".nav-indicator");
const links = document.querySelectorAll(".topnav a");

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parentRect.left) + "px";
}

// Move on click
links.forEach(link => {
  link.addEventListener("click", () => {
    moveIndicator(link);
  });
});

// Set position on page load (active page)
window.addEventListener("DOMContentLoaded", () => {
  const current = [...links].find(link =>
    link.href === window.location.href
  );

  if (current) {
    moveIndicator(current);
  } else if (links[0]) {
    moveIndicator(links[0]);
  }
});