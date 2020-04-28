const connection = require('../database/connection');


module.exports = {
    async create(request, response) {
        const {username, password} = request.body;
        const user = await connection('users')
            .where('username', username)
            .select('id', 'username', 'password')
            .first();

        if (!user) 
            return response.status(400).json({ error: "No user found" });

        if (password != user.password) 
            return response.status(401).json({ error: "Wrong password" });

        return response.json(user);       
    }
};