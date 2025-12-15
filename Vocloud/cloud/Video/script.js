const grid = document.getElementById("video-grid");
const searchBar = document.getElementById("searchBar");

let videos = [];
// Auto-detect videos in Port2
for(let i=1;;i++){
  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', `Port2/${i}.mp4`, false);
  xhr.send();
  if(xhr.status == 404) break;
  videos.push(i);
}

// Show skeleton loader first
function showSkeleton(count = 8){
  grid.innerHTML = "";
  for(let i=0;i<count;i++){
    const skeleton = document.createElement("div");
    skeleton.className="video-card";
    skeleton.innerHTML = `
      <div class="skeleton" style="height:140px;"></div>
      <div class="skeleton-text"></div>
    `;
    grid.appendChild(skeleton);
  }
}

// Render video cards
function renderGrid(filter=""){
  grid.innerHTML="";
  videos.forEach(i=>{
    if(!(`Video ${i}`.toLowerCase().includes(filter.toLowerCase()))) return;
    const card = document.createElement("div");
    card.className="video-card";
    card.innerHTML=`<video src="Port2/${i}.mp4" muted loop></video><p>Video ${i}</p>`;
    card.onmouseenter = e=>card.querySelector('video').play();
    card.onmouseleave = e=>card.querySelector('video').pause();
    card.onclick = ()=>window.location.href=`player.html?vid=${i}`;
    grid.appendChild(card);
  });
}

// Show skeleton first, then load real videos after short delay
showSkeleton();
setTimeout(()=>renderGrid(), 1000); // 1 second simulated load

// Search filter
searchBar.addEventListener("input", e=>renderGrid(e.target.value));
