import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./login-page.css";
import { checkEmail } from "../utils/validation";
import {
  checkUserIdentity,
  redirect,
  storeToLocalStorage,
  tokenLabel,
} from "../utils/token-auth";
import { toastMessage, toastError } from "../utils/toast";

window.addEventListener("load", checkUserIdentity);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (checkEmail(email) === false) {
    toastError("邮箱格式错误 !");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    switch (data.code) {
      case 400:
      case 500:
        toastError(data.msg);
        break;

      case 200:
        toastMessage(data.msg);
        storeToLocalStorage(tokenLabel, data.data.token);
        const waitFor1s = () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        await waitFor1s();
        redirect("/home/");
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
