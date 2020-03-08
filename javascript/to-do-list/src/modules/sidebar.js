import Todo from './todo'
import Project from './project';
import { displayTodo, clearDisplay } from './display';

const project = new Project('All To Dos');

let projects = [];
projects.push(project);

function generateList(e, opr) {
    const formDiv = document.querySelector('.form-div');
    const submitBtn = document.querySelector('.submit-btn');

    if(e.target.checked == true) {
        const div = document.createElement('div');
        const ul = document.createElement('ul');
        
        div.classList.add('list-div');

        //Generate either a list of projects or a list of to dos to be selected
        if(opr == 0) {
            projects[0].getTodos().forEach(todo => {
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
            let i = 0;
            projects.forEach(project => {
                if(i != 0) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');

                    a.textContent = project.name;
                    a.addEventListener('click', (e) => {
                        e.target.parentNode.toggleAttribute('selected');
                    });

                    li.appendChild(a);
                    ul.appendChild(li);
                }
                i++;
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

function generateDarkDiv() {
    const darkDiv = document.createElement('div');
    darkDiv.classList.add('dark-div');
    return darkDiv;
}

function generateTodoForm() {
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

    formHeader.textContent = 'Create Your New To Do';
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

        createTodo(title, description, date, priority);
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
            generateList(e, 1);
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

function generateProjectForm() {
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
    
    submitBtn.addEventListener('click', function() {
        const title = titleInput.value;
        createProject(title, formDiv);
    });
    cancelBtn.addEventListener('click', () => {
        clearForm(formDiv);
        return;
    })

    formDiv.appendChild(formHeader);
    formDiv.appendChild(titleLabel);
    formDiv.appendChild(titleInput);

    if(projects[0].getTodos().length != 0) {
        addTodoLabel.textContent = 'Add some existing To Dos?';
        addTodoInput.type = 'checkbox';
        addTodoInput.addEventListener('click', (e) => {
            generateList(e, 0);
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

function clearForm() {
    const darkDiv = document.querySelector('.dark-div');
    darkDiv.remove();
}

function createProject(title) {
    const newProject = new Project(title);
    const check = document.querySelector('.form-check');
    const todos = projects[0].getTodos();
    if(check != null && check.checked == true) {
        const selected = document.querySelectorAll('li[selected] a');
        selected.forEach(item => {
            for(let i = 0; i < todos.length; i++) 
                if(todos[i].name == item.textContent)
                    newProject.addTodo(todos[i]);
        });
    }

    projects.push(newProject);
    clearForm();
    generateProjects();
}

function createTodo(title, description, date, priority) {
    const newTodo = new Todo(title, description, date, priority);
    const check = document.querySelector('.form-check');
    projects[0].addTodo(newTodo);
    
    if(check != null && check.checked == true) {
        const selected = document.querySelectorAll('li[selected] a');

        selected.forEach(item => {
            for(let i = 0; i < projects.length; i++) 
                if(projects[i].name == item.textContent) {
                    projects[i].addTodo(newTodo);
                }
        });
    }

    clearForm();
    generateProjects();
}

function generateButtons() {
    const sidebar = document.querySelector('.sidebar');
    const btnDiv = document.createElement('div');
    const projectBtn = document.createElement('button');
    const todoBtn = document.createElement('button');
    
    btnDiv.classList.add('btn-div');
    projectBtn.classList.add('project-btn');
    todoBtn.classList.add('todo-btn');

    projectBtn.textContent = '+ Project';
    projectBtn.addEventListener('click', generateProjectForm);
    todoBtn.textContent = '+ Todo';
    todoBtn.addEventListener('click', generateTodoForm);

    btnDiv.appendChild(projectBtn);
    btnDiv.appendChild(todoBtn);
    sidebar.appendChild(btnDiv);
}

function clearProjects() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.lastChild.remove();
}

function deleteProject(projectItem) {
    const data = projectItem.data;
    const index = projects.indexOf(data);
    const itemTodos = data.getTodos();
    const displayedItemTitle = document.querySelector('.display-todo');

    /*
    *   Checks if there is a to do currently displayed. 
    *   If true, then checks if it is among the to dos being deleted. 
    *   If also true, clears the display.
    */
    if(displayedItemTitle != null) {
        for(let i = 0; i < itemTodos.length; i++)
            if(itemTodos[i].name == displayedItemTitle.firstChild.textContent)
                clearDisplay();
    }
    
    if(index != -1)
        projects.splice(index, 1);
    
    generateProjects();
}

function showTodos(projectItem) {
    if(projectItem.getAttribute('show') != null) {
        projectItem.toggleAttribute('show');
        projectItem.lastChild.remove();
        return;
    }

    projectItem.toggleAttribute('show');
    const todoDiv = document.createElement('ul');
    const todos = projectItem.data.getTodos();
    todos.map(todo => {
        const todoItem = document.createElement('li');
        const todoTitle = document.createElement('a');
        
        todoItem.data = todo;
        todoTitle.textContent = todoItem.data.name;
        todoItem.addEventListener('click', displayTodo);
    
        todoItem.appendChild(todoTitle);
        todoDiv.appendChild(todoItem);
    });
    projectItem.appendChild(todoDiv);
}

function emptyWarning() {
    const sidebar = document.querySelector('.sidebar');
    const warningDiv = document.createElement('div');
    const warningText = document.createElement('h3');
    const warningDescription = document.createElement('p');

    warningDiv.classList.add('empty-warning');
    warningText.textContent = 'It appears you have no Projects or To Dos.';
    warningDescription.textContent = 'Start by creating either one with the \'+\' buttons!';

    warningDiv.appendChild(warningText);
    warningDiv.appendChild(warningDescription);
    sidebar.appendChild(warningDiv);
}

function generateProjects() {
    const sidebar = document.querySelector('.sidebar');

    if(sidebar.childNodes.length == 2)
        clearProjects();

    if(projects.length == 1 && projects[0].getTodos().length == 0) {
        emptyWarning();
        return;
    }

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-div');
    
    let i = 0;
    projects.forEach(item => {
        //Doesn't display All To Dos if there is no To Do
        if(projects[0].getTodos().length == 0 && i++ == 0) { return; }
        const projectItem = document.createElement('div');
        const projectDataDiv = document.createElement('div');
        const projectItemName = document.createElement('h2');
        const projectEditIcon = document.createElement('img');
        const projectDeleteIcon = document.createElement('img');
        
        projectEditIcon.id = 'edit-icon';
        projectEditIcon.src = './assets/icons/pencil.png';
        projectDeleteIcon.id = 'delete-icon';
        projectDeleteIcon.src = './assets/icons/delete.png';

        projectItem.data = item;    
        projectItem.classList.add('project-item');
        projectDataDiv.classList.add('project-item-data');
        projectItemName.textContent = item.name;
        projectItemName.addEventListener('click', () => { showTodos(projectItem); });
        projectDeleteIcon.addEventListener('click', () => { deleteProject(projectItem); });

        projectDataDiv.appendChild(projectItemName);
        if(i != 0) {
            projectDataDiv.appendChild(projectEditIcon);
            projectDataDiv.appendChild(projectDeleteIcon);
        }
        projectItem.appendChild(projectDataDiv);
        projectDiv.appendChild(projectItem);
        i++;
    });

    sidebar.appendChild(projectDiv);
}

function generateMenu() {
    generateButtons();
    generateProjects();
}

function sidebar() {
    generateMenu();
}

export default sidebar;