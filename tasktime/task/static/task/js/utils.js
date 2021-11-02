/*
    Utilities for task app
*/
const CLASS_LIST = ["pending", "in-process", "finalized"];

const showInputMessage = (show) => {
    // Create new task
    const msgNode = document.querySelector(".create-container .new p.msg");

    if(show){
        msgNode.classList.remove("hidden");
    }else{
        msgNode.classList.add("hidden")
    }
}

const messageResponse = (divClass, message) => {
    const divMessage = document.querySelector(`.create-container .${divClass}`),
      pMessage = divMessage.querySelector("p");

    divMessage.classList.add("show")
    if(message) pMessage.textContent = message;

    setTimeout(() =>{
        divMessage.classList.remove("show")
    }, 4000)
}

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

export { 
    showInputMessage, 
    messageResponse,
    checkEmptyList,
    };

