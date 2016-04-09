const initializeUser = (User) => {
  User.find()
  .then((users) => {
    if (users.length > 0) {
      throw "No need to make users!";
    }
    return User.create({
      firstName: 'Jeremy',
      lastName: 'Castagno',
      password: 'password',
    });
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err1) => {
    console.error(err1);
  });
};
module.exports = {
  initializeUser,
};
