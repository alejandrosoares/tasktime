/*
    Utilities for projects app
*/

const showInputMessage = (show) => {
    // Message what input to create is empty
    const msgNode = document.querySelector(".create-container .new p.msg");

    (show)
    ? msgNode.classList.remove("hidden")
    : msgNode.classList.add("hidden");
}

const messageResponse = (divClass, message) => {
    // Message if a task was created, deleted or an error ocurred
    const divMessage = document.querySelector(`.create-container .${divClass}`),
      pMessage = divMessage.querySelector("p");

    divMessage.classList.add("show")
    if(message) pMessage.textContent = message;

    setTimeout(() =>{
        divMessage.classList.remove("show")
    }, 4000)
}

function checkEmptyList() {
    // Check if projects list if empty
  
    const tasks = document.querySelector(`.lists .project`),
    message = document.querySelector(`.lists .empty-list`);

    (tasks === null)
    ? message.classList.remove("d-none")
    : message.classList.add("d-none");
}

export { showInputMessage, messageResponse, checkEmptyList};


