import { toastMessage } from "../utils/toast";
import {
  redirect,
  removeFromLocalStorage,
  tokenLabel,
  userInfoLabel,
} from "../utils/token-auth";

export async function onLogOutButtonClicked(event) {
  removeFromLocalStorage(tokenLabel);
  removeFromLocalStorage(userInfoLabel);

  toastMessage("您已成功登出");
  const waitFor1s = () => new Promise((resolve) => setTimeout(resolve, 1000));
  await waitFor1s();
  redirect("/login/");
}
