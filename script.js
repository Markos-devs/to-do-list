// Select Elements
const addTaskBtn = document.querySelector(".btn-add-task");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// Load tasks from localStorage when page loads
window.onload = loadTasksFromStorage;

// Add new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  createTaskElement(taskText);
  saveTaskToStorage(taskText);
  taskInput.value = "";
});

// Create and display task
function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;
  if (isCompleted) span.classList.add("completed");

  const btnContainer = document.createElement("div");
  btnContainer.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.className = "done-btn";
  doneBtn.textContent = isCompleted ? "Undo" : "Done";
  doneBtn.addEventListener("click", () => {
    span.classList.toggle("completed");
    doneBtn.textContent = span.classList.contains("completed")
      ? "Undo"
      : "Done";
    updateStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateStorage();
  });

  btnContainer.appendChild(doneBtn);
  btnContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnContainer);

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
}

// Update task list in localStorage
function updateStorage() {
  const updatedTasks = [];
  document.querySelectorAll(".task-item").forEach((item) => {
    const text = item.querySelector(".task-text").textContent;
    const completed = item
      .querySelector(".task-text")
      .classList.contains("completed");
    updatedTasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
