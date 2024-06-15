import { toastError, toastMessage } from "../utils/toast";
import { getFromLocalStorage, tokenLabel } from "../utils/token-auth";

const tableID = "record-table";
let tableCounter = 0;

// clear previous table
function removeTable() {
  const previousTableRows = document.querySelectorAll(`#${tableID} tr`);
  if (previousTableRows.length == 0) {
    return;
  }

  previousTableRows.forEach((element) => {
    element.remove();
  });
}

function appendTable(dataArray) {
  // Get a reference to the table
  let table = document.getElementById(tableID);

  // 插入表头
  let tableHeadRow = table.insertRow();
  for (const columnKey in dataArray[0]) {
    // insert a head cell
    let tableHeadRowTH = document.createElement("th");
    let newText = document.createTextNode(columnKey.toString());
    // Append a text node to the cell
    tableHeadRowTH.appendChild(newText);
    // Append to the head
    tableHeadRow.appendChild(tableHeadRowTH);
  }

  // 打印表
  dataArray.forEach((row) => {
    // Insert a row at the end of the table
    const newRow = table.insertRow();
    // get values in the row
    for (const columnKey in row) {
      // check if value === -1
      const value = row[columnKey] === -1 ? "" : row[columnKey];
      // Insert a cell at the end of the row
      const newCell = newRow.insertCell();
      // Append a text node to the cell
      const newText = document.createTextNode(value.toString());
      newCell.appendChild(newText);
    }
  });
}

// Response be like:
// {code: 200, data: {…}, msg: ''}
//   code: 200
//   data:
//     data: Array(10)
//       0:
//         Boal_cyc: -1
//         BurnningT: "天然气"
//         Cleaned_comments: "哎，都是砖家研判、论证过的。现在没气啦，砖家不发声啦"
//         Device_logo: ""
//         Ele_cyc: -1
//         Gas_cyc: 3000
//         Hot_T: ""
//         ID: ""
//         Money_cyc: -1
//         Option_word: "找不到"
//         S_room: 130
//         Score_: false
//         T_room: 25
//         Time_cyc: "地暖"

async function getAndApplyRecords() {
  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const formData = new FormData();
  formData.append("begin", tableCounter.toString());

  // http://localhost:8080/api/user/g_record
  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/g_record";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: formData,
    });
    const data = await response.json();
    switch (data.code) {
      case 400:
        toastError(data.msg);
        break;
      case 401:
        toastError(data.data.msg);
        redirect("login");
        break;
      case 200:
        toastMessage("成功获取记录");
        removeTable();
        appendTable(data.data.data);
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function onGetRecordButtonClicked(event) {
  await getAndApplyRecords();
  tableCounter += 10;

  const getRecordButton = document.getElementById("get-record-button");
  getRecordButton.classList.add("disabled");

  const getCityRankButton = document.getElementById("get-city-rank-button");
  getCityRankButton.classList.add("disabled");

  const getPreviousRecordButton = document.getElementById(
    "get-previous-record-button"
  );
  getPreviousRecordButton.classList.remove("disabled");

  const getNextRecordButton = document.getElementById("get-next-record-button");
  getNextRecordButton.classList.remove("disabled");

  const resetButton = document.getElementById("reset-button");
  resetButton.classList.remove("disabled");
}

export async function onGetPreviousRecordButtonClicked(event) {
  if (tableCounter === 10) {
    toastMessage("已经是第一页");
    return;
  }
  await getAndApplyRecords();
  tableCounter -= 10;
}

export async function onGetNextRecordButtonClicked(event) {
  await getAndApplyRecords();
  tableCounter += 10;
}

export function onResetButtonClicked(event) {
  // reset counter and table
  tableCounter = 0;
  removeTable();

  const getRecordButton = document.getElementById("get-record-button");
  getRecordButton.classList.remove("disabled");

  const getPreviousRecordButton = document.getElementById(
    "get-previous-record-button"
  );
  getPreviousRecordButton.classList.add("disabled");

  const getNextRecordButton = document.getElementById("get-next-record-button");
  getNextRecordButton.classList.add("disabled");

  const resetButton = document.getElementById("reset-button");
  resetButton.classList.add("disabled");

  const getCityRankButton = document.getElementById("get-city-rank-button");
  getCityRankButton.classList.remove("disabled");
}

export async function onGetCityRankButtonClicked(event) {
  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/location";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    switch (data.code) {
      case 200:
        toastMessage("成功获取记录");
        removeTable();
        appendTable(data.data.locations);
        break;

      default:
        // code 无效
        throw new Error("Undefined response code");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  const getCityRankButton = document.getElementById("get-city-rank-button");
  getCityRankButton.classList.add("disabled");

  const getRecordButton = document.getElementById("get-record-button");
  getRecordButton.classList.add("disabled");

  const resetButton = document.getElementById("reset-button");
  resetButton.classList.remove("disabled");
}
