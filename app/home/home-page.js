import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./home-page.css";
import { checkUserIdentity, userInfoLabel } from "../utils/token-auth";
import { onSubmitUserInfoButtonClicked } from "../actions/cg-info";
import { onLogOutButtonClicked } from "../actions/logout";

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
submitUserInfoButton.addEventListener("click", onSubmitUserInfoButtonClicked);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", onLogOutButtonClicked);
