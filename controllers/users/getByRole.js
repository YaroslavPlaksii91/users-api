const { basedir } = global;

const { db } = require(`${basedir}/services`);

const getByRole = async (req, res) => {
  const { role } = req.params;

  const users = await db.getUsersByRole(role);

  res.json({
    status: "success",
    code: 200,
    data: {
      users,
    },
  });
};

module.exports = getByRole;
