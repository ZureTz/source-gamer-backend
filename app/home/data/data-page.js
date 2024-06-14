import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "../home-page.css"
import { checkUserIdentity } from "../../utils/token-auth";

window.addEventListener("load", checkUserIdentity);