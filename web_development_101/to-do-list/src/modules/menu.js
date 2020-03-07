import Todo from './todo'
import Project from './project';

const todo = new Todo('Software Engineering', 'World', '3/3/1998', 'High as a kite');
const todo2 = new Todo('Artificial Life', 'There', '4/4/1998', 'High as a kite on a mountain');
const todo3 = new Todo('Computer Networks', 'World', '5/5/1998', 'High as a kite');
const todo4 = new Todo('JavaScript Track', 'World', '6/6/1998', 'High as a kite on the ISS');
const todo5 = new Todo('To-Do List Project', 'World', '6/6/1998', 'High as a kite on the ISS');
const todo6 = new Todo('Rock-Paper-Scissors UI', 'World', '6/6/1998', 'High as a kite on the ISS');

const project = new Project('All To Dos');
const project2 = new Project('UFABC');
const project3 = new Project('Odin Project');

let todos = [];
let projects = [];

todos.push(todo);
todos.push(todo2);
todos.push(todo3);
todos.push(todo4);
todos.push(todo5);
todos.push(todo6);

project.addTodo(todo);
project.addTodo(todo2);
project.addTodo(todo3);
project.addTodo(todo4);
project.addTodo(todo5);
project.addTodo(todo6);

project2.addTodo(todo2);
project2.addTodo(todo);
project2.addTodo(todo3);

project3.addTodo(todo4);
project3.addTodo(todo5);
project3.addTodo(todo6);

projects.push(project);
projects.push(project2);
projects.push(project3);

function generateList(e, opr) {
    const formDiv = document.querySelector('.form-div');
    const submitBtn = document.querySelector('.submit-btn');

    if(e.target.checked == true) {
        const div = document.createElement('div');
        const ul = document.createElement('ul');
        
        div.classList.add('list-div');

        if(opr == 0) {
            todos.forEach(todo => {
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
                const li = document.createElement('li');
                const a = document.createElement('a');

                a.textContent = project.name;
                a.addEventListener('click', (e) => {
                    e.target.parentNode.toggleAttribute('selected');
                });

                li.appendChild(a);
                ul.appendChild(li);
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

function generateTodoForm() {
    const darkDiv = document.createElement('div');
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
    
    darkDiv.classList.add('dark-div');
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

    if(projects.length != 0) {
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
    const darkDiv = document.createElement('div');
    const formDiv = document.createElement('div');
    const formHeader = document.createElement('h3');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const addTodoDiv = document.createElement('div');
    const addTodoLabel = document.createElement('label');
    const addTodoInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    darkDiv.classList.add('dark-div');
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

    if(projects.length != 0) {
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

function deleteProject(item) {
    const index = projects.indexOf(item);
    if(index != -1)
        projects.splice(index, 1);
    
    generateProjects();
}

function showTodos(dataDiv, item) {
    if(dataDiv.parentElement.getAttribute('show') != null) {
        dataDiv.parentElement.toggleAttribute('show');
        dataDiv.parentElement.lastChild.remove();
        return;
    }

    dataDiv.parentElement.toggleAttribute('show');
    const todoDiv = document.createElement('ul');
    const todos = item.getTodos();
    todos.map(todo => {
        const todoItem = document.createElement('li');
        const todoTitle = document.createElement('a');
        
        todoTitle.textContent = todo.name;
    
        todoItem.appendChild(todoTitle);
        todoDiv.appendChild(todoItem);
    });
    dataDiv.parentElement.appendChild(todoDiv);
}

function emptyWarning() {
    const sidebar = document.querySelector('.sidebar');
    const warningDiv = document.createElement('div');
    const warningText = document.createElement('h3');
    const warningDescription = document.createElement('p');

    warningDiv.classList.add('empty-warning');
    warningText.textContent = 'It appears you have no Projects.';
    warningDescription.textContent = 'Start by creating one with the \'+ Project\' button and add some To Dos to it!';

    warningDiv.appendChild(warningText);
    warningDiv.appendChild(warningDescription);
    sidebar.appendChild(warningDiv);
}

function generateProjects() {
    const sidebar = document.querySelector('.sidebar');

    if(sidebar.childNodes.length == 2)
        clearProjects();

    if(projects.length == 0) {
        emptyWarning();
        return;
    }

    const projectDiv = document.createElement('div');

    projects.forEach(item => {
        let i = 1;
        const projectItem = document.createElement('div');
        const projectDataDiv = document.createElement('div');
        const projectItemName = document.createElement('h2');
        const projectEditIcon = document.createElement('img');
        const projectDeleteIcon = document.createElement('img');

        projectDiv.classList.add('project-div');
        projectItem.classList.add('project-item');
        projectDataDiv.classList.add('project-item-data');

        projectEditIcon.id = 'edit-icon';
        projectEditIcon.src = './assets/icons/pencil.png';
        projectDeleteIcon.id = 'delete-icon';
        projectDeleteIcon.src = './assets/icons/delete.png';

        projectItemName.textContent = item.name;
        projectItemName.addEventListener('click', () => { showTodos(projectDataDiv, item); });
        projectDeleteIcon.addEventListener('click', () => { deleteProject(item); });
        
        projectDataDiv.appendChild(projectItemName);
        projectDataDiv.appendChild(projectEditIcon);
        projectDataDiv.appendChild(projectDeleteIcon);
        projectItem.appendChild(projectDataDiv);
        projectDiv.appendChild(projectItem);
    });

    sidebar.appendChild(projectDiv);
}

function generateMenu() {
    generateButtons();
    generateProjects();
}

function menu() {
    generateMenu();
}

export default menu;