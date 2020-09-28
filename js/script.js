// start
$(document).ready(
  function (){

// chiamata ajax
  $.ajax(
    {
    "url": "http://157.230.17.132:3025/todos",
    "method": "GET",
    "success": function (data, stato) {
      render(data);
    },
    error: function (errore) {
      console.log("E' avvenuto un errore. " + errore);
    }
  });
  // /chiamata ajax

  // chiamata ajax per cancellare
$("#list").on("click", ".delete", function() {

  var element = $(this).parent();
  var id = element.attr("id");

  $.ajax(
    {
    "url": "http://157.230.17.132:3025/todos/"+id,
    "method": "DELETE",
    "success": function (data, stato) {
      element.remove();
    },
    error: function (errore) {
      console.log("E' avvenuto un errore. " + errore);
    }
  });
});
// /chiamata ajax per cancellare

// chiamata ajax per inserire elemento
$('#add_element').keyup(function(){
  if (event.which==13) {
    var val = $("#add_element").val();

    if(val != ""){

      $.ajax(
        {
        "url": "http://157.230.17.132:3025/todos/",
        "method": "POST",
        "data": {
          "text" : val
        },
        "success": function (data, stato) {
          addElemet(data);
        },
        error: function (errore) {
          console.log("E' avvenuto un errore. " + errore);
        }
      });
    }
  }
});

$(".add-todo").click(function(){
  var val = $("#add_element").val();

  if(val != ""){

    $.ajax(
      {
      "url": "http://157.230.17.132:3025/todos/",
      "method": "POST",
      "data": {
        "text" : val
      },
      "success": function (data, stato) {
        addElemet(data);
      },
      error: function (errore) {
        console.log("E' avvenuto un errore. " + errore);
      }
    });
  }
});
// chiamata ajax per inserire elemento

// chiamata ajax per modificare un elemento
$.ajax(
  {
  "url": "http://157.230.17.132:3025/todos/",
  "method": "PATCH",
  "data": {
    "text": text
  },
  "success": function (data, stato) {
    render(data);
  },
  error: function (errore) {
    console.log("E' avvenuto un errore. " + errore);
  }
});
// /chiamata ajax per modificare un elemento

// inserire il tutto nel tamplate
function render(data){
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for(var i = 0; i < data.length; i++){
  var context = {
    "id": data[i].id,
    "text": data[i].text
  }

  var html = template(context);
  $("#list").append(html);
  $("#add_element").val("");
  }
}

function addElemet(data){
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id": data.id,
    "text": data.text
  }

  var html = template(context);
  $("#list").append(html);
  $("#add_element").val("");
}

// /inserire il tutto nel tamplate


});
