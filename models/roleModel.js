const pool = require('./db');

const assignRole = async (userId, roleName) => {
    // Get the role id using role name
    const roleQuery = `SELECT id FROM Roles WHERE name = $1`;
    const roleResult = await pool.query(roleQuery, [roleName]);

    if (roleResult.rows.length === 0) {
        throw new Error(`Role '${roleName}' not found`);
    }

    const roleId = roleResult.rows[0].id;

    //Assigning role to a user
    const query = `INSERT INTO UserRoles (user_id, role_id) VALUES ($1, $2)`;
    await pool.query(query, [userId, roleId]);

    return roleName;
};

const getUserRole = async (userId) => {
    const query = `SELECT Roles.name FROM Roles INNER JOIN UserRoles ON Roles.id = UserRoles.role_id WHERE UserRoles.user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0].name;
};

module.exports = {
    assignRole,
    getUserRole,
};
