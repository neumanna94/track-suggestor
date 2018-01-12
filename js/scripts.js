var allCriterionArrays = [];
//Creates a criterionArray and then shoves it into allCriterionArrays.
function criterionsToArray(name, experience, platform, application, size, optimization, startDate){
  var criterionArray = [];
  criterionArray.push(name);
  criterionArray.push(experience);
  criterionArray.push(platform);
  criterionArray.push(application);
  criterionArray.push(size);
  criterionArray.push(optimization);
  criterionArray.push(startDate);
};

// Determines when the next class starts for a particular class.
function nextClassDateComparator(inputDate, classType){

};


$(document).ready(function(){

  $("form#criterion").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var experience = $("input:radio[name=exp]:checked").val();
    var platformPref = $("input:radio[name=platf]:checked").val();
    var applicationPref = $("input:radio[name=app]:checked").val();
    var sizePref = $("input:radio[name=size]:checked").val();
    var optimizationPref = $("input:radio[name=opt]:checked").val();
    var dateToStart = $("#date").val();
    criterionsToArray(name,experience,platformPref,applicationPref,sizePref,optimizationPref,dateToStart);

  });

});
