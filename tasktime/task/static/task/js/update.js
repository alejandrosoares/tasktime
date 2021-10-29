import makeResquest from "./request.js";

const URL_UPDATE = document.querySelector(
  "#tasks .references .url-update"
).value;

const CLASS_LIST = ["pending", "in-process", "finalized"];

function checkEmptyList() {
  // Check if any list if empty

  CLASS_LIST.forEach((list) => {
    const tasks = document.querySelector(`.${list} .body-list .task`),
      message = document.querySelector(`.${list}  .body-list .empty-list`);

    if (tasks === null) {
      message.classList.remove("d-none");
    } else {
      message.classList.add("d-none");
    }
  });
}
function moveNode(obj, classStates){
  const template = document.getElementById(`item-${classStates}`).content,
    listNodes = document.querySelector(`.${classStates} .body-list`),
    old_node = document.querySelector(`#tasks div[data-id="${obj.id}"]`);

  const div = template.querySelector("div.task"),
    code = template.querySelector(".code p"),
    title = template.querySelector(".title p");

  div.classList.add("hidden");
  div.setAttribute("data-id", obj.id);
  div.setAttribute("data-code", obj.code);
  div.setAttribute("data-status", obj.status);
  code.textContent = obj.code;
  title.textContent = obj.title;

  if (classStates === "finalized") {
    const duration = template.querySelector(".status p");
    duration.textContent = `${obj.duration} seconds`;
  }

  const clone = document.importNode(template, true);

  listNodes.appendChild(clone);

  setTimeout(() => {
    const newNode = document.querySelector(
      `.${classStates} .body-list div[data-id="${obj.id}"]`
    );

    newNode.classList.remove("hidden");
  }, 100);

  old_node.classList.add("hidden");
  setTimeout(() => {
    old_node.remove();
    checkEmptyList();
  }, 700);
}


/* IN PROCESS */
function successInProcess(object) {
  moveNode(object.task, "in-process");
}
function inProcessTask(e) {
  const task = e.target.closest("div.task"),
    id_task = task.getAttribute("data-id"),
    data = {
      id: id_task,
      status: 1
    };

  makeResquest(URL_UPDATE, data, successInProcess);
}


/* FINALIZED */
function successFinalized(object) {
  moveNode(object.task, "finalized");
}
function finalizedTask(e) {
  const task = e.target.parentNode.parentNode,
    id_task = task.getAttribute("data-id"),
    data = {
      id: id_task,
      status: 3
    };

  makeResquest(URL_UPDATE, data, successFinalized);
}



/* PAUSED */
function changeToResume(obj) {
    const node = document.querySelector(`#tasks div[data-id="${obj.id}"]`),
    status = node.querySelector(".status p"),
    btnPause = node.querySelector(".operations .pause");

    node.setAttribute("data-status", obj.status);
    status.textContent = "Paused";
    btnPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    btnPause.classList.replace("pause", "resume");
    btnPause.setAttribute("title", "Resume");
}
function successPause(object) {
  changeToResume(object.task);
}
function pauseTask(e) {
  const task = e.target.closest("div.task"),
    id_task = task.getAttribute("data-id"),
    data = {
      id: id_task,
      status: 2
    };

    makeResquest(URL_UPDATE, data, successPause);
}



/* RESUME */
function changeToPause(obj) {

    const node = document.querySelector(`#tasks div[data-id="${obj.id}"]`),
    status = node.querySelector(".status p"),
    btnResume = node.querySelector(".operations .resume");

    node.setAttribute("data-status", obj.status);
    status.textContent = "In process";
    btnResume.innerHTML = '<i class="bi bi-pause-fill"></i>';
    btnResume.classList.replace("resume", "pause");
    btnResume.setAttribute("title", "Pause");
}
function successResume(object){
    changeToPause(object.task);
}
function resumeTask(e) {
    const task = e.target.closest("div.task"),
      id_task = task.getAttribute("data-id"),
      data = {
        id: id_task,
        status: 1
      };
  
    makeResquest(URL_UPDATE, data, successResume);
}


/* CANCEL */
function successCancel(object){
    const node = document.querySelector(
        `#tasks div[data-id="${object.task.id}"]`
        );

    node.classList.add("hidden");
    setTimeout(() => {
        node.remove();
        checkEmptyList();
    }, 700);
}
function cancelTask(e){
    const task = e.target.closest("div.task"),
      id_task = task.getAttribute("data-id"),
      data = {
        id: id_task,
        status: 4
      };
  
    makeResquest(URL_UPDATE, data, successCancel);
}


function loadUpdate() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("button.finalize")) {
      finalizedTask(e);
    }

    if(e.target.matches("button.start")) {
      inProcessTask(e);
    }

    if(e.target.matches("button.resume *")){
        resumeTask(e);
    }

    if(e.target.matches("button.pause *")) {
      pauseTask(e);
    }

    if(e.target.matches("button.cancel *")){
        cancelTask(e);
    }
  });
}

export default loadUpdate;
