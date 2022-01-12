const alert = $("#alert");
$(alert).hide();

function isEmpty(element) {
  if (element.value === "") return true;
  return false;
}

function showError(msg) {
  $(alert).fadeIn("d-none");
  $(alert).text(msg);
  setTimeout(function () {
    $(alert).fadeOut();
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
      url: "/users",
      data: JSON.stringify(body),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, err) {
        var json = JSON.parse(xhr.responseText);
        showError(json.errors[0].message);
      },
    });
  });
});
