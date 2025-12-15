// Load saved game
let clicks = parseInt(localStorage.getItem("clicks") || 0);
let level = parseInt(localStorage.getItem("level") || 1);
let multiplier = parseInt(localStorage.getItem("multiplier") || 1);
let autoClick = localStorage.getItem("autoClick") === "true";


const ammar = document.getElementById("ammar");
const savedImage = localStorage.getItem("currentImage");
if (savedImage) ammar.src = savedImage;
const countText = document.getElementById("count");
const levelText = document.getElementById("level");
const multText = document.getElementById("multiplier");

const clickSound = new Audio("sounds/click.mp3");
const levelSound = new Audio("sounds/level.mp3");

// Update UI
function updateUI() {
  countText.textContent = "Clicks: " + clicks;
  levelText.textContent = "Level: " + level;
  multText.textContent = "Multiplier: x" + multiplier;
}
updateUI();

// Save game
function saveGame() {
  localStorage.setItem("clicks", clicks);
  localStorage.setItem("level", level);
  localStorage.setItem("multiplier", multiplier);
  localStorage.setItem("autoClick", autoClick);
  localStorage.setItem("currentImage", ammar.src);
}



// Level system
function checkLevel() {
  const thresholds = [0, 100, 300, 800, 1500, 5000, 10000, 50000, 100000];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (clicks >= thresholds[i]) {
      if (level !== i + 1) {
        level = i + 1;
ammar.src = "images/" + level + ".png";
localStorage.setItem("currentImage", ammar.src);
        levelSound.currentTime = 0;
        levelSound.play();
        saveGame();
      }
      break;
    }
  }
}


// Click event
ammar.addEventListener("click", () => {
  clicks += multiplier;

  // restart click sound instantly
  clickSound.pause();
  clickSound.currentTime = 0;
  clickSound.play();

  checkLevel();
  updateUI();
  saveGame();
});


// Shop buttons
document.getElementById("buy1").onclick = () => buyUpgrade(200, 1);
document.getElementById("buy2").onclick = () => buyUpgrade(600, 5);
document.getElementById("buy3").onclick = () => buyAutoClick(1500);


// Buy multiplier
function buyUpgrade(cost, amount) {
  if (clicks >= cost) {
    clicks -= cost;
    multiplier += amount;
    updateUI();
    saveGame();
  }
}

// Auto clicker
function buyAutoClick(cost) {
  if (autoClick) return;
  if (clicks >= cost) {
    clicks -= cost;
    autoClick = true;
    startAutoClick();
    updateUI();
    saveGame();
  }
}

function startAutoClick() {
  setInterval(() => {
    if (autoClick) {
      clicks += 1;
      checkLevel();
      updateUI();
      saveGame();
    }
  }, 1000);
}

if (autoClick) startAutoClick();


// === SHOP POPUP ===
const shopIcon = document.getElementById("shop-icon");
const popup = document.getElementById("shop-popup");
const closePopup = document.getElementById("close-popup");

shopIcon.onclick = () => {
  popup.style.display = "flex";
};

closePopup.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};


const moneyContainer = document.getElementById("money-container");
const moneyImage = "images/money.png";

// Function to spawn a money drop
function spawnMoney() {
  const money = document.createElement("img");
  money.src = moneyImage;
  money.classList.add("money");

  // Random horizontal position
  const xPos = Math.random() * (window.innerWidth - 50);
  money.style.left = xPos + "px";
  money.style.top = "-50px";

  moneyContainer.appendChild(money);

  // Animate falling
  let pos = -50;
  const fallSpeed = 3 + Math.random() * 3; // random speed
  const interval = setInterval(() => {
    pos += fallSpeed;
    money.style.top = pos + "px";
    if (pos > window.innerHeight) {
      money.remove(); // remove if it reaches bottom
      clearInterval(interval);
    }
  }, 16);

  // Catching money
  money.addEventListener("click", () => {
    clicks += 10; // add 10 clicks per money
    updateUI();
    saveGame();
    money.remove();
    clearInterval(interval);
  });
}

// Spawn money every 2-5 seconds randomly
setInterval(() => {
  spawnMoney();
}, 2000 + Math.random() * 3000);


const buySound = new Audio("sounds/buy.mp3"); // add your buy sound

function showBuyNotification(text) {
  const notif = document.getElementById("buy-notification");
  notif.textContent = text;
  notif.style.opacity = "1";
  notif.style.transform = "translateY(0)";
  
  // Hide after 1.5 seconds
  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transform = "translateY(-20px)";
  }, 1500);
}

// Update your buy functions
function buyUpgrade(cost, amount) {
  if (clicks >= cost) {
    clicks -= cost;
    multiplier += amount;
    updateUI();
    saveGame();
    
    // Play sound & show notification
    buySound.currentTime = 0;
    buySound.play();
    showBuyNotification(`Bought +${amount} clicks!`);
  }
}

function buyAutoClick(cost) {
  if (autoClick) return;
  if (clicks >= cost) {
    clicks -= cost;
    autoClick = true;
    startAutoClick();
    updateUI();
    saveGame();
    
    buySound.currentTime = 0;
    buySound.play();
    showBuyNotification("Auto Clicker Activated!");
  }
}


const bgMusic = new Audio("sounds/bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

const musicToggle = document.getElementById("music-toggle");
let musicPlaying = false; // tracks if music is currently playing

// Function to update button image
function updateMusicButton() {
  if (bgMusic.paused) {
    musicToggle.src = "images/mute.png";
  } else {
    musicToggle.src = "images/Musicbutton.png";
  }
}

// Ensure first user interaction starts music if allowed
document.body.addEventListener("click", () => {
  if (!musicPlaying) {
    bgMusic.play().catch(() => {}); // ignore autoplay errors
    musicPlaying = true;
    updateMusicButton();
  }
}, { once: true });

// Toggle music on button click
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
  updateMusicButton();
});


// PRO LOADING SYSTEM
const tips = [
  "Tip: Keep clicking to level up faster!",
  "Tip: Buy upgrades early for maximum value.",
  "Tip: Auto clickers stack with multipliers.",
  "Tip: The shop resets on level-up. Use it wisely!",
  "Tip: Save money for big upgrades."
];

document.getElementById("loading-tip").innerText =
  tips[Math.floor(Math.random() * tips.length)];

window.addEventListener("load", () => {
  // Wait for progress animation
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 2800);
});
