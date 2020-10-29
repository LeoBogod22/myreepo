//Question array with answers and explanation



var  hintsleft=2;
var questionArray = {
   questions: [

   {
       text: 'Javascript is going to be an outdated technology, dont learn it',
       choices: ['True: Go is the new hype man!', 'False: Jeff Atwood said "Any application that can be written in JavaScript, will eventually be written in JavaScript', ' Javascript is lame of course', 'None of the above'],
       answer: 1,
       explanation: 'ANSWER: Javascript is one of the most popular languages',
       hint: 'the most in demand programming langauges are?  '
   },

   {
       text: 'Inside which HTML element do we put the JavaScript?',
       choices: ['script', 'body', 'header', 'p'],
       answer: 0,
       explanation: 'ANSWER: Js is written in script tag.',
       hint:  ' the html element either contains scripting statements, or it points to an external script file through the src attribute. '
   },

   {
       text: 'How do you write "Hello World" in an alert box?',
       choices: ['alert("hello world")', 'message("hello world")', 'alertbox("hello world") ', '8'],
       answer: 0,
       explanation: 'ANSWER: 7',
       hint:"how to display alret in js"
   },

   {
       text: 'Which of the following code creates an object??',
       choices: ['var book = Object();', 'var book = new Object();', 'var book = new OBJECT();', 'var book = new Book();'],
       answer: 1,
       explanation: 'var book = new Object(); creates an object..',
       hint: "how to create an object in js ,not an instance of a class"
   },

   {
       text: 'How to use a JavaScript Class.s',
       choices: ['let myCar2 = new Car("Audi", 2019);', 'let myCar2=new Object("Audi, 2019")', 'let new Car= new Object("Audi , 2019")', 'Var myCar = New Car();'],
       answer: 0,
       explanation: 'ANSWER: JavaScript Classes are templates for JavaScript Object',
       hint:" use the Car class to create Car objects:"
   },

   {
       text: ' Which of the following function of Array object calls a function for each element in the array?',
       choices: ['concat()', 'every()', ' filter()', ' forEach()'],
       answer: 0,
       explanation: 'forEach() − Calls a function for each element in the array.',
       hint:"method to loop troguh Array"
   }
   ],

   good: [
   "You Have excellent knowledge of js, congrats your ready to work for google"],

   bad: [
   "You have very poor knowledge of js , no more video games go study  kid..."],


   score: 0,
   currentQuestionIndex: 0,

   path: 'start',

   lastAnswerCorrect: false,
   //Feedback from previous attempt
   feedbackRandom: 0,

};

//Traverse the various pages
function setPath(questionArray, path) {
    questionArray.path = path;
}

function resetGame(questionArray) {
    questionArray.score = 0;
    questionArray.currentQuestionIndex = 0;
    setPath(questionArray, 'start');
}

//Gives good or bad feedback after answers
function answerQuestion(questionArray, answer) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    questionArray.lastAnswerCorrect = currentQuestion.answer === answer;
    if (questionArray.lastAnswerCorrect) {
        questionArray.score++;
    }
    selectFeedback(questionArray);
    setPath(questionArray, 'answer-feedback');
}

function selectFeedback(questionArray) {
    questionArray.feedbackRandom = Math.random();
}

//if quiz is not over, it will continue
function advance(questionArray) {
    questionArray.currentQuestionIndex++;
    if(questionArray.currentQuestionIndex === questionArray.questions.length) {
        setPath(questionArray, 'final-feedback');
    }

    else {
        setPath(questionArray, 'question');
    }
}

//---RENDER FUNCTIONS--->//

//Function that will display quiz
   //Hide all pages, then displays current page using the path. If / Else function
function renderQuiz(questionArray, elements) {
    Object.keys(elements).forEach(function(path) {
        elements[path].hide();
    });

    elements[questionArray.path].show();

    if (questionArray.path === 'start') {
        renderStartPage(questionArray, elements[questionArray.path]);
    }

    //Set path to question page
    else if (questionArray.path === 'question') {
        renderQuestionPage(questionArray, elements[questionArray.path]);
    }

    //Set path to feedback page
    else if (questionArray.path === 'answer-feedback') {
        renderAnswerFeedbackPage(questionArray, elements[questionArray.path]);
    }

    //Set path to final feedback page
    else if (questionArray.path === 'final-feedback') {
        renderFinalFeedbackPage(questionArray, elements[questionArray.path]);
    }
}

