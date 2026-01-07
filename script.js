// ===== Elemente =====
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelBtn = document.getElementById("cancel");
const startBtn = document.getElementById("start");
const modal = document.getElementById("modal_container");
const main = document.querySelector("main");

const taskNameInput = document.getElementById("taskName");
const durationInput = document.getElementById("duration");

let timerInterval = null;

// ===== Modal Steuerung =====
addTaskBtn.addEventListener("click", () => {
  modal.classList.add("showed");
  taskNameInput.focus();
});

cancelBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("showed");
}

// ===== Start Button =====
startBtn.addEventListener("click", startTimer);

// ===== Timer starten =====
function startTimer() {
  const taskName = taskNameInput.value.trim();
  const duration = Number(durationInput.value);

  // Validierung
  if (!taskName) {
    alert("Bitte Namen für die Aufgabe eingeben!");
    taskNameInput.focus();
    return;
  }

  if (!duration || duration <= 0) {
    alert("Bitte eine gültige Dauer eingeben!");
    durationInput.focus();
    return;
  }

  closeModal();
  addTaskBtn.remove();

  createTimerUI(taskName, duration * 60);

  taskNameInput.value = "";
  durationInput.value = "";
}

// ===== UI erstellen =====
function createTimerUI(taskName, timeLeft) {
  const content = document.createElement("div");
  content.className = "content";

  const title = document.createElement("h1");
  title.textContent = taskName;

  const timerText = document.createElement("span");
  timerText.textContent = formatTime(timeLeft);

  const stopBtn = document.createElement("button");
  stopBtn.textContent = "Stop";
  stopBtn.className = "stopBtn";

  stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    content.remove();
    main.appendChild(addTaskBtn);
  });

  content.append(title, timerText, stopBtn);
  main.appendChild(content);

  // Countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerText.textContent = "Abgeschlossen!";
      stopBtn.remove();
      main.appendChild(addTaskBtn);
    }
  }, 1000);
}

// ===== Hilfsfunktion =====
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("showed")) {
    closeModal();
  }
});
