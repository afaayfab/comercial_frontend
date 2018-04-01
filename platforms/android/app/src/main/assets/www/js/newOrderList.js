$( document ).ready(function() {

    $('a[href$="#temp-table-popup"]').attr("id","newOrderButtonId");
    $('#newOrderButtonId').html("Nuevo producto");
    $('#newOrderButtonId').click(function(){
        window.location.href="newOrder.html";
    });
    $('#gobackToIndexId').click(function(){
        window.location.href="main.html";
    });    
});

