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
    phpSum+=2;
  } else if(platf==2){
    javaSum+=2;
  } else {
    cSum++;
  }

  if(app==1){
    rubySum++;
    cSum-=2;
    javaSum--;
    phpSum++;
  } else if(app==2){
    rubySum+=3;
  }else {
    javaSum+=2;
    cSum+=2;
  }

  if(size===1){
    rubySum +=2;
    cSum --;
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
function determineClass(inputArrayOfSums){
  inputArray = copyArray(inputArrayOfSums);
  inputArrayOfSums.sort(function(a,b){return a-b}); //Don't know how to make a mappings yet.
  var highestPref=inputArrayOfSums[3];
  var secondHighestPref=inputArrayOfSums[2];
  var outputArray = [];
  console.log(inputArray);
  if(inputArray[0]===highestPref){
    outputArray.push(0); //Recommend Ruby
    if(highestPref==secondHighestPref){
    outputArray.push(determineSecondHighestPref(inputArray,highestPref,secondHighestPref,0));
    }
  } else if(inputArray[1]===highestPref){
    outputArray.push(1); //Recommend Php
    if(highestPref==secondHighestPref){
    outputArray.push(determineSecondHighestPref(inputArray,highestPref,secondHighestPref,1));
    }
  } else if(inputArray[2]===highestPref){
    outputArray.push(2); //Recommend Java
    if(highestPref==secondHighestPref){
    outputArray.push(determineSecondHighestPref(inputArray,highestPref,secondHighestPref,2));
    }
  } else if(inputArray[3]===highestPref) {
    outputArray.push(3); //Recommend C#
    if(highestPref==secondHighestPref){
    console.log(determineSecondHighestPref(inputArray,highestPref,secondHighestPref,3));
    outputArray.push(determineSecondHighestPref(inputArray,highestPref,secondHighestPref,3));
    }
  } else {
  }
  return outputArray;
}
function outputPref(inputArray){
  var arrLength=inputArray.length;
  console.log(inputArray);
  var returnString = ""
  for(var i=0; i<arrLength; i++){
    if(inputArray[i]==0){
      returnString += "Ruby ";
    } else if(inputArray[i]==1) {
      returnString += "PHP ";
    } else if(inputArray[i]==2){
      returnString += "Java ";
    } else {
      returnString += "C# ";
    }
  }
    return returnString;
};
// Determines when the next class starts for a particular class.
function nextClassDateComparator(inputDate, classType){

};
//Function used to determine if second highest preference is same value as highest.
//Uses to for loops to not include the highest value while keeping indexing the same.
function determineSecondHighestPref(inputArray,highestPref,secondHighestPref,locationOfHighest){
  var arrLength=inputArray.length;
  if(highestPref==secondHighestPref){
    for(var i=0; i<locationOfHighest; i++){
      if(inputArray[i]==secondHighestPref){
        return i;
      }
    }
    for(var i=locationOfHighest+1; i<arrLength; i++){
      if(inputArray[i]==secondHighestPref){
        return i;
      }
    }
  }
}
//Exists to copy an array instead of referencing it.
function copyArray(inputArray){
  var result = []
  var length = inputArray.length;
  for(var i=0;i<length;i++){
    result.push(inputArray[i]);
  }
  return result;
}


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
    result=outputPref(determineClass(determineSum(criterionsToArray(name,experience,platformPref,applicationPref,sizePref,optimizationPref,dateToStart))));
    alert(result);

  });

});
