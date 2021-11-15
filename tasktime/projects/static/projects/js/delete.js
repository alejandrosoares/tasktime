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
  removeNode(object.project.id);
}

function deleteProject(e) {
  const div = e.target.closest(".project"),
    data = { id: div.getAttribute("data-id") };

  makeResquest(URL_DELETE.value, data, successFunction);
}

function loadDelete(){
  document.addEventListener("click", (e) => {
    if(e.target.matches("button.delete") || e.target.matches("button.delete *")){
      deleteProject(e);
    } 
  })
}
 
export { loadDelete, removeNode };
