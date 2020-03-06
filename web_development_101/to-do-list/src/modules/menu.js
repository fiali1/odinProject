import Todo from './todo'
import Project from './project';

const todo = new Todo('Software Engineering', 'World', '3/3/1998', 'High as a kite');
const todo2 = new Todo('Artificial Life', 'There', '4/4/1998', 'High as a kite on a mountain');
const todo3 = new Todo('Computer Networks', 'World', '5/5/1998', 'High as a kite');
const todo4 = new Todo('Odin Project', 'World', '6/6/1998', 'High as a kite on the ISS');
const project = new Project('All Todos');
const project2 = new Project('UFABC');
const project3 = new Project('UFABC2');
const project4 = new Project('UFABC3');
const project5 = new Project('UFABC4');
const project6 = new Project('UFABC5');

let projects = [];

project.addTodo(todo);
project.addTodo(todo2);
project.addTodo(todo3);
project.addTodo(todo4);

project2.addTodo(todo2);
project2.addTodo(todo);
project2.addTodo(todo3);


projects.push(project);
projects.push(project2);
projects.push(project3);
projects.push(project4);
projects.push(project5);
projects.push(project6);

for(let i = 2; i < 6; i++) {
    projects[i].addTodo(todo);
    projects[i].addTodo(todo2);
    projects[i].addTodo(todo3);
}

function createProject() {

}

function createTodo() {
    
}

function generateButtons(sidebar) {
    const btnDiv = document.createElement('div');
    const projectBtn = document.createElement('button');
    const todoBtn = document.createElement('button');
    
    btnDiv.classList.add('btn-div');
    projectBtn.classList.add('project-btn');
    todoBtn.classList.add('todo-btn');

    projectBtn.textContent = '+ Project';
    projectBtn.addEventListener('click', createProject);
    todoBtn.textContent = '+ Todo';
    todoBtn.addEventListener('click', createTodo);

    btnDiv.appendChild(projectBtn);
    btnDiv.appendChild(todoBtn);
    sidebar.appendChild(btnDiv);
}

function showTodos(e, item) {
    if(e.target.parentElement.getAttribute('show') != null) {
        e.target.parentElement.toggleAttribute('show');
        e.target.parentElement.lastChild.remove();

        return;
    }

    e.target.parentElement.toggleAttribute('show');

    const todoDiv = document.createElement('ul');
    const todos = item.getTodos();
    todos.map(todo => {
        const todoItem = document.createElement('li');
        const todoTitle = document.createElement('a');
        
        todoTitle.textContent = todo.name;
    
        todoItem.appendChild(todoTitle);
        todoDiv.appendChild(todoItem);
    });
    
    e.target.parentElement.appendChild(todoDiv);
}

function generateProjects(sidebar) {
    const projectDiv = document.createElement('div');

    projects.forEach(item => {
        let i = 1;
        const projectItem = document.createElement('div');
        const projectItemName = document.createElement('h2');

        projectDiv.classList.add('project-div');
        projectItem.classList.add('project-item');
        projectItemName.classList.add('target');

        projectItemName.textContent = item.name;
        projectItemName.addEventListener('click', (e) => { showTodos(e, item); });
        
        projectItem.appendChild(projectItemName);
        projectDiv.appendChild(projectItem);
    });

    sidebar.appendChild(projectDiv);
}

function generateMenu(sidebar) {
    generateButtons(sidebar);
    generateProjects(sidebar);
}

function menu() {
    const sidebar = document.querySelector('.sidebar');

    generateMenu(sidebar);
}

export default menu;