const grid = document.getElementById("video-grid");
const player = document.getElementById("player");
const playerVideo = document.getElementById("playerVideo");

// how many videos you have
const TOTAL_VIDEOS = 7;

for (let i = 1; i <= TOTAL_VIDEOS; i++) {
  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <video src="/download/Port2/${i}.mp4" muted></video>
    <p>Video ${i}</p>
  `;

  card.onclick = () => playVideo(i);
  grid.appendChild(card);
}

function playVideo(id) {
  playerVideo.src = `/download/Port2/${id}.mp4`;
  player.classList.remove("hidden");
}

function closePlayer() {
  playerVideo.pause();
  player.classList.add("hidden");
}
