

var fullQuestion = [

  {
  question: "Who Owns a Beet Farm?",
  answer: ["Angela", "Dwight", "Andy", "Jim"],
  correctAnswer: 2,
  images: '<img src="images/beets.png">',
  },

  {
  question: "What is Jim's Last Name?",
  answer: ["Hathaway", "Hubert", "Halpert", "Albert"],
  correctAnswer: "answer2",
  images: '<img src="images/jim.jpg">',
  },
  
  {
  question: "What is Dwight's cousin's name?",
  answer: ["Mose", "Robert", "Bob", "Jose"],
  correctAnswer: "answer3",
  images: '<img src="images/theworst.gif">',
  },

  {
  question: "Bears, Beets, __________",
  answer: ["Star Trek", "Battlestar Galactica", "Battle Galaxy", "Rattlestar Lactica"],
  correctAnswer: "answer4",
  images: '<img src="images/jim.jpg">',
  },

  {
  question: "Who was Pam engaged to?",
  answer: ["Toby", "Roy", "Andy", "Jim"],
  correctAnswer: "answer5",
  images: '<img src="images/jim.jpg">',
  },

  ];

// Variable showTimer will hold the setInterval when we start the timer
var showTimer;

// Variable showQuestion will hold the setInterval when we start the trivia game
var showQuestion;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

// TODO: Use jQuery to run "startTrivia" when we click the "start" button.
$("#start").click(startTrivia);

// TODO: Use jQuery to run "stopTrivia" when we click the "stop" button.
$("#stop").click(stopTrivia);


// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayQuestion() {
  $("#question-holder").html(fullQuestion[count].question);
  $("#answer1").html(fullQuestion[count].answer[0]);
  $("#answer2").html(fullQuestion[count].answer[1]);
  $("#answer3").html(fullQuestion[count].answer[2]);
  $("#answer4").html(fullQuestion[count].answer[3]);
}

function nextQuestion() {

  //  TODO: Increment the count by 1.
  count++;

  // TODO: Show the loading gif in the "image-holder" div.
  $("#question-holder").html("");

  // wait 2 sec, then display question
  setTimeout(displayQuestion, 2000);

  // TODO: If the count is the same as the length of the image array, reset the count to 0.
  if (count === fullQuestion.length) {
    count = 0;
  }
}

function startTrivia() {

  // every 2 sec, show nextQ
  showQuestion = setInterval(countdown(), tick);


}

function countdown() {
    var seconds = 10;

    tick = setInterval(function(){

      $("#timer").html(seconds);
//this means seconds = seconds - 1
      seconds--
    }, 1000);


    if (seconds == 0) {
      seconds = 10;
      clearInterval(intervalId);
    };
   
};




function stopTrivia() {

  // TODO: Put our clearInterval here:
  clearInterval(showQuestion);

}


// function checkAnswers() {
//   var userInput = 
//   console.log();
// }

// This will run the display image function as soon as the page loads.
displayQuestion();