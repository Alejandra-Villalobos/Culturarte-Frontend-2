import axios from "axios";

const baseURL = "https://culturarte-2-production.up.railway.app/auth/googleAuth";

const LoginGoogle = (email) => {
  return new Promise((resolve, reject) => {
    const data = {
        username: email,
      };
      axios
      .post(baseURL, data)
      .then((response) => {
        console.log(response.data.token)
        resolve(response.data.token);
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        reject(error);
      });
  });
};

export { LoginGoogle };