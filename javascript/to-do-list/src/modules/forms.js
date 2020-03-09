import { createProject, createTodo } from './sidebar';

//Removes the div that holds the form
export function clearForm() {
    const darkDiv = document.querySelector('.dark-div');
    darkDiv.remove();
}

//Generates dark background div to allocate form
function generateDarkDiv() {
    const darkDiv = document.createElement('div');
    darkDiv.classList.add('dark-div');
    return darkDiv;
}

//Generates selectable options to attach To Dos or Projects
function generateList(e, opr, projects) {
    const formDiv = document.querySelector('.form-div');
    const submitBtn = document.querySelector('.submit-btn');

    if(e.target.checked == true) {
        const div = document.createElement('div');
        const ul = document.createElement('ul');
        
        div.classList.add('list-div');

        //Generate either a list of projects (0) or a list of to dos (1) to be selected
        if(opr == 0) {
            projects[0].todos.forEach(todo => {
                const li = document.createElement('li');
                const a = document.createElement('a');
    
                a.textContent = todo.name;
                a.addEventListener('click', (e) => {
                    e.target.parentNode.toggleAttribute('selected');
                });
    
                li.appendChild(a);
                ul.appendChild(li);
            });
        }
        else if(opr == 1) {
            projects.forEach(project => {
                if(project != projects[0]) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');

                    a.textContent = project.name;
                    a.addEventListener('click', (e) => {
                        e.target.parentNode.toggleAttribute('selected');
                    });

                    li.appendChild(a);
                    ul.appendChild(li);
                }
            });
        }
        div.appendChild(ul);
        formDiv.insertBefore(div, submitBtn);
    }
    else {
        const todoDiv = document.querySelector('.list-div');
        todoDiv.remove();
    }
}

export function generateTodoForm(projects, opr) {
    const darkDiv = generateDarkDiv();
    const formDiv = document.createElement('div');
    const formHeader = document.createElement('h3');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('textarea');
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
    const priorityLabel = document.createElement('label');
    const priorityInput = document.createElement('input');
    const addTodoDiv = document.createElement('div');
    const addTodoLabel = document.createElement('label');
    const addTodoInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    
    formDiv.classList.add('form-div', 'todo');
    titleInput.classList.add('form-todo-title');
    descriptionInput.classList.add('form-todo-description');
    dateInput.classList.add('form-todo-date');
    priorityInput.classList.add('form-todo-priority');
    submitBtn.classList.add('submit-btn');
    cancelBtn.classList.add('cancel-btn');

    formHeader.textContent = (opr == 0) ? 'Create Your New To Do' : 'Edit Your To Do';
    titleLabel.textContent = 'To Do Title';
    titleInput.placeholder = 'Enter To Do Title';
    descriptionLabel.textContent = 'Description';
    descriptionInput.placeholder = 'Enter A Short Description';
    descriptionInput.setAttribute('rows', '2');
    dateLabel.textContent = 'Due Date';
    dateInput.placeholder = 'Enter Due Date (dd/mm/yy)';
    priorityLabel.textContent = 'Priority';
    priorityInput.placeholder = 'Set Priority (1 to 10)';
    addTodoDiv.classList.add('add-todo-div');
    addTodoInput.classList.add('form-check');
    submitBtn.textContent = 'Submit';
    cancelBtn.textContent = 'Cancel';

    submitBtn.addEventListener('click', () => {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const date = dateInput.value;
        const priority = priorityInput.value;

        createTodo(title, description, date, priority, projects);
    });
    cancelBtn.addEventListener('click', () => {
        clearForm(formDiv);
        return;
    })

    formDiv.appendChild(formHeader);
    formDiv.appendChild(titleLabel);
    formDiv.appendChild(titleInput);
    formDiv.appendChild(descriptionLabel);
    formDiv.appendChild(descriptionInput);
    formDiv.appendChild(dateLabel);
    formDiv.appendChild(dateInput);
    formDiv.appendChild(priorityLabel);
    formDiv.appendChild(priorityInput);
    if(projects.length > 1) {
        addTodoLabel.textContent = 'Attach To Do to some project?';
        addTodoInput.type = 'checkbox';
        addTodoInput.addEventListener('click', (e) => {
            generateList(e, 1, projects);
        });

        addTodoDiv.appendChild(addTodoLabel);
        addTodoDiv.appendChild(addTodoInput);
        formDiv.appendChild(addTodoDiv);
    }
    
    formDiv.appendChild(submitBtn);
    formDiv.appendChild(cancelBtn);
    darkDiv.appendChild(formDiv);
    document.body.appendChild(darkDiv);
}

export function generateProjectForm(projects) {
    const darkDiv = generateDarkDiv();
    const formDiv = document.createElement('div');
    const formHeader = document.createElement('h3');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const addTodoDiv = document.createElement('div');
    const addTodoLabel = document.createElement('label');
    const addTodoInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    formDiv.classList.add('form-div', 'project');
    titleInput.classList.add('form-project-title');
    addTodoDiv.classList.add('add-todo-div');
    addTodoInput.classList.add('form-check');
    submitBtn.classList.add('submit-btn');
    cancelBtn.classList.add('cancel-btn');

    formHeader.textContent = 'Create Your New Project';
    titleLabel.textContent = 'Project Title';
    titleInput.placeholder = 'Enter Project Title';
    submitBtn.textContent = 'Submit';
    cancelBtn.textContent = 'Cancel';
    
    submitBtn.addEventListener('click', () => {
        const title = titleInput.value;
        createProject(title, projects);
    });
    cancelBtn.addEventListener('click', () => {
        clearForm(formDiv);
        return;
    })

    formDiv.appendChild(formHeader);
    formDiv.appendChild(titleLabel);
    formDiv.appendChild(titleInput);
    if(projects[0].todos.length != 0) {
        addTodoLabel.textContent = 'Add some existing To Dos?';
        addTodoInput.type = 'checkbox';
        addTodoInput.addEventListener('click', (e) => {
            generateList(e, 0, projects);
        });

        addTodoDiv.appendChild(addTodoLabel);
        addTodoDiv.appendChild(addTodoInput);
        formDiv.appendChild(addTodoDiv);
    }

    formDiv.appendChild(submitBtn);
    formDiv.appendChild(cancelBtn);
    darkDiv.appendChild(formDiv);
    document.body.appendChild(darkDiv);
}