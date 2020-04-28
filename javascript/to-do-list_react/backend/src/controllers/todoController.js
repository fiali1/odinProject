const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {title, description, dueDate, priority} = request.body;
        const user_id = request.headers.authorization;

        const status = 0;

        const [id] = await connection('todos').insert({
            title,
            description,
            dueDate,
            priority,
            status,
            user_id
        });

        return response.json({ id });
    },

    async edit(request, response) {
        const {id} = request.params;
        const {title, description, dueDate, priority} = request.body;
        const user_id = request.headers.authorization;

        const targetTodo = await connection('todos')
            .where('id', id)
            .select('todos.*')
            .first();
        
        
        if (targetTodo.user_id != user_id)
           return response.status(401).json({ error: "Operation not permitted" });

        await connection('todos')
            .where('id', id)
            .update({
                title,
                description,
                dueDate,
                priority
            });

        const newTodo = await connection('todos')
            .where('id', id)
            .select('todos.*')
            .first();

        return response.json(newTodo);
    },

    async status(request, response) {
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const targetTodo = await connection('todos')
            .where('id', id)
            .select('user_id', 'status')
            .first();
                
        if (targetTodo.user_id != user_id)
            return response.status(401).json({ error: "Operation not permitted" });

        const status = (targetTodo.status == 0) ? 1 : 0;

        await connection('todos')
            .where('id', id)
            .update({
                status
            });

        const newTodo = await connection('todos')
            .where('id', id)
            .select('todos.*')
            .first();

        return response.json(newTodo);
    },

    async index(request, response) {
        const todos = await connection('todos')
            .join('users', 'users.id', '=', 'todos.user_id')
            .select([
                'todos.*',
                'users.username'
            ]);
        
        return response.json(todos);
    },

    async details(request, response) {
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const targetTodo = await connection('todos')
            .where('id', id)
            .select('user_id')
            .first();
    
        if (targetTodo.user_id != user_id)
            return response.status(401).json({ error: "Operation not permitted" });

        const todo = await connection('todos')
            .where('id', id)
            .select('todos.*')
            .first();
        
        return response.json(todo);
    },

    async delete(request, response) {
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const targetTodo = await connection('todos')
            .where('id', id)
            .select('user_id')
            .first();
        
        if (targetTodo.user_id != user_id)
            return response.status(401).json({ error: "Operation not permitted" });

        await connection('todos')
            .where('id', id)
            .delete();

        return response.status(204).send();
    }
};