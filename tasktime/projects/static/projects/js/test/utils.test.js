import { showInputMessage, messageResponse, checkEmptyList } from "../utils.js";


const testUtils = () => {

    describe('utils.js', () =>{

        test('Show and hide message when input to create is empty', () => {

            document.body.innerHTML = `
                <div class="create-container">
                    <div class="new">
                        <p class="msg hidden">Write a new project below</p>
                        <input type="text" id="input-create" placeholder="Create your project task">
                        <button type="button" class="btn btn-create" id="btn-create">Create</button>
                    </div>
                </div>
            `

            const msgNode = document.querySelector(".create-container .new p.msg");

            // Show message
            showInputMessage(true);
            expect(msgNode.classList.contains("hidden")).toBe(false);


            // Hide message
            showInputMessage(false);
            expect(msgNode.classList.contains("hidden")).toBe(true);

        });

        test('Message if a project was created, deleted or an  error ocurred', () => {

            document.body.innerHTML = `
                <div class="create-container">
                    <div class="messages">
                        <div class="msg create">
                            <p></p>
                        </div>
                        <div class="msg error">
                            <p>Something went wrong <br>Please, try again</p>
                        </div>
                        <div class="msg delete">
                            <p>Project deleted</p>
                        </div>
                    </div>
                </div>
            `;

            const divCreate = document.querySelector(`.create-container .create`),
                divError = document.querySelector(`.create-container .error`),
                divDeleted = document.querySelector(`.create-container .delete`);

            messageResponse('create', null);
            expect(divCreate.classList.contains("show")).toBe(true);

            messageResponse('error', null);
            expect(divError.classList.contains("show")).toBe(true);

            messageResponse('delete', null);
            expect(divDeleted.classList.contains("show")).toBe(true);

        });

        test('Message if projects list if empty', () => {

            document.body.innerHTML = `
                <div class="lists">
                    <div class="empty-list d-none">
                        <p>You have no projects.</p>
                    </div>
                </div>
            `

            checkEmptyList();

            const divMessage = document.querySelector(".lists .empty-list");

            expect(divMessage.classList.contains("d-none")).toBe(false);

        });
    })
}

export default testUtils;