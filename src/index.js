const framerate = 15; // Framerate in secondes (FPS)
const duration = 1; // Duration in minutes

handleAnimations(framerate, duration);

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

function debug() {
  const root = document.querySelector(":root");
  root.style.setProperty("--outline-color", "green");
}
