const initializeUser = (User) => {
  User.find()
  .then((users) => {
    if (users.length > 0) {
      throw "No need to make users!";
    }
    return User.create({
      firstName: 'Jeremy',
      password: 'password',
    });
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error(err);
  });
};
module.exports = {
  initializeUser,
};
