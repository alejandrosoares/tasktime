import { removeNode } from "../delete.js";

const testDelete = () => {

    describe('delete.js', () => {

        test('should be delete the div.project node', () => {
            document.body.innerHTML = `
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
                            <div class="task" data-id="1">
                                <p>Task for delete</p>
                            </div>
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
                            <div class="empty-list d-none ">
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

                </div>
            </div>
            `;

            removeNode(1);

            const projectItem = document.querySelector("#projects .lists .project");

            expect(projectItem).toBeNull();
        })
    })
}


export default testDelete;