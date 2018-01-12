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
//Coefficients used to weight every answer in order to determine users recommended class.
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
//Creates an output array 0-3. 0 - Ruby, 1-PHP, 2-Java, 3-C#
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
  allPrefArray.push(outputArray); //Storing this output Array for statistics of all surveys submitted.
  return outputArray;
}
//Takes outputArray from determineClass to output as a String.
function outputPref(inputArray,request){
  var arrLength=inputArray.length;
  var title = "";
  var body ="";
  for(var i=0; i<arrLength; i++){
    if(inputArray[i]==0){
      title+=drawRuby(1) + " ";
      body+=drawRuby(2);
    } else if(inputArray[i]==1){
      title+=drawPHP(1) + " ";
      body+=drawPHP(2);
    } else if(inputArray[i]==2){
      title+=drawJava(1) + " ";
      body+=drawJava(2);
    } else{
      title+=drawC(1) + " ";
      body+=drawC(2);
    }
  }
  if(request==1){
    return title;
  } else if(request==2){
    return body;
  }else{
  }
};

//draw functions exist to pull either header or body content.
function drawRuby(content){
  if(content==1){
    return "Ruby";
  }else if(content==2) {
    return "Ruby is a favorite language of developers building interactive web applications. If an app involves users creating accounts, entering information, and interacting with dynamic content, there's a good chance it is built with Ruby. Ruby became popular because the Rails framework, which is written with Ruby, simplified many of the common tasks associated with building web applications. It's most popular with startups and smaller companies who are looking to build their product quickly.Though each language has its niche, there is plenty of crossover. For example, Rails' popularity inspired copycats in just about every language, and so you'll see interactive web applications written in C#, Java, and PHP, with Rails-like frameworks including .NET MVC, Spring, and Laravel. Even at one company, you might find them using PHP for their marketing site, Ruby for their web application, and Java for their back-end processing.";

  }

}
function drawPHP(content){
  if(content==1){
    return "PHP"
  } else if(content==2) {
    return "PHP is by far the most popular backend language today, with 80 percent of websites utilizing it 'server-side'. It is perhaps best known for it's use in content management systems like Wordpress, Drupal, and Joomla. But the versatility of the language and the frameworks it powers make employment options numerous and diverse. If you're keen to work for a fast paced agency that builds websites for lots of clients, or maintain the security and stability of a huge complex of government websites, or if you like the idea of building out small sites for brands, businesses, and organizations - In any of these cases, PHP would be a great way to go.";
  }

}
function drawJava(content){
  if(content==1){
    return "Java"
  } else if(content==2) {
    return "Java is also a favorite of enterprise companies, but its appeal is broader as well: it's one of the most popular of all programming languages, and it's used in everything from for high-performance processing to building Android user interfaces. Because Java has been very popular for a very long time and is used in so many applications, it is also a very high-demand language. If you're interested in working for an enterprise-level company, as an Android developer, or in high-performance applications, Java could be a good language to learn.";
  }

}
function drawC(content){
  if(content==1){
    return "C#";
  } else if(content==2) {
    return "C# is most popular among bigger established businesses, often for building internal software. Because it's been around for a long time and has the backing of Microsoft, it is one of the most in-demand languages in the job market. C# has also been going through a bit of a rebirth lately, with Microsoft open sourcing the language and surrounding platform, porting it to run on Mac and Linux, and incorporating many of the best features of other languages. If you like the idea of working for a larger company on business software, C# is a great choice.";
  }
}
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
    result=outputPref(determineClass(determineSum(criterionsToArray(name,experience,platformPref,applicationPref,sizePref,optimizationPref,dateToStart))),2);
    alert(result);

  });

});
