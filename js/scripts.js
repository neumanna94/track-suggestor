$(document).ready(function(){
  $("form#calculate").submit(function(event) {
    event.preventDefault();
    var num1 = $("#num1").val();
    var result = ""
    result = selectorFunction(num1,operator);
    alert(result);
  });
}
