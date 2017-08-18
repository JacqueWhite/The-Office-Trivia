$(document).ready(function(){
    var showQuestion;
    var count = 0;
    var timeRemaining = 10;
    var intervalId;
    var questionActive = false;
    var right=0;
    var wrong=0;
    var unanswered=0;
    
    
    var fullquestions = [
      {
      question: "Who Owns a Beet Farm?",
      answers: ["Angela", "Dwight", "Andy", "Jim"],
      correctAnswer: 2,
      images: '<img src="images/beets.png">',
      },

      {
      question: "What is Jim's Last Name?",
      answers: ["Hathaway", "Hubert", "Halpert", "Albert"],
      correctAnswer: 3,
      images: '<img src="images/jim.jpg">',
      },
      
      {
      question: "What is Dwight's cousin's name?",
      answers: ["Mose", "Robert", "Bob", "Jose"],
      correctAnswer: 1,
      images: '<img src="images/theworst.gif">',
      },

      {
      question: "Bears, Beets, __________",
      answers: ["Star Trek", "Battlestar Galactica", "Battle Galaxy", "Rattlestar Lactica"],
      correctAnswer: 2,
      images: '<img src="images/jim.jpg">',
      },

      {
      question: "Who was Pam engaged to?",
      answers: ["Toby", "Roy", "Andy", "Jim"],
      correctAnswer: 2 || 4,
      images: '<img src="images/jim.jpg">',
  },

  ];
    
    // When the start button is pressed...
    $("#startButton").click(startQuestion);
//    $("#startOverButton").click(stopQuestion);

    
    function startQuestion(){
        $("#giftarget").hide();
        console.log("STARTED");
        if (questionActive) {
            return
        }
        questionActive = true;
        console.log("DO WE GET HERE?");
        if (count === fullquestions.length){
            endGame();
        }
        else{ 
        displayQuestion();
        intervalId = setInterval(tick, 1000);
        console.log("startQuestion function");
        }
    }

    function displayQuestion(){ 
        var currentQuestion = fullquestions[count];
        $("#question").html(fullquestions[count].question);
        $("#spot1").html(fullquestions[count].answers);
        $("#spot2").html(fullquestions[count].answers);
        $("#spot3").html(fullquestions[count].answers);
        $("#spot4").html(fullquestions[count].answers);
    }

    function tick() {
        timeRemaining--;
        displayTimer();
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            timeRemaining = 10;
            unansweredAnswer();
        }
    }


    function nextQuestion(){
        count++;
        questionActive = false;
        
    }

    function displayTimer() {
        $('#timeRemaining').html("Time Remaining: " + timeRemaining);
    }

     
    
    $(".list-group-item").on("click", function(){
        
        var value = +$(this).attr("value");
        console.log(value);
        clearInterval(intervalId);
        if(value === fullquestions[count].correctAnswer){
            rightAnswer();
        } else if (value !== fullquestions[count].correctAnswer){
            wrongAnswer();
        }
    });
    
    function rightAnswer (){
        $("#question").html("Correct Answer!");
        $("#giftarget").html(fullquestions[count].images); 
        right++;
         $("#giftarget").show();
        clearInterval(intervalId);
        responseScreenTimer();
        console.log("correct");
       }

    function wrongAnswer(){
        $("#question").html("Wrong Answer!");
        $("#giftarget").html(fullquestions[count].images); 
        wrong++;
         $("#giftarget").show();
        clearInterval(intervalId);
        responseScreenTimer();
    }

    function unansweredAnswer(){
        $("#question").html("You ran out of time!");
        $("#giftarget").html(fullquestions[count].images); 
        unanswered++;
         $("#giftarget").show();
        responseScreenTimer();
    }

    function responseScreenTimer(){
        nextQuestion();
        timeRemaining = 10;
        answerTimer = setTimeout(startQuestion, 5000);
        console.log("response screen timer");
    
    }

    function endGame(){
        $("#question").html("Game Over");
        $("#spot1").html(right + " Correct Answers");
        $("#spot2").html(wrong + " Wrong Answers");
        $("#spot3").html(unanswered + " unanswered Questions");
        $("#spot4").html("");
       
    };




});
