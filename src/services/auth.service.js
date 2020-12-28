import axios from "axios";

const apiUrl = "http://localhost:8080/api/auth";


class AuthService {
  login(username, password) {
    return axios
      .post(`${apiUrl}/login`, { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, username, password) {
    return axios.post(`${apiUrl}/register`, {
      name,
      username,
      password,
    });
  }
}

export default new AuthService();