class Project {
    constructor (name) {
        this._name = name;
        this._todos = [];
    }

    //Edit data
    set name(name) { this._name = name; }
    addTodo(todo) { this._todos.push(todo); }
    removeTodo(todo) {
        const index = this._todos.indexOf(todo);
        this._todos.splice(index, 1);
    }

    //Display data
    get name() { return this._name; }
    getTodos() { return this._todos; }
}

export default Project;
