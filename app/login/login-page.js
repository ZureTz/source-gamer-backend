import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./login-page.css";

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

  console.log(username);
  console.log(password);
  M.toast({ html: "Read password !!" });
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", onSubmitButtonClicked,);
