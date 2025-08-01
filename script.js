// Game state variables
let score = 0;
let cross = true;
const audiogo = new Audio("audio.mp3");
const audiodead = new Audio("dead.mp3"); // Added missing audio declaration

// Start game music after 1 second
setTimeout(() => {
  audiogo.play();
}, 1);


// Keyboard controls
document.onkeydown = function (e) {
  console.log("Key pressed:", e.key);

  const ninja = document.querySelector(".ninja");
  const ninjaX = parseInt(
    window.getComputedStyle(ninja).getPropertyValue("left")
  );

  switch (e.keyCode) {
    case 38: // Up arrow (jump)
      ninja.classList.add("animateNinja");
      setTimeout(() => {
        ninja.classList.remove("animateNinja");
      }, 600);
      break;

    case 39: // Right arrow
      ninja.style.left = Math.min(ninjaX + 112, window.innerWidth - 50) + "px";
      break;

    case 37: // Left arrow
      ninja.style.left = Math.max(ninjaX - 112, 0) + "px";
      break;
  }
};

// Game loop
const gameLoop = setInterval(() => {
  const ninja = document.querySelector(".ninja");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");
  const scorecont = document.querySelector(".scorecont"); // Added missing score container

  // Get positions
  const dx = parseInt(window.getComputedStyle(ninja).getPropertyValue("left"));
  const dy = parseInt(window.getComputedStyle(ninja).getPropertyValue("top"));
  const ox = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top")
  );

  // Calculate collision
  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  // Collision detection
  if (offsetX < 73 && offsetY < 52) {
    // Game over
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obstacleAni");
    audiogo.pause();
    audiodead.play();

    clearInterval(gameLoop); // Stop the game loop
  } else if (offsetX < 145 && cross) {
    // Score increase
    score += 1;
    updateScore(score);
    cross = false;

    setTimeout(() => {
      cross = true;
    }, 1000);

    // Increase speed
    setTimeout(() => {
      const aniDur = parseFloat(
        window.getComputedStyle(obstacle).getPropertyValue("animation-duration")
      );
      const newDur = Math.max(aniDur - 0.1, 1.0); // Don't let it get too fast
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  const scorecont = document.querySelector(".scorecont");
  if (scorecont) {
    scorecont.innerHTML = `Score: ${score}`;
  }
}

// Added reset function for potential restart button
function resetGame() {
  score = 0;
  cross = true;
  document.querySelector(".gameOver").style.visibility = "hidden";
  document.querySelector(".obstacle").classList.add("obstacleAni");
  document.querySelector(".obstacle").style.animationDuration = "3s";
  audiogo.currentTime = 0;
  audiogo.play();
}
