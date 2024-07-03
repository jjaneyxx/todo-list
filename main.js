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
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false, // 미완료 (default)
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete === true) {
      // task 가 완료되었다면
      resultHTML += `<div class="task">
          <div class = "task-done">${taskList[i].taskContent}</div>
          <div class="button-area">
            <button onclick = "itemComplete('${taskList[i].id}')">Done</button>
            <button>Delete</button>  
          </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${taskList[i].taskContent}</div>
    <div class="button-area">
      <button onclick = "itemComplete('${taskList[i].id}')">Done</button>
      <button>Delete</button>  
    </div>
  </div>`;
    }
  }

  document.getElementById("task-area").innerHTML = resultHTML;
}

function itemComplete(id) {
  // 선택된 아이템에 따라 그 아이템을 찾는다
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteAll() {
  taskList = [];
  render();
}
