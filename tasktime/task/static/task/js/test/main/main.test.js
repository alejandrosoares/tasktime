import testUtils from "../utils.test.js";
import testRequest from "../request.test.js";
import testCreate from "../create.test.js";
import testDelete from "../delete.test.js";

describe('Task', () =>{
    testUtils();
    testRequest();
    testCreate();
    testDelete();
})