//This displays question page
function renderQuestionPage(questionArray, element) {
    renderQuestionCount(questionArray,  element.find('.question-count'));
    renderQuestionText(questionArray, element.find('.question-text'));
    renderChoices(questionArray,  element.find('.choices'));
}

//This displays feedback after each question and has 'next' button
function renderAnswerFeedbackPage(questionArray, element) {
    renderAnswerFeedbackHeader(questionArray, element.find('.feedback-header'));
    renderAnswerFeedbackText(questionArray, element.find('.feedback-text'));
    renderExplanation(questionArray, element.find('.explanation'));
    renderNextButtonText(questionArray, element.find('.see-next'));
    renderCurrentScore(questionArray, element.find('.current-score'));
}

//Display final feedback after the quiz
function renderFinalFeedbackPage(questionArray, element) {
    renderFinalFeedbackText(questionArray, element.find('.results-text'));
}

function renderQuestionCount(questionArray, element) {
    var text = (questionArray.currentQuestionIndex + 1) + "/" + questionArray.questions.length;

    element.text(text);
}

//Render the question
function renderQuestionText(questionArray, element) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    element.text(currentQuestion.text);
}

//Render the explanation
function renderExplanation(questionArray, element) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    element.text(currentQuestion.explanation);
}

//Render the current score
function renderCurrentScore(questionArray, element) {
    var score = questionArray.score;
    var currentQuestionIndex = questionArray.currentQuestionIndex;
    /*var scoreElement = $('.current-score');
    scoreElement.text("Your score is " + score + "/" + currentQuestionIndex);*/

}

//Render the choices
function renderChoices(questionArray, element){
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    var choices = currentQuestion.choices.map(function(choice, index) {
        return (
            '<input type="radio" name="user-answer" value="' + index + '" required>' +
            '<label>' + choice + '</label><br/>'
            );
    });

    element.html(choices);
}

function renderAnswerFeedbackHeader(questionArray, element) {
    var html = questionArray.lastAnswerCorrect ?
    "<h4 class='user-was-correct'>Correct</h4>" :
    "<h4 class='user-was-incorrect'>Wrong!</>";

    element.html(html);
}

function renderAnswerFeedbackText(questionArray, element) {
    var choices = questionArray.lastAnswerCorrect ? questionArray.good : questionArray.bad;
    var text = choices[Math.floor(questionArray.feedbackRandom * choices.length)];

    element.text(text);
}


function renderNextButtonText(questionArray, element) {
    var text = questionArray.currentQuestionIndex < questionArray.questions.length - 1 ?
    "Next  QUESTION: " : "What's the score?";

    element.text(text);
}

//What will be displayed when quiz is completed
function renderFinalFeedbackText(questionArray,  element) {
    var text = "You got " + questionArray.score + " out of " + questionArray.questions.length + " questions right.";

    element.text(text);
}

//Page elements
var PAGE_ELEMENTS = {
    'start': $('.start-page'),
    'question': $('.questions-page'),
    'answer-feedback': $('.answer-feedback-page'),
    'final-feedback': $('.final-feedback-page'),
};

//Event to start quiz and go to first question
$(".game-start").submit(function(event) {
    event.preventDefault();
    setPath(questionArray, 'question');
    renderQuiz(questionArray, PAGE_ELEMENTS);
});

//Event to restart quiz
$('.restart-game').click(function(event) {
    event.preventDefault();
    resetGame(questionArray);
    renderQuiz(questionArray, PAGE_ELEMENTS);
});


//Receive choice from user
$("form[name='current-question']").submit(function(event) {
    event.preventDefault();
    var answer = $("input[name='user-answer']:checked").val();
    answer = parseInt(answer, 6);
    answerQuestion(questionArray, answer);
    renderQuiz(questionArray, PAGE_ELEMENTS);
});

$('.see-next').click(function(event) {
    advance(questionArray);
    renderQuiz(questionArray, PAGE_ELEMENTS);
    $('#tagscloud').fadeIn();
      $('#tagscloud').text("");
});

$('.hint-game').click(function(event) {

  if(hintsleft>0){
  var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
  $("#successMessage").text(currentQuestion.hint);
        hintsleft--;

$("#tagscloud ").text(currentQuestion.hint);
  $("#WebPartCaptionWPQ2").text("hints remaining" + " " +  hintsleft);

  $('#tagscloud').delay(5000).fadeOut('slow');
}

else {

  alert("no hintsleft");
}
});



$(function() {
    renderQuiz(questionArray, PAGE_ELEMENTS);
});
