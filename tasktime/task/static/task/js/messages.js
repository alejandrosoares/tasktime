/*
    Message for action task and create new task
*/

const showInputMessage = (show, message) => {
    // Create new task
    const msgNode = document.querySelector(".new-task p.msg");

    if(show){
        msgNode.classList.remove("hidden");
        msgNode.textContent = message;
    }else{
        msgNode.classList.add("hidden")
    }
}

const messageResponse = (divClass, message) => {
    const divMessage = document.querySelector(`.tasks-message .${divClass}`);

    divMessage.classList.add("show")
    if(message) divMessage.innerHTML = message

    setTimeout(() =>{
        divMessage.classList.remove("show")
    }, 4000)
}

export { showInputMessage, messageResponse };

