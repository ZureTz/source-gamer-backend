import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "./login-page.css";
import { checkUserIdentity } from "../utils/token-auth";
import { onSubmitButtonClicked } from "../actions/login";

window.addEventListener("load", checkUserIdentity);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", onSubmitButtonClicked);
