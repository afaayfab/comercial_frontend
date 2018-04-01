$(document).ready(function() {
  $("#cancelId").click(function() {
    var idOrder = _GET["id"];
    window.location.href = "newOrderList.html?id=" + idOrder;
  });
  $("#jqxLoader").jqxLoader({
    isModal: true,
    width: 100,
    height: 60,
    imagePosition: "top"
  });
  getPalets();
  getProducto();
  getCalibre();
  $("#addProductButton").click(function() {
    var idOrder = _GET["id"];
    var res = {
      calibre: $("#filter-calibre")[0].value.split("ca")[1],
      ncajas: parseInt($("#ncajas")[0].value),
      npalet: parseInt($("#npalents")[0].value),
      precio: $("#preciokg")[0].value,
      producto: $("#filter-producto")[0].value.split("pr")[1],
      tipopalet: $("#tipoPalet")[0].value.split("pa")[1],
      orderid: parseInt(idOrder)
    };

    $.ajax({
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(res),
      url: config.endPointUrl + "order/orders",
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
        var idOrder = _GET["id"];
        window.location.href = "newOrderList.html?id=" + idOrder;
      }
    });
  });
});

function getProducto() {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/producto",
    cache: false,
    contentType: "application/json",
    /* beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.sessionStorage.getItem('authToken')
      );
    },*/
    success: function(result) {
      var listPalets = JSON.parse(result);
      $.each(listPalets, function(i, item) {
        $("#filter-producto").append(
          $("<option>", {
            value: "pr" + item.id,
            text: item.nombre + "-" + item.variedad.descripcion
          })
        );
      });
    }
  });
}

function getPalets() {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/palet",
    cache: false,
    contentType: "application/json",
    beforeSend: function(xhr) {
      $("#jqxLoader").jqxLoader("open");
      /*   xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.sessionStorage.getItem('authToken')
      );*/
    },
    success: function(result) {
      var listPalets = JSON.parse(result);
      $.each(listPalets, function(i, item) {
        $("#tipoPalet").append(
          $("<option>", {
            value: "pa" + item.id,
            text: item.descripcion
          })
        );
      });
    },
    complete: function() {
      $("#jqxLoader").jqxLoader("close");
    }
  });
}

function getCalibre() {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/calibre",
    cache: false,
    contentType: "application/json",
    beforeSend: function(xhr) {
      $("#jqxLoader").jqxLoader("open");
      /*   xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.sessionStorage.getItem('authToken')
        );*/
    },
    success: function(result) {
      var listPalets = JSON.parse(result);
      $.each(listPalets, function(i, item) {
        $("#filter-calibre").append(
          $("<option>", {
            value: "ca" + item.id,
            text: item.descripcion
          })
        );
      });
    },
    complete: function() {
      $("#jqxLoader").jqxLoader("close");
    }
  });
}
