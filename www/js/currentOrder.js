$(document).ready(function() {
  $("#cancelId").click(function() {
    window.location.href = "newOrderList.html";
  });
  $("#jqxLoader").jqxLoader({
    isModal: true,
    width: 100,
    height: 60,
    imagePosition: "top"
  });
  getCurrentOrders();
});

function getCurrentOrders() {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/orders",
    cache: false,
    contentType: "application/json",
    beforeSend: function(xhr) {
      $("#jqxLoader").jqxLoader("open");
      if(config.auth){
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.sessionStorage.getItem('authToken')
        );
      }
    },
    success: function(result) {
      var listOrders = JSON.parse(result);
      $.each(listOrders, function(i, item) {
        $("#pedidosNoTerminados").append(
          '<div id="order_' +
            item.id +
            '" data-transition="flip" class="ui-input-btn ui-btn ui-icon-edit ui-btn-icon-right">' +
            "Pedido: " +
            item.id +
            " - " +
            item.client.name +
            " " +
            " - " +
            item.date +
            '<input type="button" data-enhanced="true" value="Enhanced - Right"></div>'
        );
      });
    },
    complete: function() {
      $('div[id^="order_"]').click(function() {
        window.location.href = "newOrderList.html?id=" + this.id.split("_")[1];
      });
      $("#jqxLoader").jqxLoader("close");
    }
  });
}
