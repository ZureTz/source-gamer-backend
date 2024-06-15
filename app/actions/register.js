import { clone } from "lodash";

import { checkEmail, checkPassword, checkUsername } from "../utils/validation";
import { toastMessage, toastError } from "../utils/toast";
import { redirect } from "../utils/token-auth";

export async function onSendCaptchaButtonClicked(event) {
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
  const button = document.getElementById("send-captcha-button");
  const originalContent = clone(button.textContent);
  button.classList.add("disabled");

  const waitFor1s = () => new Promise((resolve) => setTimeout(resolve, 1000));
  for (let countdown = 60; countdown >= 0; countdown--) {
    button.textContent = `${countdown}s`;
    await waitFor1s();
  }

  button.textContent = originalContent;
  button.classList.remove("disabled");
}

export async function onSubmitButtonClicked(event) {
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

  const repeatPassword = document.getElementById("repeat-password").value;
  if (repeatPassword !== password) {
    toastError("两次密码输入不一致 !");
    return;
  }

  const captcha = document.getElementById("captcha").value;
  if (captcha === "") {
    toastError("验证码不能为空 !");
    return;
  }

  // 无需严格检查用户名，因为他是可选的
  const username = document.getElementById("username").value;
  // 如果输入则检查
  if (username.length > 0 && checkUsername(username) === false) {
    toastError("用户名为 3-20 个字符, 不能含有空格 !");
    return;
  }

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
          new Promise((resolve) => setTimeout(resolve, 1000));
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
}
