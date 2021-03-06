const alert = $("#alert");
$(alert).hide();

function isEmpty(element) {
  if (element.value === "") return true;
  return false;
}

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

$(function () {
  $("#signupForm").submit(function (e) {
    e.preventDefault();
    let body = {};
    for (const input of this.elements) {
      const name = $(input).attr("name");
      if (name === "btn") {
        continue;
      }
      if (isEmpty(input) && name !== "gender") {
        return showError(`${name} is required.`);
      }
      const value = input.value;
      body[name] = value;
    }
    $.ajax({
      type: "POST",
      url: "/auth/signup",
      data: JSON.stringify(body),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        showMessage(response.message, true, function () {
          window.location.href = "/login";
        });
      },
      error: function (xhr, status, err) {
        const json = JSON.parse(xhr.responseText);
        showMessage(json.errors[0].message, false);
      },
    });
  });
});
