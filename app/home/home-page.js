import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./home-page.css";
import {
  checkUserIdentity,
  getFromLocalStorage,
  tokenLabel,
  userInfoLabel,
} from "../utils/token-auth";
import { toastError, toastMessage } from "../utils/toast";

window.addEventListener("load", async () => {
  // 验证用户信息
  await checkUserIdentity();
  // 初始化 modal
  M.Modal.init(document.querySelectorAll(".modal"), {});

  const fetchedInfo = localStorage.getItem(userInfoLabel);
  const parsed = JSON.parse(fetchedInfo);
  const username = parsed.Name;

  const userNameSpan = document.getElementById("username");
  userNameSpan.textContent = username;
});

const submitUserInfoButton = document.getElementById("submit-user-info-button");
submitUserInfoButton.addEventListener("click", async () => {
  const username = document.getElementById("username-input").value;
  if (username === "") {
    toastError("用户名不能为空 !");
    return;
  }
  if (username.length > 20) {
    toastError("用户名不能超过 20 个字符 !");
    return;
  }

  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const formData = new FormData();
  formData.append("name", username);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/cg_info";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: formData,
    });
    const data = await response.json();

    switch (data.code) {
      case 401:
        toastError(data.data.msg);
        break;

      case 400:
        toastError(data.msg);
        break;

      case 200:
        toastMessage(data.msg);
        // 更新信息
        const userNameSpan = document.getElementById("username");
        userNameSpan.textContent = username;
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // 关闭该 modal
  const instance = M.Modal.getInstance(
    document.getElementById("change-user-info-modal")
  );
  instance.close();

  // 清空输入框内容
  document.getElementById("username-input").value = "";
});
