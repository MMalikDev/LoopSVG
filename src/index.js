// Functions
function toggleActiveFrame(previousFrame, nextFrame) {
  previousFrame.classList.remove("active");
  nextFrame.classList.add("active");
}

function cycleFrames(frames, framerate, duration) {
  const delay = 1000 / framerate; // Delay in milliseconds
  const loops = Math.round((60_000 * duration) / delay);
  const availableFrames = frames.length;
  let index = 0;
  for (let cycle = 0; cycle < loops; cycle++) {
    setTimeout(() => {
      const previousIndex = index != 0 ? index - 1 : availableFrames - 1;
      const previousFrame = frames[previousIndex];
      const nextFrame = frames[index];

      index++;
      if (index == availableFrames) index = 0;

      toggleActiveFrame(previousFrame, nextFrame);
    }, cycle * delay);
  }
}

function handleAnimations(framerate, duration) {
  const animations = document.querySelectorAll(".animation");
  animations.forEach((element) => {
    const frames = element.querySelectorAll(".frame");
    cycleFrames(frames, framerate, duration);
  });
}

function init_cards(data) {
  const section = document.querySelector("#content .cards");
  const cardTemplate = section.querySelector("template");

  for (const d of data) {
    const content = cardTemplate.content.cloneNode(true);
    content.querySelector("h2").innerText = d.title;

    const frameSection = content.querySelector(".animation");
    const frameTemplate = frameSection.querySelector("template");
    for (const frame of d.frames) {
      const subContent = frameTemplate.content.cloneNode(true);
      subContent.querySelector("img").src = frame;
      subContent.querySelector("img").alt = frame.replaceAll("/", "_");
      frameSection.appendChild(subContent);
    }
    const firstFrame = frameSection.querySelector(".frame");
    firstFrame.classList.add("active");
    section.appendChild(content);
  }
}

function debug() {
  const root = document.querySelector(":root");
  root.style.setProperty("--outline-color", "green");
}

// Constants
const data = [
  {
    title: "Frieren Dance",
    frames: [
      "./assets/frieren/svg/00.svg",
      "./assets/frieren/svg/01.svg",
      "./assets/frieren/svg/02.svg",
      "./assets/frieren/svg/03.svg",
      "./assets/frieren/svg/04.svg",
      "./assets/frieren/svg/05.svg",
      "./assets/frieren/svg/06.svg",
      "./assets/frieren/svg/07.svg",
      "./assets/frieren/svg/08.svg",
      "./assets/frieren/svg/09.svg",
      "./assets/frieren/svg/10.svg",
      "./assets/frieren/svg/11.svg",
      "./assets/frieren/svg/12.svg",
      "./assets/frieren/svg/13.svg",
      "./assets/frieren/svg/14.svg",
      "./assets/frieren/svg/15.svg",
      "./assets/frieren/svg/16.svg",
      "./assets/frieren/svg/17.svg",
      "./assets/frieren/svg/18.svg",
    ],
  },
  {
    title: "Bongo Cat",
    frames: ["./assets/bongo_cat/svg/01.svg", "./assets/bongo_cat/svg/02.svg"],
  },
];

const framerate = 15; // Framerate in secondes (FPS)
const duration = 1; // Duration in minutes

// Main
// debug();
init_cards(data);
handleAnimations(framerate, duration);
