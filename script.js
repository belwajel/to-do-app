let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.description;
    span.setAttribute("tabindex", "0");

    span.addEventListener("click", () => toggleComplete(index));

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask === "") return;

  tasks.push({ description: newTask, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function editTask(index) {
  const newDesc = prompt("Edit task:", tasks[index].description);
  if (newDesc !== null && newDesc.trim() !== "") {
    tasks[index].description = newDesc.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", addTask);
renderTasks();
