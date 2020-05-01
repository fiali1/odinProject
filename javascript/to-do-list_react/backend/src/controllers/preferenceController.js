const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { user_id } = request.body;

        await connection('preferences').insert({
            user_id
        });

        return response.json({user_id});
    },
    
    async index(request, response) {
        const usersPreferences = await connection('preferences')
            .select('preferences.*');

        return response.json(usersPreferences);
    },

    async details(request, response) {
        const {user_id} = request.params;

        const preferences = await connection('preferences')
            .where('user_id', user_id)
            .select('preferences.*')
            .first();

        return response.json(preferences);
    },

    async edit(request, response) {
        const {user_id} = request.params;
        const {theme, parameter} = request.body;

        await connection('preferences')
            .where('user_id', user_id)
            .update({
                theme,
                parameter
            });

        const preferences = await connection('preferences')
                .where('user_id', user_id)
                .select('preferences.*')
                .first();

        return response.json(preferences);
    }
};