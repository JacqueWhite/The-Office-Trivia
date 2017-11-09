var panel = $("#quiz-area");
var countStartNumber = 30;


var triviaQuestions = [
    {
        question: "Who Owns a Beet Farm?",
        answers: ["Angela", "Dwight", "Andy", "Jim"],
        correctAnswer: "Dwight",
        image: "assets/images/beets.png"
    },
    {
        question: "What is Jim's Last Name?",
        answers: ["Hathaway", "Hubert", "Halpert", "Albert"],
        correctAnswer: "Halpert",
        image: "assets/images/jim.jpg"
    },
    {
        question: "What is Dwight's cousin's name?",
        answers: ["Mose", "Robert", "Bob", "Jose"],
        correctAnswer: "Mose",
        image: "assets/images/theworst.gif"
    },
    {
        question: "Bears, Beets, __________",
        answers: ["Star Trek", "Battlestar Galactica", "Battle Galaxy", "Rattlestar Lactica"],
        correctAnswer: "Battlestar Galactica",
        image: "assets/images/battlestar.jpg"
    },
    {
        question: "Who was Pam engaged to?",
        answers: ["Toby", "Roy", "Andy", "Jim"],
        correctAnswer: "Trick question: Roy and then... Jim!",
        image: "assets/images/jim.jpg"
    }
];

// Variable to hold setInterval
var timer;

var game = {

    triviaQuestions: triviaQuestions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        this.counter--;
        $("#counter-number").html(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },

    loadQuestion: function() {

        timer = setInterval(this.countdown.bind(this), 1000);

        panel.html("<h2>" + triviaQuestions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < triviaQuestions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer-button' id='button' data-name='" + triviaQuestions[this.currentQuestion].answers[i] +
                "'>" + triviaQuestions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        this.counter = window.countStartNumber;
        $("#counter-number").html(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function() {

        clearInterval(window.timer);

        $("#counter-number").html(this.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + triviaQuestions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + triviaQuestions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === triviaQuestions.length - 1) {
            setTimeout(this.results, 3 * 1000);
        } else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },

    results: function() {

        clearInterval(window.timer);

        panel.html("<h2>Let's see how well you know your stuff...</h2>");

        $("#counter-number").html(this.counter);

        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (triviaQuestions.length - (this.incorrect + this.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(event) {
        clearInterval(window.timer);
        if ($(event.target).attr("data-name") === triviaQuestions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {

        this.incorrect++;

        clearInterval(window.timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + triviaQuestions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + triviaQuestions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === triviaQuestions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    answeredCorrectly: function() {

        clearInterval(window.timer);

        this.correct++;

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + triviaQuestions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === triviaQuestions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
    game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Left: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion.bind(game)();
});