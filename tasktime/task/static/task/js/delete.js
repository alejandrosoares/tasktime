import { messageResponse, checkEmptyList } from "./utils.js";
import { makeResquest } from "./request.js";

const URL_DELETE = document.querySelector(
  ".references .url-delete"
);

function removeNode(id) {
  const node = document.querySelector(`div[data-id="${id}"]`);
  node.remove();

  checkEmptyList();
}

function successFunction(object) {
  messageResponse("delete", null);
  removeNode(object.task.id);
}

function deleteTask(e) {
  const div = e.target.closest(".task"),
    data = { id: div.getAttribute("data-id") };

  makeResquest(URL_DELETE.value, data, successFunction);
}

function loadDelete(){
  document.addEventListener("click", (e) => {
    if(e.target.matches("button.delete") || e.target.matches("button.delete *")){
      deleteTask(e);
    }
  })
}
 
export { removeNode, loadDelete };
