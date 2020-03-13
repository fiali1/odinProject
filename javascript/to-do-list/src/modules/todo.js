class Todo {
    constructor (name, description, dueDate, priority) {
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._status = 0;
    }

    //Edit data
    set name(name) { this._name = name; }
    set description(description) { this._description = description; }
    set dueDate(dueDate) { this._dueDate = dueDate; }
    set priority(priority) { this._priority = priority; }
    set status(status) {this._status = status; }

    //Display data
    get name() { return this._name; }
    get description() { return this._description; }
    get dueDate() { return this._dueDate; }
    get priority() { return this._priority; }
    get status() { return this._status; }
}

export default Todo;