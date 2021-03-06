import { showInputMessage, messageResponse, checkEmptyList } from "./utils.js";
import { makeResquest } from "./request.js";


const inputCreate = document.getElementById("input-create"),
    btnCreate = document.getElementById("btn-create"),
    URL_CREATE = document.querySelector(
        '.references .url-create'
    );
    
function blurInputCreate(){
    showInputMessage(false, null);
}

function createNode(obj){

    const template = document.getElementById("item").content,
        listNodes = document.querySelector("#projects .lists"),
        firstNode = listNodes.firstElementChild;
    
    const div =  template.querySelector("div.project"),
        code = template.querySelector(".code p"),
        title = template.querySelector(".title p"),
        percentCompleted = template.querySelector(".percent_completed p"),
        btnViewTasks = template.querySelector(".operations .view-tasks");

    div.setAttribute("data-id", obj.id);
    div.setAttribute("data-code", obj.code);
    code.textContent = obj.code;
    title.textContent = obj.title;
    percentCompleted.textContent = `${obj.percent_completed} %`;
    btnViewTasks.setAttribute("href", `/projects/${obj.id}`);

    const clone = document.importNode(template, true);

    listNodes.insertBefore(clone, firstNode);

    checkEmptyList();
}

function successFunction(object){
    
    messageResponse("create", "Project created");
    createNode(object.project);

    inputCreate.value = "";
}

function createNewProject(){
    const data = { title: inputCreate.value };
    makeResquest(URL_CREATE.value, data, successFunction);    
}

function newProject(e){
    let value = "";
    
    if(e.type === "keyup"){
        if(e.keyCode === 13){
            const value = e.target.value;
            
            value.length === 0
                ? showInputMessage(true)
                : createNewProject();
                
        }else{
            if(value.length === 1) showInputMessage(false);
        }
    }

    if(e.type === "click"){
        const value = inputCreate.value;
        
        value.length === 0
            ? showInputMessage(true)
            : createNewProject();

        e.stopPropagation();
    }
}

const loadCreate = () => {
    inputCreate.addEventListener("keyup", newProject);
    inputCreate.addEventListener("blur", blurInputCreate);
    btnCreate.addEventListener("click", newProject);
    document.addEventListener("click", e => showInputMessage(false));
}

export { loadCreate, createNode };
    