import { showInputMessage, messageResponse } from "./messages.js";
import makeResquest from "./request.js";

const inputTask = document.getElementById("input-task"),
    btnCreateTask = document.querySelector("#tasks .new-task button.btn"),
    URL_CREATE = document.querySelector(
        '#tasks .references .url-create'
    ).value;
    
function blurInputTask(){
    showInputMessage(false, null);
}

function createTaskNode(obj){

    const template = document.getElementById("item-pending").content,
        listNodes = document.querySelector(".pending .body-list"),
        firstNode = listNodes.firstElementChild;
    
    const div =  template.querySelector("div.task"),
        code = template.querySelector(".code p"),
        title = template.querySelector(".title p");

    
    div.setAttribute("data-id", obj.id);
    div.setAttribute("data-code", obj.code);
    div.setAttribute("data-status", obj.status);
    code.textContent = obj.code;
    title.textContent = obj.title;

    const clone = document.importNode(template, true);

    listNodes.insertBefore(clone, firstNode);

}

function successFunction(object){
    messageResponse("create", "Task created")
    createTaskNode(object.task)

    inputTask.value = "";
}

function createNewTask(){
    const data = { title: inputTask.value }

    makeResquest(URL_CREATE, data, successFunction);
}


function newTask(e){
    let value = "";
    
    if(e.type === "keyup"){
        if(e.keyCode === 13){
            const value = e.target.value;
    
            if(value.length === 0){
                showInputMessage(
                    true,
                    "Write a new task below"
                )
            }else{
                createNewTask()
            }
        }else{
            if(value.length === 1) showInputMessage(false, null)
        }
    }

    if(e.type === "click"){

        const div = e.target.closest(".new-task");
            value = div.querySelector("#input-task").value;
        
        if(value.length === 0){
            showInputMessage(
                true,
                "Write a new task below"
            )
        }else{
            createNewTask()
        }

        e.stopPropagation();
    }
}

const loadCreate = () => {
    inputTask.addEventListener("keyup", newTask);
    inputTask.addEventListener("blur", blurInputTask);
    btnCreateTask.addEventListener("click", newTask);
    document.addEventListener("click", e => { 
        showInputMessage(false, null)
    })
}

export default loadCreate;
    


