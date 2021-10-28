import loadDelete from "./delete.js";
import loadCreate from "./create.js";

const  URL_UPDATE = document.querySelector(
            '#tasks .references .url-update'
        ).value;

document.addEventListener("DOMContentLoaded", e =>{
    loadCreate();
    loadDelete();
})