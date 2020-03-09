import { save } from './storage';
import { generateProjects, createTodo } from './sidebar';
import { generateTodoForm } from './forms';

export function clearDisplay() {
    const todoDiv = document.querySelector('.display-todo');
    todoDiv.remove();
}

function findTodo(data, projects) {
    const indexes = [];
    let i = 0;
    
    projects.forEach(project => {
        const todos = project._todos;
        const index = todos.indexOf(data);
        if(index != -1)
            indexes.push(i);
        i++;
    });
    
    return indexes;
} 

function editTodo(todoDiv, projects) {
    generateTodoForm(projects, 1);
    const data = todoDiv.data;
    const titleInput = document.querySelector('.form-todo-title');
    const descriptionInput = document.querySelector('.form-todo-description');
    const dateInput = document.querySelector('.form-todo-date');
    const priorityInput = document.querySelector('.form-todo-priority');
    const submitBtn = document.querySelector('.submit-btn');

    titleInput.value = data._name;
    descriptionInput.value = data._description;
    dateInput.value = data._dueDate;
    priorityInput.value = data._priority;

    const newSubmitBtn = submitBtn.cloneNode();
    newSubmitBtn.classList.add('submit-btn');
    newSubmitBtn.textContent = 'Submit';

    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', () => {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const date = dateInput.value;
        const priority = priorityInput.value;

        deleteTodo(todoDiv, projects);
        createTodo(title, description, date, priority, projects);
    });
}

function deleteTodo(todoDiv, projects) {
    const data = todoDiv.data;
    const indexes = findTodo(data, projects);
    
    indexes.forEach(index => {
        const i = projects[index]._todos.indexOf(data);

        if(i != -1) { projects[index]._todos.splice(i, 1); }
    })

    clearDisplay();
    save(projects);
    generateProjects(projects);
}

function generateControlButtons(projects) {
    const todoDiv = document.querySelector('.display-todo');
    const controlTodoDiv = document.createElement('div');
    const closeTodoBtn = document.createElement('button');
    const editTodoBtn = document.createElement('button');
    const deleteTodoBtn = document.createElement('button');

    closeTodoBtn.classList.add('close-todo-btn');
    editTodoBtn.classList.add('edit-todo-btn');
    deleteTodoBtn.classList.add('delete-todo-btn');
    closeTodoBtn.textContent = 'Close';
    editTodoBtn.textContent = 'Edit';
    deleteTodoBtn.textContent = 'Delete';

    closeTodoBtn.addEventListener('click', clearDisplay);
    deleteTodoBtn.addEventListener('click', () => deleteTodo(todoDiv, projects));
    editTodoBtn.addEventListener('click', () => editTodo(todoDiv, projects));

    controlTodoDiv.appendChild(closeTodoBtn);
    controlTodoDiv.appendChild(editTodoBtn);
    controlTodoDiv.appendChild(deleteTodoBtn);
    todoDiv.appendChild(controlTodoDiv);
}

function displayTodoData(e) {
    const display = document.querySelector('.display');
    if (display.children.length > 0)
        clearDisplay();

    const data = (e.target.tagName == 'LI') ? e.target.data : e.target.parentNode.data;
    const todoDiv = document.createElement('div');
    const todoTitle = document.createElement('h1');
    const todoDescription = document.createElement('h3');
    const todoDueDate = document.createElement('p');
    const todoPriority = document.createElement('p');

    todoDiv.classList.add('display-todo');
    todoDiv.data = data;

    todoTitle.textContent = data.name;
    todoDescription.textContent = 'Description: ' + data.description;
    todoDueDate.textContent = 'Due Date: ' + data.dueDate;
    todoPriority.textContent = 'Priority: ' + data.priority;

    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDescription);
    todoDiv.appendChild(todoDueDate);
    todoDiv.appendChild(todoPriority);
    display.appendChild(todoDiv);
}

export function displayTodo(e, projects) {
    displayTodoData(e);
    generateControlButtons(projects);
}