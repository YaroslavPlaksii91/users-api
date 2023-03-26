const { basedir } = global;

const { db, addSchema } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const create = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw createError(400, "missing fields");
  }

  const result = await db.createUser(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = create;
