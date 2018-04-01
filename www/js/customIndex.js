$(document).ready(function() {
  $("#newOrderId").click(function() {
    checkOrders();
  });


});


function checkOrders() {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/existOrders",
    cache: false,
    contentType: "application/json",
    beforeSend: function(xhr) {
      if (config.auth) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.sessionStorage.getItem("authToken")
        );
      }
    },
    success: function(result) {
      var objJson = JSON.parse(result);
      if (objJson.size > 0) {
        window.location.href = "currentOrders.html";
      } else {
        window.location.href = "newOrderList.html";
      }
    }
  });
}
