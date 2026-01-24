const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filterStatus = document.getElementById("filterStatus");

let todos = [];

// Submit form
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  // Validasi input
  if (task === "" || date === "") {
    alert("Isi dulu WOYY");
    return;
  }

  const todo = {
    id: Date.now(),
    task: task,
    date: date,
    done: false
  };

  todos.push(todo);
  renderTodos();
  todoForm.reset();
});

// Filter change
filterStatus.addEventListener("change", renderTodos);

// Render todo list
function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (filterStatus.value === "active") {
    filteredTodos = todos.filter(todo => !todo.done);
  } else if (filterStatus.value === "done") {
    filteredTodos = todos.filter(todo => todo.done);
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerHTML = `
      ${todo.task}<br>
      <small>${todo.date}</small>
    `;

    if (todo.done) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.6";
    }

    const actions = document.createElement("div");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = () => toggleDone(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

// Toggle done
function toggleDone(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  renderTodos();
}

// Delete todo
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}