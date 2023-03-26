const { basedir } = global;

const { db, addSchema } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const update = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing fields");
  }

  const { id } = req.params;

  const result = await db.updateUser(id, req.body);

  if (!result) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = update;
