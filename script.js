const addTaskBtn = document.getElementById("addTaskBtn");
const cancelBtn = document.getElementById("cancel");
const startBtn = document.getElementById("start");
const modal_container = document.getElementById("modal_container");
const main = document.querySelector("main");

addTaskBtn.addEventListener("click", () => {
  modal_container.classList.add("showed");
});

cancelBtn.addEventListener("click", () => {
  modal_container.classList.remove("showed");
});

startBtn.addEventListener("click", () => {
  modal_container.classList.remove("showed");
  timer();
  main.removeChild(addTaskBtn);
});

function timer() {
  const taskName = document.querySelector("#taskName").value;
  const duration = document.querySelector("#duration").value;

  const content = document.createElement("div");
  content.classList.add("content");

  const taskNameHeading = document.createElement("h1");
  taskNameHeading.textContent = taskName;

  const stopBtn = document.createElement("button");
  stopBtn.textContent = "Stop";
  stopBtn.classList.add("stopBtn");

  stopBtn.addEventListener("click", () => {
    timeLeft = 0;
    content.removeChild(stopBtn);
    main.removeChild(content);
    main.appendChild(addTaskBtn);
  });

  if (taskName.trim() === "") return;

  if (duration.trim() === "") {
    alert("Bitte Dauer eingeben!");
    return;
  }

  let timeLeft = duration * 60;

  const timerText = document.createElement("span");
  timerText.textContent = formatTime(timeLeft);
  content.appendChild(taskNameHeading);
  main.appendChild(content);
  content.appendChild(timerText);
  content.appendChild(stopBtn);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  function countdown() {
    if (timeLeft > 0) {
      timeLeft--;
      timerText.textContent = formatTime(timeLeft);
      setTimeout(countdown, 1000);
    } else {
      // Timer abgelaufen
      timerText.textContent = "Abgeschlossen!";
    }
  }

  countdown();
}
