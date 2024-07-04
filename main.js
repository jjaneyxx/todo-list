let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let deleteButton = document.getElementById("delete-all");
let tabs = document.querySelectorAll(".tab-area div"); // tab-area 밑 div 를 모두 가져옴
let mode = "all";
let taskList = [];
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addButton.addEventListener("click", addTask);
deleteButton.addEventListener("click", deleteAll);
taskInput.addEventListener("focus", () => {
  taskInput.value = "";
});

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // 엔터키의 key 값 : "Enter"
    addTask();
    taskInput.value = "";
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
  let list = []; // 상황에 따라 값이 변하는 리스트
  if (mode === "all") {
    list = taskList;
  } else if (mode === "proceeding" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      // task 가 완료되었다면
      resultHTML += `<div class="task-grey">
          <div class = "task-done">${list[i].taskContent}</div>
          <div class="button-area">
            <button onclick = "itemComplete('${list[i].id}')" class = "done-button"><i class="fa-solid fa-arrow-rotate-right"></i></button>
            <button onclick = "deleteItem('${list[i].id}')" class = "delete-button"><i class="fa-solid fa-trash"></i></button>  
          </div>
        </div>`;
    } else {
      // task 가 완료되지 않음
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div class="button-area">
      <button onclick = "itemComplete('${list[i].id}')" class = "done-button"><i class="fa-solid fa-check"></i></button>
      <button onclick = "deleteItem('${list[i].id}')" class = "delete-button"><i class="fa-solid fa-trash"></i></button>  
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

function deleteItem(id) {
  console.log(`삭제한다 ${id}`);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteAll() {
  taskList = [];
  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  filterList = [];
  doneList = [];
  if (mode === "all") {
    // 전체 리스트를 보여줌
    // 기존에 만든 내용을 render() 로 불러옴
    render();
  } else if (mode === "proceeding") {
    // task.isComplete === false
    // 진행되어야 하는 아이템
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
        console.log(filterList);
      }
    }
    render();
  } else if (mode === "done") {
    // task.isComplete === true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
        console.log(filterList);
      }
    }
    render();
  }
}
