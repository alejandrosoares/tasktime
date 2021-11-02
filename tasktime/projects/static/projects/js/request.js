import {messageResponse} from "./utils.js";

const csrf = document.querySelector(
        '.references input[name="csrfmiddlewaretoken"]'
    ).value;


function buildRequest(data) {

    const headers = new Headers();
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
    .then(object => {
    
        if(object.status === "ok"){
            successFunction(object);
        }else{
           messageResponse("error", null)
        }
    })
    //.catch(error => messageResponse("error", null));
}

export default makeResquest;