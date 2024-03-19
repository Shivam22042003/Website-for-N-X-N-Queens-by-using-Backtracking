function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}
function drop(event) {
  event.preventDefault();
  const draggableElementId = event.dataTransfer.getData("text/plain");
  const draggableElement = document.getElementById(draggableElementId);
  console.log("Draggable Element:", draggableElement);

  const dropzone = event.target;
  console.log("Dropzone:", dropzone);
  if (draggableElement && dropzone) {
    dropzone.appendChild(draggableElement);
  } else {
    console.error("Draggable element or dropzone is null.");
  }
}
const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("dragover", allowDrop);
  square.addEventListener("drop", drop);
});

const solveButton = document.getElementById("solve-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");
const timerElement = document.getElementById("timer");

let intervalId;
let startTime = 0;
let elapsedTime = 0;
let isPaused = false;

function formatTime(hours, minutes, seconds) {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const time = new Date(elapsedTime);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    timerElement.textContent = `Time Elapsed: ${formatTime(
      hours,
      minutes,
      seconds
    )}`;
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  isPaused = true;
}

function restartTimer() {
  clearInterval(intervalId);
  startTime = Date.now() - elapsedTime;
  isPaused = false;
  startTimer();
}

solveButton.addEventListener("click", () => {
  if (!intervalId || isPaused) {
    startTime = Date.now() - elapsedTime;
    startTimer();
  }
});

pauseButton.addEventListener("click", () => {
  if (intervalId && !isPaused) {
    pauseTimer();
  }
});

restartButton.addEventListener("click", () => {
  restartTimer();
});
// JavaScript for adding images and toggling solution display

const showSolutionButton = document.getElementById("show-solution");
const hideSolutionButton = document.getElementById("hide-solution");
const solutionContainer = document.getElementById("solution-container");

// Function to add images to the solution container
function addImagesToSolution(images) {
  // Clear existing images
  solutionContainer.innerHTML = "";

  // Add new images to the solution container
  images.forEach((imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    solutionContainer.appendChild(img);
  });
}

// Function to toggle solution display
function toggleSolutionDisplay() {
  if (solutionContainer.style.display === "none") {
    // Show solution
    solutionContainer.style.display = "block";
    showSolutionButton.style.display = "none";
    hideSolutionButton.style.display = "block";
  } else {
    // Hide solution
    solutionContainer.style.display = "none";
    showSolutionButton.style.display = "block";
    hideSolutionButton.style.display = "none";
  }
}

// Event listener for the "Show Solution" button
showSolutionButton.addEventListener("click", () => {
  // Replace this array with the actual URLs of your solution images
  const solutionImages = ["./images/solution.png"];
  addImagesToSolution(solutionImages);
  toggleSolutionDisplay();
});

// Event listener for the "Hide Solution" button
hideSolutionButton.addEventListener("click", toggleSolutionDisplay);
