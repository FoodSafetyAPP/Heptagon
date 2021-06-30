export const userLogin = (username, password) => {
  let user = JSON.parse(localStorage.getItem('user'));
  return new Promise((resolve, reject) => {
    if (user !== null && username === user.username && password === user.password) {
      resolve("Logged in Successfully !");
    } else {
      reject('Username or password is incorrect !');
    }
  });
}

export const userLogout = () => {
  localStorage.removeItem('user');
}