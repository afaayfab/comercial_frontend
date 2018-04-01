$(document).ready(function() {
  
  var idOrder = _GET["id"];
  var user = window.sessionStorage.getItem("user");
  $('a[href$="#temp-table-popup"]').attr("id", "newOrderButtonId");
  $("#newOrderButtonId").html("Nuevo producto");
  $("#newOrderButtonId").click(function() {
    window.location.href = "newOrder.html?id=" + idOrder;
  });
  $("#gobackToIndexId").click(function() {
    window.location.href = "main.html";
  });

  if (idOrder != undefined) {
    paintIdOrder(idOrder);
    getClientsBySeller(user);
  } else {
    createNewIdOrder();
  }
});

function getClientsBySeller(user) {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "client/client/seller/" + user,
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
      var listPalets = JSON.parse(result);
      $.each(listPalets, function(i, item) {
        $("#filter-cliente").append(
          $("<option>", {
            value: "cl" + item.id,
            text: item.name
          })
        );
      });
    }
  });
}

function paintIdOrder(idOrder) {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: config.endPointUrl + "order/orders/" + idOrder + "/items",
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
    success: function(result) {
      removeDeleteEvent();
      $("#newOrderListId").empty();
      var listItems = JSON.parse(result);
      $.each(listItems, function(i, item) {
        var itemPart1 =
          '<tr><td><div data-theme="a" class="newOrderListEditButtons">';
        var itemPart2 =
          '<a id="edit' +
          item.id +
          '" href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-notext ui-btn-inline">Editar</a>';
        var itemPart3 =
          '<a id="delete' +
          item.id +
          '" href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-inline">Eliminar</a>';
        var itemPart4 =
          '</div></td><td><div class="newOrderListEditButtons">' +
          item.producto.nombre +
          '</div></td><td><div class="newOrderListEditButtons">' +
          item.precio +
          "</div></td></tr>";
        $("#newOrderListId").append(
          itemPart1 + itemPart2 + itemPart3 + itemPart4
        );
      });
    },
    complete: function() {
      $("#jqxLoader").jqxLoader("close");
      addDeleteEvent();
    }
  });
}

function addDeleteEvent() {
  $("a[id^='delete']").click(function() {
    $.ajax({
      type: "POST",
      crossDomain: true,
      url:
        config.endPointUrl +
        "order/orders/item/delete/" +
        this.id.split("delete")[1],
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
      success: function(result) {
        var response = JSON.parse(result);
        if (response.statusCode == 200) {
          console.log("TOdo OK, sacar notificación");
          var idOrder = _GET["id"];
          paintIdOrder(idOrder);
        } else {
          console.log("Error:" + response.statusDescription);
        }
      },
      complete: function() {
        $("#jqxLoader").jqxLoader("close");
        addDeleteEvent();
      }
    });
  });
}

function removeDeleteEvent() {
  $("a[id^='delete']").off();
}
function createNewIdOrder() {}
