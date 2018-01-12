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
  allCriterionArrays.push(criterionArray);
  return criterionArray;
};

function determineTheirClass(inputCriterionArray){
  var rubySum;
  var phpSum;
  var javaSum;
  var cSum;
  var exp=inputCriterionArray[1];
  var platf=inputCriterionArray[2];
  var app=inputCriterionArray[3];
  var size=inputCriterionArray[4];
  var opt=inputCriterionArray[5];

  if(exp<=1){
    rubySum ++;
    phpSum ++;
  }else{
    rubySum ++;
    phpSum ++;
    javaSum ++;
    cSum ++;
  }

  if(platf===1){
    rubySum++;
    phpSum++;
  } else if(platf===2){
    javaSum++;
  } else if(platf===3){
    javaSum++;
    cSum++;
  } else {
    javaSum++;
    cSum++;
  }

  if(app===1){
    rubySum++;
    phpSum++;
  } else if(app===2){
    rubySum++;
  }else {
    javaSum++;
    cSum++;
  }

  if(size===1){
    phpSum ++;
    rubySum ++;
  } else {
    phpSum ++;
    javaSum ++;
    cSum ++;
  }
  if(opt===1){
    rubySum++;
  } else if(opt===2){
    phpSum ++;
  } else if(opt===3){
    javaSum++;
    cSum++;
  } else {
    javaSum+=2;
    cSum +=2;
  }
}



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
