const connection = require('../database/connection');
const generateId = require('../utils/generateId');

module.exports = {
    async create(request, response) {
        const { username, password } = request.body;
        const id = generateId();

        await connection('users').insert({
            id,
            username,
            password
        });

        return response.json({ id });
    },

    async index(request, response) {
        const users = await connection('users')
            .select("users.*");

        return response.json(users);
    },

    async edit(request, response) {
        const {id} = request.params;
        const {username, password} = request.body;

        await connection('users')
            .where('id', id)
            .update({
                username,
                password
            });

        return response.json({id});
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('users')
            .where('id', id)
            .delete();
        
        return response.status(204).send();
    }
};