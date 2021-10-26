const inputTask = document.getElementById("input-task");


function showInputMessage(show, message){
    const msgNode = document.querySelector(".create p.msg");

    if(show){
        msgNode.classList.remove("hidden");
        msgNode.textContent = message;
    }else{
        msgNode.classList.add("hidden")
    }
}

function writeNewTask(e){
    const value = e.target.value;
    
    if(e.keyCode === 13){
        if(value.length === 0){
            showInputMessage(
                true,
                "Write a new task below"
            )
            return;
        }
    }else{
        // Write first characters
        if(value.length === 1) showInputMessage(false, null);

    }
}

function blurInputTask(){
    showInputMessage(false, null);
}

function loadMain(){
    inputTask.addEventListener("keyup", writeNewTask)
    inputTask.addEventListener("blur", blurInputTask)
}

document.addEventListener('DOMContentLoaded', loadMain)