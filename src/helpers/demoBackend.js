export const demoBackend = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    let userJson = {
      username: "admin",
      password: "password"
    };
    localStorage.setItem('user', JSON.stringify(userJson));
  }
}