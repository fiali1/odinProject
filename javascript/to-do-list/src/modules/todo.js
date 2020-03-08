class Todo {
    constructor (name, description, dueDate, priority) {
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }

    //Edit data
    set name(name) { this._name = name; }
    set description(description) { this._description = description; }
    set dueDate(dueDate) { this._dueDate = dueDate; }
    set priority(priority) { this._priority = priority; }

    //Display data
    get name() { return this._name; }
    get description() { return this._description; }
    get dueDate() { return this._dueDate; }
    get priority() { return this._priority; }
}

export default Todo;