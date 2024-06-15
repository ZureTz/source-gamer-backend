import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./register-page.css";
import { checkUserIdentity } from "../utils/token-auth";
import {
  onSendCaptchaButtonClicked,
  onSubmitButtonClicked,
} from "../actions/register";

window.addEventListener("load", checkUserIdentity);

const sendCaptchaButton = document.getElementById("send-captcha-button");
sendCaptchaButton.addEventListener("click", onSendCaptchaButtonClicked);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", onSubmitButtonClicked);

