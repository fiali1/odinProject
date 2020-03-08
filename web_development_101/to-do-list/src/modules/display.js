export function clearDisplay() {
    const todoDiv = document.querySelector('.display-todo');
    todoDiv.remove();
}

function generateControlButtons() {
    
}

function displayTodoData(e) {
    const display = document.querySelector('.display');
    if(display.children.length > 0)
        clearDisplay();
        
    const data = (e.target.tagName == 'LI') ? e.target.data : e.target.parentNode.data;
    const todoDiv = document.createElement('div');
    const todoTitle = document.createElement('h1');
    const todoDescription = document.createElement('h3');
    const todoDueDate = document.createElement('p');
    const todoPriority = document.createElement('p');

    todoDiv.classList.add('display-todo');

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

export function displayTodo(e) {
    generateControlButtons();
    displayTodoData(e);
}

