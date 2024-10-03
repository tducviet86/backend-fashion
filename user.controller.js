const { users } = require('./data');

exports.getMe = (req, res) => {
  const { userId } = req;

  let user = users.find(
    item => item.id === userId
  );
  user = {...user};
  user.password = undefined; 
  
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        user,
      }
    });
};
