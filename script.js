const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");

scope.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  // Calculate position to prevent menu going off screen
  const { clientX: mouseX, clientY: mouseY } = e;
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  // Default position
  let x = mouseX;
  let y = mouseY;

  // Check if menu goes off right
  if (mouseX + 200 > windowWidth) {
    x = windowWidth - 200;
  }

  // Check if menu goes off bottom
  // Assuming height approx 200px
  if (mouseY + 200 > windowHeight) {
    y = windowHeight - 200;
  }

  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;
  contextMenu.style.display = "block";

  // Add simple animation
  contextMenu.style.opacity = "0";
  setTimeout(() => {
    contextMenu.style.opacity = "1";
  }, 10);
});

// Click anywhere else to close
scope.addEventListener("click", (e) => {
  if (e.target.offsetParent !== contextMenu) {
    contextMenu.style.display = "none";
  }
});
