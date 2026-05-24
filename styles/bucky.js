
const squishSound = new Audio("audio/bucky-dies.mp3");

squishSound.volume = 0.6;
squishSound.preload = "auto";






const eventLayer = document.getElementById("eventLayer");
const eventCountText = document.getElementById("eventCount");

let randomEventCount =
  parseInt(localStorage.getItem("randomEventCount")) || 0;

eventCountText.textContent = randomEventCount;



function spawnRandomEvent() {

  const event = document.createElement("img");

  // default sprite
  event.src = "image/bucky.png";

  event.className = "randomEvent";

  // random horizontal position
  const startX = Math.random() * (window.innerWidth - 120);

  event.style.left = startX + "px";

  // random fall duration
  const duration = 7 + Math.random() * 2;

  event.style.animationDuration = duration + "s";

  eventLayer.appendChild(event);

  let clicked = false;

  // click logic
  event.addEventListener("click", () => {

    if (clicked) return;
    clicked = true;
    playHitSound();

    // clicked sprite
    event.src = "image/bucky-squash.png";

    event.classList.add("clicked");

    randomEventCount++;

    localStorage.setItem(
      "randomEventCount",
      randomEventCount
    );

    eventCountText.textContent = randomEventCount;

    setTimeout(() => {
      event.remove();
    }, 600);

  });

  // auto remove if missed
  setTimeout(() => {

    if (!clicked) {

      event.style.transition = "opacity 2s ease";
      event.style.opacity = 0;

      setTimeout(() => {
        event.remove();
      }, 1000);

    }

  }, duration * 1000);

}


function randomEventLoop() {

  // random chance
  const delay =
    8000 + Math.random() * 15000;

  setTimeout(() => {

    spawnRandomEvent();

    randomEventLoop();

  }, delay);

}

randomEventLoop();



function playSquish() {

  if (!soundEnabled) return;

  squishSound.currentTime = 0;

  squishSound.play().catch(() => {});

}


function playHitSound() {

  if (typeof soundEnabled !== "undefined" && !soundEnabled) return;

  squishSound.currentTime = 0;

  squishSound.play().catch(err => {
    console.log("Squish sound failed:", err);
  });

}

localStorage.setItem("randomEventCount", randomEventCount);