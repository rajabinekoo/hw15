const info = $("#info");
const loading = $("#loading");
const title = $("#title");
const alert = $("#alert");
$(alert).hide();
let user = null;

function changeAlertState(success) {
  if (success) {
    $(alert).removeClass("alert-danger");
    $(alert).addClass("alert-success");
  } else {
    $(alert).addClass("alert-danger");
    $(alert).removeClass("alert-success");
  }
}

function showMessage(msg, success = false, final = function () {
}) {
  changeAlertState(success);
  $(alert).fadeIn(0);
  $(alert).text(msg);
  setTimeout(function () {
    $(alert).fadeOut(0);
    final();
  }, 3000);
}

function setLading(isLoading = true) {
  if (isLoading) {
    $(title).text("Loading...");
    $(loading).removeClass("d-none");
    $(info).addClass("d-none");
  } else {
    $(title).text("User info");
    $(loading).addClass("d-none");
    $(info).removeClass("d-none");
  }
}

function errorHandler(err) {
  console.log(err.status);
  if (err.status === 401) {
    return showMessage("Unauthorized.", false, function () {
      window.location.href = "/login";
    });
  }
  const json = JSON.parse(err.responseText);
  showMessage(json.errors[0].message, false);
}

function deleteAccount() {
  const userKey = localStorage.getItem("userKey");
  const settings = {
    "url": "/deleteAccount",
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      "Authorization": userKey
    },
  };

  $.ajax(settings).done(function (response) {
    showMessage(response.message, true, function () {
      window.location.href = "/signup";
    })
  }).catch(errorHandler);
}

function updateUserInfo() {
  console.log(2)
}

function showUserInfo(editmode = false) {
  let html = '';
  const labelFormatter = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
  const input = (key, value, isDisable) => `<div class="mb-3">
    <label class="form-label">${labelFormatter(key)}</label>
    <input
      type="text"
      class="form-control"
      placeholder="${key}"
      name="${key}"
      value="${value}"
      ${isDisable ? "disabled" : ""}
    />
  </div>`;
  for (const key in user) {
    const value = user[key];
    if (key !== "_id") html += input(key, value, !editmode);
  }
  html += editmode ?
    `<div class="d-flex justify-content-between flex-wrap">
      <button name="btn" type="button" onclick="deleteAccount()" class="btn btn-danger">Delete Account</button>
      <button name="btn" type="button" onclick="updateUserInfo()" class="btn btn-info">Update Info</button>
    </div>` :
    `<button name="btn" type="button" onclick="showUserInfo(true)" class="btn btn-warning w-100">Edit</button>`;
  $(info).html(html);
}

function init() {
  setLading(true);

  const userKey = localStorage.getItem("userKey");
  const settings = {
    "url": "/userinfo",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": userKey
    },
  };

  $.ajax(settings).done(function (response) {
    user = response;
    setLading(false);
    showUserInfo();
  }).catch(errorHandler);
}

init();