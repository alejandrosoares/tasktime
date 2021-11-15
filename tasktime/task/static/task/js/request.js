import { messageResponse } from "./utils.js";


function buildRequest(data){
    const csrf = document.querySelector(
            '.references input[name="csrfmiddlewaretoken"]'
        ).value, 
        headers = new Headers();

    headers.set("Content-Type", "application/json");
    headers.set("X-CSRFToken", csrf);
    headers.set("Access-Control-Allow-Origin", "same-origin");

    return {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
}

const makeResquest = (url, data, successFunction) => {

    fetch(url, buildRequest(data))
    .then(response => {
        if (response.ok) return response.json()
    })
    .then( object => {
    
        if(object.status === "ok"){
            successFunction(object);
        }else{
           messageResponse("error",  `Error: ${error}`)
        }
    })
    .catch(error => messageResponse("error", `Error: ${error}`));
}

export default makeResquest;