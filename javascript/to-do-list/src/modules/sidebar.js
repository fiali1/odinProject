import Todo from './todo'
import Project from './project';
import { displayTodo, clearDisplay } from './display';
import { save, load } from './storage';
import { generateProjectForm, generateTodoForm, clearForm } from './forms';
import { emptyWarning, clearWarning, noTitleWarning } from './warnings';

//Sets up a 'main' project that will hold all To Dos on the first run
function setupStart() {
    const project = new Project('All To Dos');
    let projects = (load() == []) ? [] : load();
    if (projects.length == 0) { projects.push(project); }

    return projects;
}

export function createTodo(title, description, date, priority, projects) {
    const newTodo = new Todo(title, description, date, priority);
    const check = document.querySelector('.form-check');
    projects[0].addTodo(newTodo);
    
    if(check != null && check.checked == true) {
        const selected = document.querySelectorAll('li[selected] a');

        selected.forEach(item => {
            for(let i = 0; i < projects.length; i++) 
                if(projects[i].name == item.textContent) { projects[i].addTodo(newTodo); }
        });
    }

    save(projects);
    clearForm();
    generateProjects(projects);
}

function generateButtons(projects) {
    const sidebar = document.querySelector('.sidebar');
    const btnDiv = document.createElement('div');
    const projectBtn = document.createElement('button');
    const todoBtn = document.createElement('button');
    
    btnDiv.classList.add('btn-div');
    projectBtn.classList.add('project-btn');
    todoBtn.classList.add('todo-btn');

    projectBtn.textContent = '+ Project';
    projectBtn.addEventListener('click', () => generateProjectForm(projects));
    todoBtn.textContent = '+ Todo';
    todoBtn.addEventListener('click', ()=> generateTodoForm(projects, 0));

    btnDiv.appendChild(projectBtn);
    btnDiv.appendChild(todoBtn);
    sidebar.appendChild(btnDiv);
}

function clearProjects() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.lastChild.remove();
}

export function createProject(title, projects) {
    const newProject = new Project(title);
    const check = document.querySelector('.form-check');
    const todos = projects[0].todos;

    if(check != null && check.checked == true) {
        const selected = document.querySelectorAll('li[selected] a');

        selected.forEach(item => {
            for(let i = 0; i < todos.length; i++) 
                if(todos[i].name == item.textContent) { newProject.addTodo(todos[i]); }
        });
    }

    projects.push(newProject);
    save(projects);
    clearForm();
    generateProjects(projects);
}

function editProject(projectItem, projects) {
    generateProjectForm(projects, 1);
    const data = projectItem.data;
    const titleInput = document.querySelector('.form-project-title');
    const submitBtn = document.querySelector('.submit-btn');
    
    titleInput.value = data._name;
    
    const newSubmitBtn = submitBtn.cloneNode();
    newSubmitBtn.classList.add('submit-btn');
    newSubmitBtn.textContent = 'Submit';

    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', () => {
        const title = titleInput.value;

        if(title == '')
            noTitleWarning(titleInput);
        else {
            deleteProject(projectItem, projects);
            createProject(title, projects);
        }
    });
}

function deleteProject(projectItem, projects) {
    const data = projectItem.data;
    const index = projects.indexOf(data);
    const itemTodos = data.todos;
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
    
    save(projects);
    generateProjects(projects);
}

function setStatus(todoItem) {
    todoItem.classList.toggle('concluded');
}

function showTodos(projectItem, projects) {
    if(projectItem.data.todos.length == 0) { 
        projectItem.toggleAttribute('empty');
        setTimeout(()=> {
            projectItem.toggleAttribute('empty');
        }, 500);
        return; 
    }
    if(projectItem.getAttribute('show') != null) {
        projectItem.toggleAttribute('show');
        projectItem.lastChild.remove();
        return;
    }

    projectItem.toggleAttribute('show');
    const todoDiv = document.createElement('ul');
    const todos = projectItem.data.todos;
    todos.map(todo => {
        const todoItem = document.createElement('li');
        const todoTitle = document.createElement('a');
        const todoCheck = document.createElement('input');
        todoCheck.type = 'checkbox';
        todoItem.data = todo;
        todoTitle.textContent = todoItem.data.name;
        todoItem.addEventListener('click', (e) => displayTodo(e, projects));
        todoCheck.addEventListener('click', () => setStatus(todoItem));
        
        todoItem.appendChild(todoTitle);
        //todoItem.appendChild(todoCheck);
        todoDiv.appendChild(todoItem);
    });
    projectItem.appendChild(todoDiv);
}

export function clearTodos(projects) {
    projects.forEach(project => {
        project._todos = [];
    });

    save(projects);
    clearDisplay();
    clearForm();
    generateProjects(projects);
}

export function generateProjects(projects) {
    const sidebar = document.querySelector('.sidebar');
    const theme = document.querySelector('#theme').getAttribute('theme');
    if(sidebar.childNodes.length == 2)
        clearProjects();

    if(projects.length <= 1 && projects[0].todos.length == 0) {
        emptyWarning();
        return;
    }

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-div');
    
    let i = 0;
    projects.forEach(item => {
        //Doesn't display All To Dos if there is no To Do
        if(projects[0].todos.length == 0 && i++ == 0) { return; }
        const projectItem = document.createElement('div');
        const projectDataDiv = document.createElement('div');
        const projectItemName = document.createElement('h2');
        
        projectItem.data = item;    
        projectItem.classList.add('project-item');
        projectDataDiv.classList.add('project-item-data');
        projectItemName.textContent = item.name;
        projectItemName.addEventListener('click', () => showTodos(projectItem, projects));
        projectDataDiv.appendChild(projectItemName);
        
        if(i != 0) {
            const projectEditIcon = document.createElement('img');
            const projectDeleteIcon = document.createElement('img');
            projectEditIcon.id = 'edit-icon';
            projectEditIcon.src = `./assets/icons/pencil-${theme}.png`;
            projectDeleteIcon.id = 'delete-icon';
            projectDeleteIcon.src = `./assets/icons/delete-${theme}.png`;
            projectEditIcon.addEventListener('click', () => editProject(projectItem, projects));
            projectDeleteIcon.addEventListener('click', () => deleteProject(projectItem, projects));
            projectDataDiv.appendChild(projectEditIcon);
            projectDataDiv.appendChild(projectDeleteIcon);
        }
        else {
            projectDataDiv.classList.add('all-todos');
            const projectClearIcon = document.createElement('img');
            projectClearIcon.id = 'clear-icon';
            projectClearIcon.src = `./assets/icons/close-${theme}.png`;
            projectClearIcon.addEventListener('click', () => clearWarning(projects));
            projectDataDiv.appendChild(projectClearIcon);
        }
        projectItem.appendChild(projectDataDiv);
        projectDiv.appendChild(projectItem);
        i++;
    });

    sidebar.appendChild(projectDiv);
}

function sidebar() {
    const projects = setupStart();
    generateButtons(projects);
    generateProjects(projects);
}

export default sidebar;