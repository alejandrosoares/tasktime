import { showInputMessage, messageResponse, checkEmptyList } from "../utils.js";

const testUtils = () => {
  describe("utils.js", () => {
    // test("Show and hide message what input to create is empty", () => {
    //   document.body.innerHTML = `
    //             <div class="create-container">
    //                 <div class="new">
    //                     <p class="msg hidden">Write a new taks below</p>
    //                     <input type="text" id="input-create" placeholder="Create your task task">
    //                     <button type="button" class="btn btn-create" id="btn-create">Create</button>
    //                 </div>
    //             </div>
    //         `;

    //   const msgNode = document.querySelector(".create-container .new p.msg");

    //   // Show message
    //   showInputMessage(true);
    //   expect(msgNode.classList.contains("hidden")).toBe(false);

    //   // Hide message
    //   showInputMessage(false);
    //   expect(msgNode.classList.contains("hidden")).toBe(true);
    // });

    // test("Message if a task was created, deleted or an  error ocurred", () => {
    //   document.body.innerHTML = `
    //             <div class="create-container">
    //                 <div class="messages">
    //                     <div class="msg create">
    //                         <p></p>
    //                     </div>
    //                     <div class="msg error">
    //                         <p>Something went wrong <br>Please, try again</p>
    //                     </div>
    //                     <div class="msg delete">
    //                         <p>Task deleted</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;

    //   const divCreate = document.querySelector(`.create-container .create`),
    //     divError = document.querySelector(`.create-container .error`),
    //     divDeleted = document.querySelector(`.create-container .delete`);

    //   messageResponse("create", null);
    //   expect(divCreate.classList.contains("show")).toBe(true);

    //   messageResponse("error", null);
    //   expect(divError.classList.contains("show")).toBe(true);

    //   messageResponse("delete", null);
    //   expect(divDeleted.classList.contains("show")).toBe(true);
    // });

    test("Message if task list if empty", () => {
      document.body.innerHTML = `
                <div class="pending">
                    <div class="title-list">
                        <h4>Pending</h4>
                    </div>
                    <div class="body-list">
                        <div class="empty-list d-none">
                            <p>You have no pending tasks.</p>
                        </div>
                    </div>
                </div>
                <div class="in-process">
                    <div class="title-list">
                        <h4>Pending</h4>
                    </div>
                    <div class="body-list">
                        <div class="empty-list d-none">
                            <p>You have no pending tasks.</p>
                        </div>
                    </div>
                </div>
                <div class="finalized">
                    <div class="title-list">
                        <h4>Pending</h4>
                    </div>
                    <div class="body-list">
                        <div class="empty-list d-none">
                            <p>You have no pending tasks.</p>
                        </div>
                    </div>
                </div>
            `;

      checkEmptyList();

      const divMessage = document.querySelector(
        ".pending .body-list .empty-list"
      );

      expect(divMessage.classList.contains("d-none")).toBe(false);
    });
  });
};

export default testUtils;
