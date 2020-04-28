const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization;

        const todos = await connection('todos')
            .where('user_id', user_id)
            .join('users', 'users.id', '=', 'todos.user_id')
            .select([
                'todos.*',
                'users.username'
            ]);
        
        return response.json(todos);
    },
};