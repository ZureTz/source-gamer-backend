import { toastError, toastMessage } from "../utils/toast";
import { getFromLocalStorage, tokenLabel } from "../utils/token-auth";

export async function onSendTextButtonClicked(event) {
  const comment = document.getElementById("textarea-input").value;
  if (comment.length === 0) {
    toastError("消息不能为空 !");
    return;
  }
  console.log(comment);

  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const formData = new FormData();
  formData.append("comment", comment);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/chat/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: formData,
    });
    const data = await response.json();

    switch (data.code) {
      case 400:
        toastError(data.msg);
        break;

      case 401:
        toastError(data.data.msg);
        break;

      case 200:
        toastMessage("记录聊天成功: #" + data.data.id);
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function clearSideNav() {
  const chatRecords = document.querySelectorAll(".single-record");
  // clear previous records
  if (chatRecords.length === 0) {
    return;
  }
  chatRecords.forEach((element) => {
    element.remove();
  });
}

function appendSideNav(dataArray) {
  const chatRecordsRoot = document.getElementById("slide-out");
  console.log(chatRecordsRoot);
  dataArray.forEach((element) => {
    const listElement = document.createElement("li");

    const innerAnchor = document.createElement("a");
    innerAnchor.classList.add("waves-effect", "single-record");
    innerAnchor.setAttribute("href", "#!");
    innerAnchor.appendChild(document.createTextNode(element));

    listElement.appendChild(innerAnchor);
    console.log(listElement);
    chatRecordsRoot.appendChild(listElement);
  });
}

export async function onGetChatRecordButtonClicked(event) {
  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/chat/records";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });
    const data = await response.json();

    switch (data.code) {
      case 400:
        toastError(data.msg);
        break;

      case 401:
        toastError(data.data.msg);
        break;

      case 200:
        toastMessage("成功获取聊天记录");
        console.log(data);
        clearSideNav();
        appendSideNav(data.data.历史);
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  let instance = M.Sidenav.getInstance(document.querySelector(".sidenav"));
  instance.open();
}
