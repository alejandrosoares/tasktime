import { messageResponse } from "./utils.js";


const buildRequest = (data) => {

    const headers = new Headers(),
        csrf = document.querySelector(
            '.references input[name="csrfmiddlewaretoken"]'
        ).value;

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
        if (response.ok) return response.json();
    })
    .then(object => {
    
        object.status === "ok"
            ? successFunction(object)
            : messageResponse("error", `Error: ${error}`);

    })
    .catch(error => messageResponse("error", `Error: ${error}`));
}


export { buildRequest, makeResquest };