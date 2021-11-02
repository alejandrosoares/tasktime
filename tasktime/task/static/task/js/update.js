import { checkEmptyList } from "./utils.js";
import makeResquest from "./request.js";

const STATUS = {
      pending: 0,
      inProcess: 1,
      paused: 2,
      finalized: 3,
      canceled: 4
    },
    URL_UPDATE = document.querySelector(
      ".references .url-update"
    ).value;


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
    const duration = template.querySelector(".duration p");
    duration.textContent = `${obj.duration}`;
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

/* FINALIZED */
function successFinalized(object) {
  moveNode(object.task, "finalized");
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

function changeStatusTask(trigger, status, callback){
  const task = trigger.closest("div.task"),
      id_task = task.getAttribute("data-id"),
      data = {
        id: id_task,
        status: status
      };

    makeResquest(URL_UPDATE, data, callback);
}

function loadUpdate() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("button.finalize")) {
      changeStatusTask(e.target, STATUS.finalized, successFinalized)
    }

    if(e.target.matches("button.start") || 
      e.target.matches("button.start *")) {
      changeStatusTask(e.target, STATUS.inProcess, successInProcess)
    }

    if(e.target.matches("button.resume") ||
      e.target.matches("button.resume *")){
      changeStatusTask(e.target, STATUS.inProcess, successResume)
    }

    if(e.target.matches("button.pause") ||
      e.target.matches("button.pause *")) {
      changeStatusTask(e.target, STATUS.paused, successPause)
    }

    if(e.target.matches("button.cancel") ||
      e.target.matches("button.cancel *")){
      changeStatusTask(e.target, STATUS.canceled, successCancel)
    }
  });
}

export default loadUpdate;
