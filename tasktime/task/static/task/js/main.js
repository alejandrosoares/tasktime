import loadCreate from "./create.js";
import loadUpdate from "./update.js";
import loadDelete from "./delete.js";

const  URL_UPDATE = document.querySelector(
            '#tasks .references .url-update'
        ).value;

document.addEventListener("DOMContentLoaded", e =>{
    loadCreate();
    loadUpdate();
    loadDelete();
})