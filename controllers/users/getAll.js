const { basedir } = global;

const { db } = require(`${basedir}/services`);

const getAll = async (_, res) => {
  const users = await db.getAllUsers();

  res.json({
    status: "success",
    code: 200,
    data: {
      users,
    },
  });
};

module.exports = getAll;
