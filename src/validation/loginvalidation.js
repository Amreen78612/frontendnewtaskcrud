const ValidationLogin = (users) => {
  let error = {};
  if (!users.email) {
    error.email = "Email is requier";
  } else if (!/^\S+@\S+\.\S+$/.test(users.email)) {
    error.email = "Email is invalid";
  }
  if (!users.password) {
    error.password = "Password is requier";
  }

  return error;
};
export default ValidationLogin;
