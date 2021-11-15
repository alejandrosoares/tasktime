import { showInputMessage, messageResponse, checkEmptyList } from "./utils.js";
import makeResquest from "./request.js";

const inputCreate = document.getElementById("input-create"),
    btnCreate = document.getElementById("btn-create"),
    URL_CREATE = document.querySelector(
        '.references .url-create'
    );
    
function blurinputCreate(){ showInputMessage(false) }

function createNode(obj){

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

    checkEmptyList();
}

function successFunction(object){
    messageResponse("create", "Task created")
    createNode(object.task)

    inputCreate.value = "";
}

function createNewTask(){
    const data = { title: inputCreate.value }

    makeResquest(URL_CREATE.value, data, successFunction);
}


function newTask(e){
    let value = "";
    
    if(e.type === "keyup"){
        if(e.keyCode === 13){
            const value = e.target.value;
    
            if(value.length === 0){
                showInputMessage(true);
            }else{
                createNewTask();
            }
        }else{
            if(value.length === 1) showInputMessage(false);
        }
    }

    if(e.type === "click"){

        const value = inputCreate.value;
        
        if(value.length === 0){
            showInputMessage(true);
        }else{
            createNewTask();
        }

        e.stopPropagation();
    }
}


const loadCreate = () => {
    inputCreate.addEventListener("keyup", newTask);
    inputCreate.addEventListener("blur", blurinputCreate);
    btnCreate.addEventListener("click", newTask);
    document.addEventListener("click", e => showInputMessage(false));
}

export { loadCreate, createNode };
    


