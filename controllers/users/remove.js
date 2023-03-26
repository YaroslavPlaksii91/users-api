const { basedir } = global;

const { db } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await db.removeUser(id);

  if (!result) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 204,
    message: "User deleted",
    data: {},
  });
};

module.exports = remove;
