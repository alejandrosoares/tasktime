import { removeNode } from "../delete.js";

const testDelete = () => {

    describe('delete.js', () => {

        test('should be delete the div.project node', () => {
            document.body.innerHTML = `
                <div id="projects">

                    <div class="list-container">    
                        <div class="lists">
                            <div class="project" data-id="1" data-code="333">
                                <div class="code">
                                    <p class="code">333</p>
                                </div>
                                <div class="title">
                                    <p>New project</p>
                                </div>
                                <div class="number_tasks">
                                    <p>0 Task</p>
                                </div>
                                <div class="percent_completed">
                                    <p></p>
                                </div>
                                <div class="duration">
                                    <p>No time yet</p>
                                </div>
                                <div class="operations">
                                    <button class="btn-i delete" title="Delete project"><i class="bi bi-trash"></i></button>
                                    <a href="" class="btn view-tasks">Tasks</a>
                                </div>
                            </div>
                            <div class="empty-list d-none">
                                <p>You have no projects.</p>
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