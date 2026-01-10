/**
 * Custom Context Menu with Theme Toggle
 * Version: 1.1
 */
const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");
const logsPanel = document.getElementById("logs-panel");
const logsList = document.getElementById("logs-list");

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
        showToast("Link copied to clipboard!", "success");
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
    case "ViewSource":
      window.open("view-source:" + window.location.href, "_blank");
      break;
    case "Refresh":
      window.location.reload();
      break;
    case "Settings":
      showToast("Settings clicked! (Demo)", "info");
      break;
    case "About":
      showToast("Custom Context Menu v1.1\nCreated by CodeBySRK", "info");
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
    case "ToggleLogs":
      logsPanel.classList.toggle("hidden");
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

/**
 * Displays a toast notification with the specified message and type.
 * @param {string} message - The text to display
 * @param {'info'|'success'|'warning'|'error'} [type='info'] - The style variant of the toast
 */
const showToast = (message, type = "info") => {
  const container = document.getElementById("toast-container");

  // Create toast element
  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  const text = document.createElement("span");
  text.innerText = message;
  toast.appendChild(text);

  const closeBtn = document.createElement("span");
  closeBtn.innerText = "×";
  closeBtn.classList.add("close-btn");
  toast.appendChild(closeBtn);

  // Close on click
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent toast click if needed
    toast.classList.add("hide");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  });

  // Append to container
  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
};
