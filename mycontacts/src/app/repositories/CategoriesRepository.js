const db = require('../../database');

class CategoriesRepository {
    async findAll() {
        const categories = await db.query("SELECT * FROM categories");

        return categories;
    }

    async create({ name }) {
        const [row] = await db.query(`
            INSERT INTO categories(name)
            VALUES($1)
            RETURNING *
        `, [name]);

        return row;
    }
}

module.exports = new CategoriesRepository();