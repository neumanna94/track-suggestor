var allCriterionArrays = [];
var allPrefArray = [];
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
  allCriterionArrays.push(criterionArray); //Will be used to see all surveys ever submitted.
  return criterionArray;
};

function determineSum(inputCriterionArray){
  var rubySum=0;
  var phpSum=0;
  var javaSum=0;
  var cSum=0;
  var exp=inputCriterionArray[1];
  var platf=inputCriterionArray[2];
  var app=inputCriterionArray[3];
  var size=inputCriterionArray[4];
  var opt=inputCriterionArray[5];
  var outputMatrix=[];

  if(exp==1){
    rubySum ++;
    phpSum ++;
  }else if(exp==4){
    cSum += 2;
    javaSum +=2;
  } else {
    rubySum ++;
    phpSum ++;
    javaSum ++;
    cSum ++;
  }

  if(platf==1){
    rubySum++;
    phpSum++;
  } else if(platf==2){
    javaSum++;
  } else {
    cSum++;
  }

  if(app==1){
    rubySum++;
    phpSum++;
  } else if(app==2){
    rubySum++;
  }else {
    javaSum++;
    cSum++;
  }

  if(size===1){
    rubySum +=2;
  } else {
    phpSum ++;
    javaSum ++;
    cSum ++;
  }
  if(opt==1){
    rubySum+=3;
    cSum --;
    javaSum--;
  } else if(opt==2){
    phpSum ++;
  } else if(opt==3){
    javaSum++;
    cSum++;
  } else {
    javaSum+=2;
    cSum ++;
  }
  outputMatrix.push(rubySum);
  outputMatrix.push(phpSum);
  outputMatrix.push(javaSum);
  outputMatrix.push(cSum);
  allPrefArray.push(outputMatrix); //Will use for statistics later on.
  return outputMatrix;
}

function insertSort(inputArrayOfSums){
  var arrLength = inputArrayOfSums.length;
  var i, k;

  for(var i=1; i <arrLength; i++){
    currIVal=inputArrayOfSums[i];
    k=i-1;
    while(k>=0&&inputArrayOfSums[k]>currIVal){
      inputArrayOfSums[k+1]=inputArrayOfSums[k];
      k=k-1;
    }
    inputArrayOfSums[k+1]=currIVal;
  }
  return inputArrayOfSums;
}

function determineClass(inputArrayOfSums){
  sortedInputArrayOfSums = insertSort(inputArrayOfSums); //Don't know how to make a mappings yet.
  var highestPref=sortedInputArrayOfSums[3];
  var secondHighestPref=sortedInputArrayOfSums[2];
  var secondLeastPref=sortedInputArrayOfSums[1];
  var leastPref=sortedInputArrayOfSums[0];
  console.log("I'm in determineClass");

  if(inputArrayOfSums[0]===highestPref){
    return 0;
  } else if(inputArrayOfSums[1]===highestPref){
    return 1;
  } else if(inputArrayOfSums[2]===highestPref){
    return 2;
  } else {
    return 3;
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
    alert(determineClass(determineSum(criterionsToArray(name,experience,platformPref,applicationPref,sizePref,optimizationPref,dateToStart))));

  });

});
