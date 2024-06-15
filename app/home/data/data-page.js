import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

import "../home-page.css";
import { checkUserIdentity } from "../../utils/token-auth";
import { onLogOutButtonClicked } from "../../actions/logout";
import {
  onGetCityRankButtonClicked,
  onGetNextRecordButtonClicked,
  onGetPreviousRecordButtonClicked,
  onGetRecordButtonClicked,
  onResetButtonClicked,
} from "../../actions/get-record";

window.addEventListener("load", checkUserIdentity);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", onLogOutButtonClicked);

const getRecordButton = document.getElementById("get-record-button");
getRecordButton.addEventListener("click", onGetRecordButtonClicked);

const getPreviousRecordButton = document.getElementById(
  "get-previous-record-button"
);
getPreviousRecordButton.addEventListener(
  "click",
  onGetPreviousRecordButtonClicked
);

const getNextRecordButton = document.getElementById("get-next-record-button");
getNextRecordButton.addEventListener("click", onGetNextRecordButtonClicked);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", onResetButtonClicked);

const getCityRankButton = document.getElementById("get-city-rank-button");
getCityRankButton.addEventListener("click", onGetCityRankButtonClicked);
