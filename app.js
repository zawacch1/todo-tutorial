const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

// 以前の文字列だけのデータも、新しい形式に変換します。
let todos = (JSON.parse(localStorage.getItem("todos")) || []).map(function (todo) {
  if (typeof todo === "string") {
    return { text: todo, completed: false };
  }
  return todo;
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// データに合わせてリストを描き直します。
function showTodos() {
  list.textContent = "";

  todos.forEach(function (todo, index) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    text.textContent = todo.text;
    text.style.textDecoration = todo.completed ? "line-through" : "none";
    deleteButton.textContent = "削除";

    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      saveTodos();
      showTodos();
    });

    deleteButton.addEventListener("click", function () {
      todos.splice(index, 1);
      saveTodos();
      showTodos();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    item.appendChild(label);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

saveTodos();
showTodos();

button.addEventListener("click", function () {
  const todo = input.value.trim();

  if (todo === "") {
    return;
  }

  todos.push({ text: todo, completed: false });
  saveTodos();
  showTodos();
  input.value = "";
});
