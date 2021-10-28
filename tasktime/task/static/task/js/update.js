import makeResquest from "./request.js";

const  URL_UPDATE = document.querySelector(
        '#tasks .references .url-update'
    ).value;

function removeMessageEmptyList(query){
    const message = document.querySelector(`${query} .empty-list`);
    
    if(message) message.remove();
}
function moveNode(obj){
    const template = document.getElementById("item-in-process").content,
        listNodes = document.querySelector(".in-process .body-list"),
        old_node = document.querySelector(`#tasks div[data-id="${obj.id}"]`);
    
    console.log("object ", obj);
    console.log("old node ", old_node); // null, why?

    const div =  template.querySelector("div.task"),
        code = template.querySelector(".code p"),
        title = template.querySelector(".title p");

    div.classList.add("hidden");
    div.setAttribute("data-id", obj.id);
    div.setAttribute("data-code", obj.code);
    div.setAttribute("data-status", obj.status);
    code.textContent = obj.code;
    title.textContent = obj.title;

    const clone = document.importNode(template, true);

    removeMessageEmptyList(".in-process .body-list");

    listNodes.appendChild(clone);
    setTimeout(() => {
        const newlistNodes = document.querySelector(".in-process .body-list"),
            child = newlistNodes.lastElementChild;

        child.classList.remove("hidden");
    }, 100)
    
    old_node.classList.add("hidden");
    setTimeout(() => {
        console.log("Remove node");
        old_node.remove()
    }, 700)
}

function successFunction(object){
    moveNode(object.task)
}

function inProcess(e){
    const task = e.target.parentNode.parentNode,
        id_task = task.getAttribute("data-id") ,
        current_status = task.getAttribute("data-status"), // For select succesFunction
        data = { 
            id: id_task, 
            status: 1
        };

    makeResquest(URL_UPDATE, data, successFunction);
}

function loadUpdate(){
    const btnsStart = document.querySelectorAll(
        "#tasks .operations button.start"
        )
    
    btnsStart.forEach( btn => btn.addEventListener("click", inProcess));
}


export default loadUpdate;