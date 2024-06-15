import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "../home-page.css"
import { checkUserIdentity } from "../../utils/token-auth";
import { onLogOutButtonClicked } from "../../actions/logout";

window.addEventListener("load", checkUserIdentity);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", onLogOutButtonClicked);
