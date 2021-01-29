import aes from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import axios from "axios";
import { LocalStorage } from "quasar";

const key_cjda = "f0b8d9b6-1daf-429f-a1fc-ebfd8ae02979";

const urlProd = process.env.BACKEND_URL + "/api/v1/auth/login";
const urlProdSocial = process.env.BACKEND_URL + "/api/v1/social";
const urlRegister = process.env.BACKEND_URL + "/api/v1/user";
const urlRegisterProvider = process.env.BACKEND_URL + "/api/v1/user/provider";
const urlRecoveryPassword =
  process.env.BACKEND_URL + "/api/v1/auth/account/recovery";
const urlNewPasswordWithCode =
  process.env.BACKEND_URL + "/api/v1/auth/code/change";

export const authProvider = {
  login(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataLogin = { email: email, password: password };
        let response = await axios.post(urlProd, dataLogin);
        console.log("login ver token ", response.data);
        let ciphertext = aes
          .encrypt(JSON.stringify(response.data), key_cjda)
          .toString();
        LocalStorage.set("auth_0", ciphertext);
        resolve(ciphertext);
      } catch (error) {
        reject(error.response.data);
      }
    });
  },

  registerSocial(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(urlProdSocial, data);
        let ciphertext = aes
          .encrypt(JSON.stringify(response.data), key_cjda)
          .toString();
        LocalStorage.set("auth_0", ciphertext);
        resolve(ciphertext);
      } catch (error) {
        reject(error.response.data);
      }
    });
  },
  registerUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(urlRegister, data);
        let ciphertext = aes
          .encrypt(JSON.stringify(response.data), key_cjda)
          .toString();
        LocalStorage.set("auth_0", ciphertext);
        resolve(ciphertext);
      } catch (error) {
        reject(error.response.data);
      }
    });
  },
  registerProvider(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(urlRegisterProvider, data);
        let ciphertext = aes
          .encrypt(JSON.stringify(response.data), key_cjda)
          .toString();
        LocalStorage.set("auth_0", ciphertext);
        resolve(ciphertext);
      } catch (error) {
        reject(error.response.data);
      }
    });
  },

  recoveryPassword(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(urlRecoveryPassword, body);
        resolve(response.data);
      } catch (e) {
        reject(e.response.data);
      }
    });
  },

  newPasswordWithCode(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.patch(urlNewPasswordWithCode, body);
        resolve(response.data);
      } catch (e) {
        reject(e.response.data);
      }
    });
  },

  logout() {
    LocalStorage.remove("auth_0");
    LocalStorage.remove("profileData");
  },

  getUserOnly() {
    let localdata = LocalStorage.getItem("auth_0");
    let response = null;
    if (localdata) {
      let bytes = aes.decrypt(localdata, key_cjda);
      let originaldata = bytes.toString(enc);
      response = JSON.parse(originaldata);
    }
    console.log("get user only data", response);
    return response;
  }
};
