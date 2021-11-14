import { createNode } from "../create.js";

const testCreate = () => {

    describe('create.js', () => {

        test('should be create a div.project node', () => {
            document.body.innerHTML = `
                <div class="create-container">
                    <div class="messages">
                        <div class="msg create">
                            <img src="{% static 'img/check.png' %}">
                            <p></p>
                        </div>
                        <div class="msg error">
                            <img src="{% static 'img/warning.png' %}">
                            <p>Something went wrong <br>Please, try again</p>
                        </div>
                        <div class="msg delete">
                            <img src="{% static 'img/trash.png' %}">
                            <p>Project deleted</p>
                        </div>
                    </div>

                    <div class="new">
                        <p class="msg hidden">Write a new project below</p>
                        <input type="text" id="input-create" placeholder="Create your project task">
                        <button type="button" class="btn btn-create" id="btn-create">Create</button>
                    </div>
                </div>

                <div id="projects">

                    <div class="list-container">    
                        <div class="lists">
                            <div class="empty-list d-none">
                                <p>You have no projects.</p>
                            </div>
                        </div>
                    </div>
            
                    <template id="item">
                        <div class="project" data-id="" data-code="">
                            <div class="code">
                                <p class="code"></p>
                            </div>
                            <div class="title">
                                <p></p>
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
                    </template>
                </div>
            `;

            const project = {
                id: 1,
                title: "New Project",
                code: "333",
                percent_completed: 0,
                str_duration: null
            }

            createNode(project);

            const projectItem = document.querySelector("#projects .lists .project"),
                title = projectItem.querySelector(".title p"),
                code = projectItem.querySelector(".code p");

            expect(projectItem).toBeTruthy();
            expect(projectItem.getAttribute("data-id")).toBe(project.id.toString());
            expect(projectItem.getAttribute("data-code")).toBe(project.code.toString());
            expect(title.textContent).toBe(project.title);
            expect(code.textContent).toBe(project.code);
        })
    })
}

export default testCreate;