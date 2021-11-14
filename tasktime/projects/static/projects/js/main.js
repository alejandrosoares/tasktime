import { loadCreate } from "./create.js";
import { loadDelete } from "./delete.js";

document.addEventListener("DOMContentLoaded", e =>{
    loadCreate();
    loadDelete();
    console.log("Dentro de main")
})