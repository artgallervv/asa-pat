
const petCursor = document.getElementById("petCursor");
const characterWrapper = document.getElementById("characterWrapper");
const characterHover = document.getElementById("characterHover");


let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});




function setCharacterState(state) {
  if (state === "idle") {
    character.src = "image/asa_idle.png";
  }

  if (state === "ready") {
    character.src = "image/asa.png";
  }

  if (state === "sad") {
    character.src = "image/asa_mad.png";
  }

  if (state === "happy") {
    character.src = "image/asa_happy.png";
  }
}



const petSound = new Audio("petting.mp3");
petSound.loop = true;
petSound.volume = 0.4;

const character = document.getElementById("character");
const progressBarContainer = document.querySelector(".progress-bar");
const progressBar = document.getElementById("progress");
const message = document.getElementById("message");
const counterText = document.getElementById("counter");
const instruction = document.getElementById("instruction");

let progress = 0;
let petting = false;
let success = false;
let mode = "idle";

let lastInteraction = Date.now();
let sad = false;
let audioUnlocked = false;

// pet counter init
let petCount = localStorage.getItem("petCount") || 0;
counterText.textContent = `You've given Asa ${petCount} pats so far!`;


// clicking character stuff
character.addEventListener("click", () => {

  // unlock audio on first interaction [IM ADDING THE AUDIO IN LATER IM TOO TIRED LOL]
  if (!audioUnlocked) {
    petSound.play().then(() => {
      petSound.pause();
      petSound.currentTime = 0;
      audioUnlocked = true;
    });
  }

  if (mode !== "idle") return;

  mode = "ready";
  lastInteraction = Date.now();
  sad = false;

  character.src = "image/asa.png";
  character.style.width = "260px";

  instruction.textContent = "Hold down left click to pat Asa!!";
  progressBarContainer.classList.remove("hidden");
});


// keys
character.addEventListener("mouseenter", () => {
  hoveringCharacter = true;
});

character.addEventListener("mouseleave", () => {
  hoveringCharacter = false;
  petting = false;
  document.body.classList.remove("petting");
  petCursor.style.display = "none";
});


character.addEventListener("mousedown", (e) => {

    characterHover.style.opacity = 0;
characterHover.style.visibility = "hidden";
document.body.classList.add("petting");

  if (!hoveringCharacter) return;

  petting = true;
  lastInteraction = Date.now();

  document.body.classList.add("petting");
  petCursor.style.display = "block";

  if (!audioUnlocked) {
    petSound.play().then(() => {
      petSound.pause();
      petSound.currentTime = 0;
      audioUnlocked = true;
    });
  }
});

document.addEventListener("mouseup", () => {
  petting = false;

  document.body.classList.remove("petting");
  petCursor.style.display = "none";

  petSound.pause();
  petSound.currentTime = 0;
});


// heart setup
function spawnParticle() {
  const rect = character.getBoundingClientRect();
  const particle = document.createElement("img");

  particle.src = "image/heart.png";
  particle.className = "particle";

  particle.style.left = rect.left + Math.random() * rect.width + "px";
  particle.style.top = rect.top + rect.height * 0.1 + "px";

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}


// game
function gameLoop() {

  if (mode === "ready") {

    // progress logic
    if (petting && !success) progress += 0.3;
    else if (!petting && progress > 0) progress -= 0.45;

    progress = Math.max(0, Math.min(100, progress));
    progressBar.style.width = progress + "%";

    // hearts while petting
    if (petting && !success && Math.random() < 0.25) {
      spawnParticle();
    }

const secondsIdle = (Date.now() - lastInteraction) / 1000;

if (mode === "ready" && !success) {

  if (petting) {
    // get rid of sadness
    if (sad) {
      sad = false;
      setCharacterState("ready");
      message.textContent = "";
    }

  } else {

    // becoming sad
    if (secondsIdle > 2 && !sad) {
      sad = true;
      setCharacterState("sad");
      message.textContent = "STOP IGNORING ASA!!!!!";
    }
  }
}
  }

  // happy
  if (progress >= 100 && !success) {
    success = true;
    mode = "success";

    character.src = "image/asa_happy.png";
    message.textContent = "Asa is happy now! yay!!!";

    petCount++;
    localStorage.setItem("petCount", petCount);
    counterText.textContent = `You've now pat Asa ${petCount} times!`;
  }

  requestAnimationFrame(gameLoop);

  document.body.style.setProperty("--pet-intensity", progress / 100);
}

gameLoop();





let handPulse = false;

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p" && !handPulse) {
    handPulse = true;

    character.style.transform = "scale(1.05)";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "p") {
    handPulse = false;

    character.style.transform = "scale(1)";
  }
});


function cursorLoop() {
  petCursor.style.left = mouseX + "px";
  petCursor.style.top = mouseY + "px";

  requestAnimationFrame(cursorLoop);
}

cursorLoop();



characterWrapper.addEventListener("mouseenter", () => {
  if (mode === "idle" && !petting) {
    characterHover.style.opacity = 1;
    characterHover.style.visibility = "visible";
  }
});

characterWrapper.addEventListener("mouseleave", () => {
  characterHover.style.opacity = 0;
  characterHover.style.visibility = "hidden";
});

