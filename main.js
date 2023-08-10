let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

console.log(taskList)

//엔터키로 할일 추가
taskInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

//탭메뉴 언더바
function Indicator(e) {
  underLine.style.left = e.offsetLeft + "px";
  underLine.style.width = e.offsetWidth + "px";
  underLine.style.top = e.offsetTop + e.offsetHeight - 4 + "px";
}
tabs.forEach((menu) =>
  menu.addEventListener("click", (e) => Indicator(e.currentTarget))
);

//+버튼 눌러서 할일 추가
addButton.addEventListener("click", addTask);

//탭 메뉴 클릭시
for (i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}


// 탭 메뉴 클릭후 필터목록
function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

//taskList에 할일목록 추가
function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  render();
}

//목록 표시
function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      // 되돌리기 표시 뜰때
      resultHTML += `<div class="task taskDoneBack">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button class="buttonBackground" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left" style="color: #787878;"></i></button>
            <button class="buttonBackground" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" style="color: #f32812;"></i></button>
        </div>   
    </div>`;
    } else {
      //체크 표시 뜰때
      resultHTML += `<div class="task"> 
            <div>${list[i].taskContent}</div>
            <div>
                <button class="buttonBackground" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #3068e8;"></i></button>
                <button class="buttonBackground" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" style="color: #f32812;"></i></button>
            </div>   
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 16);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
}
