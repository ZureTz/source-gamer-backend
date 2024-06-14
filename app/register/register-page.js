import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import { clone } from "lodash";

import "./register-page.css";
import { checkEmail, checkPassword } from "../utils/validation";
import { toastMessage, toastError } from "../utils/toast";
import { checkUserIdentity } from "../utils/token-auth";

window.addEventListener("load", checkUserIdentity);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  if (checkEmail(email) === false) {
    toastError("邮箱格式错误 !");
    return;
  }

  const password = document.getElementById("password").value;
  if (checkPassword(password) === false) {
    toastError("密码格式错误 ! 密码至少为 6 个字符");
    return;
  }

  const captcha = document.getElementById("captcha").value;
  if (captcha === "") {
    toastError("验证码不能为空 !");
    return;
  }

  // 无需检查用户名，因为他是可选的
  const username = document.getElementById("username").value;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", username);
  formData.append("password", password);
  formData.append("code", captcha);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    switch (data.code) {
      case 402:
        toastError(data.data.msg + ": " + data.msg);
        break;

      case 403:
      case 500:
        toastError(data.msg);
        break;

      case 200:
        toastMessage(data.msg);
        const waitFor1s = () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        await waitFor1s();
        redirect("/login/");
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

const sendCaptchaButton = document.getElementById("send-captcha-button");
sendCaptchaButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  if (checkEmail(email) === false) {
    toastError("邮箱格式错误 !");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/get_code";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    switch (data.code) {
      case 402:
        toastError(data.data.msg + ": " + data.msg);
        break;

      case 200:
        toastMessage(data.msg);
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // 减少发送频率，60s后再试
  const originalContent = clone(sendCaptchaButton.textContent);
  sendCaptchaButton.classList.add("disabled");

  const waitGrey = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  for (let countdown = 60; countdown >= 0; countdown--) {
    await waitGrey();
    sendCaptchaButton.textContent = `${countdown}s`;
  }

  sendCaptchaButton.textContent = originalContent;
  sendCaptchaButton.classList.remove("disabled");
});
