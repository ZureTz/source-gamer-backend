import { toastError } from "./toast";

export function redirect(relativeLocataion) {
  const currentURL = window.location.origin;
  location.assign(currentURL + relativeLocataion);
}

function storageAvailable(type) {
  try {
    let storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

const available = storageAvailable("localStorage");

export function storeToLocalStorage(label, value) {
  if (available === false) {
    toastError("localStorage 不可用");
    return;
  }

  localStorage.setItem(label, value);
}

export function getFromLocalStorage(label) {
  if (available === false) {
    toastError("localStorage 不可用");
    return;
  }

  return localStorage.getItem(label);
}

export function removeFromLocalStorage(label) {
  if (available === false) {
    toastError("localStorage 不可用");
    return;
  }

  return localStorage.removeItem(label);
}

export const tokenLabel = "bearerToken";
export const userInfoLabel = "userInfo";

export async function checkUserIdentity() {
  const token = getFromLocalStorage(tokenLabel);
  const pathname = window.location.pathname;
  // localStorage 不可用
  if (token === false) {
    return;
  }
  // local Storage 内没有 token
  if (token === null) {
    // 如果为注册或者登录页面，不进行多余操作
    if (pathname.includes("/register") || pathname.includes("/login")) {
      return;
    }
    // 默认返回登录页面
    redirect("/login/");
    return;
  }

  // 有 token，向服务器 GET
  const header = new Headers();
  header.append("Authorization", "Bearer " + token);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/info";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });
    const data = await response.json();

    switch (data.code) {
      case 401:
        // token 已经过期 或者 token 无效
        // 删除 token
        removeFromLocalStorage(tokenLabel);
        // 返回登录页面
        if (pathname.includes("/register") || pathname.includes("/login")) {
          return;
        }
        redirect("/login/");
        break;
      case 200:
        // token 有效
        // 储存信息并跳转
        storeToLocalStorage(userInfoLabel, JSON.stringify(data.data.user));
        // 如果当前 pathname 包含 home，不继续操作
        if (pathname.includes("/home")) {
          break;
        }
        // 否则， 跳转到 home
        redirect("/home/");
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
