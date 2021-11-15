import { loadCreate } from "./create.js";
import loadUpdate from "./update.js";
import loadDelete from "./delete.js";

document.addEventListener("DOMContentLoaded", e =>{
    loadCreate();
    loadUpdate();
    loadDelete();
})