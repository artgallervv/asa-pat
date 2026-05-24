

const achievements = [
  {
    id: "hand-grenade",
    pats: 10,
    title: "Hand Grenade",
    description: "A nifty grenade made from the class prez's hand!",
    image: "image/hand-grendade.png"
  },

  {
    id: "uniform-sword",
    pats: 50,
    title: "Super Strong Uniform Sword",
    description: "A sword that comes from Asa's most cherished uniform - the one her mom gave her before she died.",
    image: "image/uniform-sword.png"
  },

  {
    id: "tanaka",
    pats: 100,
    title: "Tanaka Spinal Cord Sword",
    description: "A spinal cord sword made from the namesake body part from no-one's favourite teacher, Mr. Tanaka.",
    image: "image/tanaka-spinal-cord-sword.png"
  },


  {
    id: "aquarium-spear",
    pats: 250,
    title: "Aquarium Spear",
    description: "While trying to escape from the eternal aquarium, Asa made this spear after buying the aquarium for 1 million yen.",
    image: "image/aquarium-spear.png"
  },

 

  {
    id: "oregon-sword",
    pats: 500,
    title: "Oregon Sword",
    description: "A powerful weapon imbewed with the strength of the state of Oregon! I thought it'd look cooler...",
    image: "image/oregon-sword.png"
  },

  {
    id: "chainsaw-motorcycle",
    pats: 1000,
    title: "Chainsaw Motorcycle",
    description: "A strange vehicle modified by Asa to escape from the Falling Devil with a certain chainsaw-headed boy...",
    image: "image/chainsaw-motorcycle.png"
  },


  
  {
    id: "video",
    pats: 1000,
    title: "Thank you!",
    description: "Thank you for playing Asa Pat! I worked hard on it. A special visitor has come, try patting her too!",
    image: "image/verne-asa-mini.png",
    video: "video/asa_reze_vid_small.mp4"
  }


];


let unlockedAchievements =
  JSON.parse(localStorage.getItem("asaAchievements")) || [];


  const achievementToggle =
  document.getElementById("achievementToggle");

const achievementSidebar =
  document.getElementById("achievementSidebar");

achievementToggle.addEventListener("click", () => {
  achievementSidebar.classList.toggle("open");
});

const achievementShelf =
  document.getElementById("achievementShelf");

function renderAchievements() {

  achievementShelf.innerHTML = "";

  achievements.forEach(achievement => {

    const unlocked =
      unlockedAchievements.includes(achievement.id);

    const div = document.createElement("div");

    div.className =
      `achievement ${unlocked ? "unlocked" : "locked"}`;

    div.innerHTML = `
      <img src="${achievement.image}">
      <p>${unlocked ? achievement.title : "???"}</p>
    `;

   if (unlocked) {

  div.style.pointerEvents = "auto";

  div.addEventListener("click", (e) => {

    e.stopPropagation();

    console.log("Opening achievement:", achievement.title);

    openAchievementPopup(achievement);
      console.log("Popup opened");

  modal.style.display = "flex";

  });

}

    achievementShelf.appendChild(div);

  });

}


function checkAchievements() {

  achievements.forEach(achievement => {

    if (
      petCount >= achievement.pats &&
      !unlockedAchievements.includes(achievement.id)
    ) {

      unlockedAchievements.push(achievement.id);

      localStorage.setItem(
        "asaAchievements",
        JSON.stringify(unlockedAchievements)
      );

      showAchievementToast(achievement);

      renderAchievements();
    }

  });

}

  

const achievementToast =
  document.getElementById("achievementToast");

function showAchievementToast(achievement) {

  achievementToast.textContent =
    ` Unlocked: ${achievement.title}!`;

  achievementToast.classList.add("show");

  setTimeout(() => {
    achievementToast.classList.remove("show");
  }, 3000);

}



window.addEventListener("DOMContentLoaded", () => {

  renderAchievements();

});


function openAchievementPopup(achievement) {

  console.log("Popup opened");

  const modal = document.getElementById("achievementModal");

  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalVideo = document.getElementById("modalVideo");

  modalImage.src = achievement.image;
  modalTitle.textContent = achievement.title;
  modalDescription.textContent = achievement.description;

  // reset video
  modalVideo.style.display = "none";
  modalVideo.pause();

  // if achievement has special video
  if (achievement.video) {

    modalVideo.src = achievement.video;
    modalVideo.style.display = "block";

  }

  modal.style.display = "flex";
}


const modal = document.getElementById("achievementModal");

modal.addEventListener("click", (e) => {

  if (e.target === modal) {
    modal.style.display = "none";
  }

});

document
  .getElementById("achievementModalContent")
  .addEventListener("click", (e) => {

    e.stopPropagation();

});