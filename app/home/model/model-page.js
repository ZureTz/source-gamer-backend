import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "../home-page.css";
import { checkUserIdentity } from "../../utils/token-auth";
import { onLogOutButtonClicked } from "../../actions/logout";
import {
  onGetChatRecordButtonClicked,
  onSendTextButtonClicked,
} from "../../actions/chat";

window.addEventListener("load", async () => {
  await checkUserIdentity();
  // colapsible and sidenav init
  M.Collapsible.init(document.querySelectorAll(".collapsible"), {});
  M.Sidenav.init(document.querySelectorAll(".sidenav"), {});
});

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", onLogOutButtonClicked);

const sendTextButton = document.getElementById("send-text-button");
sendTextButton.addEventListener("click", onSendTextButtonClicked);

const getChatRecordButton = document.getElementById("get-chat-record-button");
getChatRecordButton.addEventListener("click", onGetChatRecordButtonClicked);
