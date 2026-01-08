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

  if (mouseX + 200 > windowWidth) {
    x = windowWidth - 200;
  }

  if (mouseY + 200 > windowHeight) {
    y = windowHeight - 200;
  }

  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;
  contextMenu.style.display = "block";

  contextMenu.style.opacity = "0";
  setTimeout(() => {
    contextMenu.style.opacity = "1";
  }, 10);
});

scope.addEventListener("click", (e) => {
  if (e.target.offsetParent !== contextMenu) {
    contextMenu.style.display = "none";
  }
});

const menuItems = document.querySelector(".menu-items");

menuItems.addEventListener("click", (e) => {
  const item = e.target.closest(".menu-item");
  if (!item) return;

  const action = item.dataset.action;
  handleAction(action);
});

const handleAction = (action) => {
  console.log(`User clicked: ${action}`);

  contextMenu.style.display = "none";

  switch (action) {
    case "CopyLink":
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
      });
      break;
    case "Twitter":
      const twitterUrl = `https://twitter.com/intent/tweet?text=Check out this custom context menu!&url=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(twitterUrl, "_blank");
      break;
    case "Facebook":
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(facebookUrl, "_blank");
      break;
    case "Refresh":
      window.location.reload();
      break;
    case "Settings":
      alert("Settings clicked! (Demo)");
      break;
    case "About":
      alert("Custom Context Menu v1.0\nCreated by CodeBySRK");
      break;
    case "Exit":
      if (confirm("Are you sure you want to close this tab?")) {
        window.close();
      }
      break;
    case "ToggleLight":
      setTheme("light");
      break;
    case "ToggleDark":
      setTheme("dark");
      break;
  }
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  if (theme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
};

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}
