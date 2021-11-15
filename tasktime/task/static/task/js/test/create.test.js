import { createNode } from "../create.js";

const testCreate = () => {

    describe('create.js', () => {

        test('should be create a div.task node', () => {
            document.body.innerHTML = `
            <div id="tasks">
                <div class="list-container">
                    <div class="title">
                        <h2>Your list task</h2>
                    </div>
            
                    <div class="lists">
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
                                <div class="empty-list  d-none">
                                    <p>You have no pending tasks.</p>
                                </div>
                            </div>
                        </div>
                        <div class="finalized">
                            <div class="title-list">
                                <h4>Pending</h4>
                            </div>
                            <div class="body-list">
                                <div class="empty-list  d-none">
                                    <p>You have no pending tasks.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template id="item-pending">
                    <div class="task" data-id="" data-code="" data-status="0">
                        <div class="code">
                            <p></p>
                        </div>
                        <div class="title">
                            <p></p>
                        </div>
                        <div class="status">
                            <p>Pending</p>
                        </div>
                        <div class="operations">
                            <button class="btn start">Start</button>
                            <button class="btn-i cancel" title="Cancel task"><i class="bi bi-x-lg"></i></button>
                            <button class="btn-i delete" title="Delete task"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </template>
            </div>
            `;

            const task = {
                id: 1,
                title: "New task",
                code: "333",
                status: 0,
            }

            createNode(task);

            const taskItem = document.querySelector("#tasks .lists .task"),
                title = taskItem.querySelector(".title p"),
                code = taskItem.querySelector(".code p");

            expect(taskItem).toBeTruthy();
            expect(taskItem.getAttribute("data-id")).toBe(task.id.toString());
            expect(taskItem.getAttribute("data-code")).toBe(task.code.toString());
            expect(title.textContent).toBe(task.title);
            expect(code.textContent).toBe(task.code);
        })
    })
}

export default testCreate;