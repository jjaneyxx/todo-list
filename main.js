let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let deleteButton = document.getElementById("delete-all");
let taskList = [];

addButton.addEventListener("click", addTask);
deleteButton.addEventListener("click", deleteAll);
taskInput.addEventListener("focus", () => {
  taskInput.value = "";
});

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // 엔터키의 key 값 : "Enter"
    addTask();
  }
});

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
          <div>${taskList[i]}</div>
          <div class="button-area">
            <button>Done</button>
            <button>Delete</button>  
          </div>
        </div>`;
  }

  document.getElementById("task-area").innerHTML = resultHTML;
}

function deleteAll() {
  taskList = [];
  render();
}
