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

// Response be like:
// {code: 200, data: {…}, msg: ''}
//   code: 200
//   data:
//     data: Array(10)
//       0:
//         {
//          "ID": "v2-c84",
//          "Cleaned_comments": "专家出来用嘴烧烧",
//          "Option_word": "强大",
//          "Score_": true,
//          "T_room": 18,
//          "S_room": 285,
//          "HotDevice": "",
//          "BurnningT": "",
//          "Device_logo": "",
//          "Hot_T": "",
//          "Time_cyc": "1天",
//          "Money_cyc": 100,
//          "Gas_cyc": -1,
//          "Ele_cyc": -1,
//          "Boal_cyc": -1
//         },
const recordsHeaderNameAlias = {
  // alias for comments
  ID: "评论ID",
  Cleaned_comments: "评论内容",
  Option_word: "观点词",
  Score_: "情感倾向",
  T_room: "室内温度",
  S_room: "房屋面积",
  HotDevice: "取暖设备",
  BurnningT: "燃料类型",
  Device_logo: "设备品牌",
  Hot_T: "热量释放形式",
  Time_cyc: "时间周期",
  Money_cyc: "该时间周期内消耗的费用",
  Gas_cyc: "该时间周期内消耗的天然气(方)",
  Ele_cyc: "该时间间周期内消耗的电(度)",
  Boal_cyc: "该时间周期内消耗的煤(吨)",
  // alias for ranks
  Ip: "地区",
  Pos: "正面情绪占比",
  Neg: "负面情绪占比",
  Num: "该地区评论数量",
};

function appendTable(dataArray) {
  // Get a reference to the table
  let table = document.getElementById(tableID);

  // 插入表头
  let tableHeadRow = table.insertRow();
  for (const columnKey in dataArray[0]) {
    // insert a head cell
    let tableHeadRowTH = document.createElement("th");
    let newText = document.createTextNode(recordsHeaderNameAlias[columnKey]);
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

function disableButton(buttonID) {
  const button = document.getElementById(buttonID);
  button.classList.add("disabled");
}

function enableButton(buttonID) {
  const button = document.getElementById(buttonID);
  button.classList.remove("disabled");
}

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
        redirect("/login/");
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

  disableButton("get-record-button");
  disableButton("get-city-rank-button");

  enableButton("get-previous-record-button");
  enableButton("get-next-record-button");
  enableButton("reset-button");
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

  enableButton("get-record-button");

  disableButton("get-previous-record-button");
  disableButton("get-next-record-button");
  disableButton("reset-button");

  enableButton("get-city-rank-button");
}

export async function onGetCityRankButtonClicked(event) {
  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/location";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: header,
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

  disableButton("get-city-rank-button");
  disableButton("get-record-button");

  enableButton("reset-button");
}

export async function onSearchRecordButtonClicked(event) {
  const comment = document.getElementById("textarea-input").value;
  if (comment.length === 0) {
    toastError("搜索内容不能为空 !");
    return;
  }

  const header = new Headers();
  const token = getFromLocalStorage(tokenLabel);
  header.append("Authorization", "Bearer " + token);

  const formData = new FormData();
  formData.append("comment", comment);

  // http://localhost:8080/api/user/g_record
  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":8080" +
    "/api/user/search_record";

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
        redirect("/login/");
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

  disableButton("get-record-button");
  disableButton("get-city-rank-button");
  disableButton("get-previous-record-button");
  disableButton("get-next-record-button");

  enableButton("reset-button");

  const collapseInstance = M.Collapsible.getInstance(
    document.querySelector(".collapsible")
  );
  collapseInstance.close();
}
