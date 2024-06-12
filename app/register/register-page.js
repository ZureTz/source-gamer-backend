import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./register-page.css";

function onSubmitButtonClicked() {
  const username = document.getElementById("username").value;
  if (username === "") {
    M.toast({
      html:
        '<span class="red-text text-darken-2">' +
        "  <strong>用户名不能为空 !</strong>" +
        "</span>",
    });
    return;
  }

  const email = document.getElementById("email").value;
  if (email === "") {
    M.toast({
      html:
        '<span class="red-text text-darken-2">' +
        "  <strong>邮箱不能为空 !</strong>" +
        "</span>",
    });
    return;
  }

  const password = document.getElementById("password").value;
  if (password === "") {
    M.toast({
      html:
        '<span class="red-text text-darken-2">' +
        "  <strong>密码不能为空 !</strong>" +
        "</span>",
    });
    return;
  }

  const captcha = document.getElementById("captcha").value;
  if (captcha === "") {
    M.toast({
      html:
        '<span class="red-text text-darken-2">' +
        "  <strong>验证码不能为空 !</strong>" +
        "</span>",
    });
    return;
  }

  console.log(username);
  console.log(email);
  console.log(password);
  console.log(captcha);
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", onSubmitButtonClicked);
