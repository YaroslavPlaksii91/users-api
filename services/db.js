const { Pool } = require("pg");
const config = require("../config");

const pool = new Pool(config.db);

const getAllUsers = async () => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.email, u.role, u.dateCreate, p.id AS profileId, p.firstName, p.lastName, p.state
    FROM users AS u
    INNER JOIN profiles AS p ON u.profileId = p.id`
  );

  return rows;
};

const getUsersByRole = async (role) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.email, u.role, u.dateCreate, p.id AS profileId, p.firstName, p.lastName, p.state
      FROM users AS u
      INNER JOIN profiles AS p ON u.profileId = p.id
      WHERE u.role = $1`,
    [role]
  );

  return rows;
};

const createUser = async ({
  firstName,
  lastName,
  state,
  username,
  email,
  role,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO profiles (firstName, lastName, state)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [firstName, lastName, state]
  );

  await pool.query(
    `INSERT INTO users (username, email, role, profileId) 
      VALUES ($1, $2, $3, $4)`,
    [username, email, role, rows[0].id]
  );

  return {
    firstName,
    lastName,
    state,
    username,
    email,
    role,
    profileId: rows[0].id,
  };
};

const updateUser = async (
  id,
  { username, email, role, firstName, lastName, state }
) => {
  await pool.query(
    `UPDATE profiles
    SET firstName = $1, lastName = $2, state = $3
     WHERE id = (SELECT profileId FROM users WHERE id = $4)`,
    [firstName, lastName, state, id]
  );

  await pool.query(
    `UPDATE users
    SET username = $1, email = $2, role = $3
     WHERE id = $4`,
    [username, email, role, id]
  );

  return {
    firstName,
    lastName,
    state,
    username,
    email,
    role,
  };
};

const removeUser = async (id) => {
  await pool.query(
    `DELETE FROM profiles WHERE id = (SELECT profileId FROM users WHERE id = $1)`,
    [id]
  );

  await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return id;
};

module.exports = {
  getAllUsers,
  getUsersByRole,
  createUser,
  updateUser,
  removeUser,
};
