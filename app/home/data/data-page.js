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
  onSearchRecordButtonClicked,
} from "../../actions/get-record";

window.addEventListener("load", async () => {
  await checkUserIdentity();
  // init collapsible
  M.Collapsible.init(document.querySelectorAll(".collapsible"), {});
});

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

const searchRecordButton = document.getElementById("search-record-button");
searchRecordButton.addEventListener("click", onSearchRecordButtonClicked);

// code for dragger (no need)

// let mouseDown = false;
// let startX, scrollLeft;
// const slider = document.getElementById("dragger");
// slider.style.cursor = "grab";

// const startDragging = (event) => {
//   mouseDown = true;
//   slider.style.cursor = "grabbing";
//   startX = event.pageX - slider.offsetLeft;
//   scrollLeft = slider.scrollLeft;
// };

// const stopDragging = (event) => {
//   mouseDown = false;
//   slider.style.cursor = "grab";
// };

// const move = (event) => {
//   event.preventDefault();
//   if (!mouseDown) {
//     return;
//   }
//   const x = event.pageX - slider.offsetLeft;
//   const scroll = x - startX;
//   slider.scrollLeft = scrollLeft - scroll;
// };

// slider.addEventListener("mousemove", move);
// slider.addEventListener("mousedown", startDragging);
// slider.addEventListener("mouseup", stopDragging);
// slider.addEventListener("mouseleave", stopDragging);
