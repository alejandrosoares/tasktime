import { messageResponse } from "./messages.js";
import makeResquest from "./request.js";

const URL_DELETE = document.querySelector(
  "#tasks .references .url-delete"
).value;

function removeTaskNode(id) {
  const node = document.querySelector(`div[data-id="${id}"]`);
  node.remove();
}

function successFunction(object) {
  messageResponse("delete", null);
  removeTaskNode(object.task.id);
}

function deleteTask(e) {
  const div = e.target.closest(".task"),
    data = { id: div.getAttribute("data-id") };

  makeResquest(URL_DELETE, data, successFunction);
}

const loadDelete = () => {
  const btnsDeleteTask = document.querySelectorAll(
    "#tasks .operations .delete"
  );

  btnsDeleteTask.forEach((btn) => btn.addEventListener("click", deleteTask));
};

export default loadDelete;
