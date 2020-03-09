import Project from "./project";
import Todo from "./todo";

//Stores data locally as JSON 
export function save(array) {
    const json = JSON.stringify(array);
    localStorage.setItem('storage', json);
}

//Retrieves data from localStorage and converts it to Project and To Do objects 
export function load() {
    const array = JSON.parse(localStorage.getItem('storage'));
    if(array == null) { return []; }

    const arrayWithMethods = [];
    array.forEach(item => {
        const newItem = new Project(item._name);
        const todos = item._todos;
        
        todos.forEach(todo => {
            const newTodo = new Todo(todo._name, todo._description, todo._dueDate, todo._priority);
            newItem.addTodo(newTodo);
        });

        arrayWithMethods.push(newItem);
    });
    
    return arrayWithMethods;
}