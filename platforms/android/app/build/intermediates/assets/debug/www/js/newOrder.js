$(document).ready(function() {
  $("#cancelId").click(function() {
    window.location.href = "newOrderList.html";
  });
  $("#jqxLoader").jqxLoader({ isModal: true, width: 100, height: 60, imagePosition: 'top' });
  getPalets();
  getProducto();
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
        $.each(listPalets, function (i, item) {
            $('#filter-producto').append($('<option>', { 
                value: 'pr'+item.id,
                text : item.nombre + '-'+item.variedad.descripcion 
            }));
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
      $('#jqxLoader').jqxLoader('open');
   /*   xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.sessionStorage.getItem('authToken')
      );*/
    },
    success: function(result) {
        var listPalets = JSON.parse(result);
        $.each(listPalets, function (i, item) {
            $('#tipoPalet').append($('<option>', { 
                value: 'p'+item.id,
                text : item.descripcion 
            }));
        });       
    }, complete:function(){
      
      $('#jqxLoader').jqxLoader('close');      
    }
  });
}
