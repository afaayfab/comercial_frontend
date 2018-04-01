$(document).ready(function() {
  $("#loginButtonId").click(function() {
    var json = new Object();
    json.user = $("#usuarioInput").val();
    json.password = $("#passwordInput").val();
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: config.endPointUrl + "login",
      data: JSON.stringify(json),
      cache: false,
      contentType: "application/json",
      beforeSend: function(xhr) {
        $("#jqxLoader").jqxLoader("open");
        if (config.auth) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + window.sessionStorage.getItem("authToken")
          );
        }
      },
      complete: function(resp) {
        console.log(resp.getAllResponseHeaders());
        $(".ui-input-text").attr("class", "");
        window.sessionStorage.setItem(
          "user",
          $("#usuarioInput").val()
        );
        if (config.auth) {
          window.sessionStorage.setItem(
            "authToken",
            resp.getResponseHeader("authorization").replace("Bearer ", "")
          );
        }
        $("#jqxLoader").jqxLoader("close");
        window.location.href = "main.html";
      }
    });
  });
});
