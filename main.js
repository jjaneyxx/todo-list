let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let deleteButton = document.getElementById("delete-all");
let tabs = document.querySelectorAll(".tab-area div"); // tab-area 밑 div 를 모두 가져옴
let underline = document.getElementById("under-line"); // under-line id 가져옴
let shareModal = document.getElementById("share-modal");
let modalContainer = document.getElementById("modal-container");
let modalClose = document.getElementById("modal-close");
let copyUrlButton = document.getElementById("copy-url");
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
shareModal.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
copyUrlButton.addEventListener("click", copyUrl);

function openModal() {
  // display : none 이였던 걸 보이게 해야 함
  modalContainer.classList.remove("hidden");
  console.log("모달 열림");
}

function closeModal() {
  modalContainer.classList.add("hidden");
  console.log("모달 닫힘");
}

function copyUrl() {
  const url = window.location.href;
  console.log(url);
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("URL이 복사되었습니다!");
    })
    .catch((error) => {
      console.log("복사 실패함 :", error);
    });
}

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // 엔터키의 key 값 : "Enter"
    addTask();
    taskInput.value = "";
  }
});

function addTask() {
  if (taskInput.value === "") {
    alert("할 일을 입력하세용");
  } else {
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false, // 미완료 (default)
    };
    taskList.push(task);
    filter({ target: { id: mode } });
  }
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
      // task 가 완료되었다면 : Done 내용
      resultHTML += `<div class="task-grey">
          <div class = "task-done">${list[i].taskContent}</div>
          <div class="button-area">
            <button onclick = "itemComplete('${list[i].id}')" class = "done-button"><i class="fa-solid fa-arrow-rotate-right"></i></button>
            <button onclick = "deleteItem('${list[i].id}')" class = "delete-button"><i class="fa-solid fa-trash"></i></button>  
          </div>
        </div>`;
    } else {
      // task 가 완료되지 않음 : Proceeding 내용
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
  filter({ target: { id: mode } }); // 필터링 후 렌더링
}

function deleteItem(id) {
  console.log(`삭제한다 ${id}`);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter({ target: { id: mode } });
}

function deleteAll() {
  taskList = [];
  filter({ target: { id: mode } });
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    // 전체 리스트를 보여줌
    // 기존에 만든 내용을 render() 로 불러옴
    underline.style.left = "calc(8%)";
    render();
  } else if (mode === "proceeding") {
    // task.isComplete === false
    // 진행되어야 하는 아이템
    underline.style.left = "calc(43%)";
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    // task.isComplete === true
    underline.style.left = "calc(77%)";
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
