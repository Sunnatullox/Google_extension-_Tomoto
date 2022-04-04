let tasks = [];



function updateTimer(){
    chrome.storage.local.get(["timer", "timeOptins","isRunning"], (result)=> {
        const time= document.getElementById("time")
        const minute =`${ result.timeOptins - Math.ceil(result.timer / 60)}`.padStart(2,"0");
        let seconds = "00"
        if(result.timer % 60 != 0){
          seconds = `${60 - result.timer % 60}`.padStart(2,"0");
        }
        time.textContent = `${minute} : ${seconds}`
        startBtn.textContent = result.isRunning ? "Pouse Timer" : "Start Timer"
    })
}

updateTimer()
setInterval(updateTimer, 1000)


const startBtn= document.querySelector("#start_btn")
startBtn.addEventListener("click", ()=>{
    chrome.storage.local.get(["isRunning"], (result) => {
        chrome.storage.local.set({
            isRunning: !result.isRunning
        }, () =>{
            startBtn.textContent = !result.isRunning ? "Pouse Timer" : "Start Timer"
        })
    })
})


const resetBtn = document.querySelector("#reset_btn")
resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer :0,
        isRunning:false
    },() =>{
        startBtn.textContent = "Start Timer"
    })
})

const Add_task_btn = document.querySelector("#Add_task_btn");
const taskContainer = document.querySelector(".task_container");
Add_task_btn.addEventListener("click", () => addTask());

chrome.storage.sync.get(['tasks'], (result)=>{
    tasks = result.tasks ? result.tasks : []
    renderTasks()
})


function saveTasks() {
  chrome.storage.sync.set({
    tasks
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = `Enter a Task...`;
  text.value = tasks[taskNum];
  text.className = "task-input"
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });
  const delete_btn = document.createElement("input");
  delete_btn.type = "button";
  delete_btn.value = "x";
  delete_btn.className="task-delete"
  delete_btn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(delete_btn);
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks()
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks()
}

function renderTasks() {
  const taskContainer = document.querySelector(".task_container");
  taskContainer.textContent = "";
  tasks.forEach((taskTaxt, taskNum) => {
    renderTask(taskNum);
  });
}

