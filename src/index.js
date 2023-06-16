import './main.css'
import quizQuestions from './questionArray'
import { loadQuestion } from './loadQuestion';
let userAnswers = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionContainer = document.getElementById( "question-container" );
const questionElement = document.getElementById( "question" );
const optionsElement = document.getElementById( "options" );
const startButton = document.getElementById( "start-btn" );
const prevButton = document.getElementById( "prev-btn" );
const nextButton = document.getElementById( "next-btn" );
const submitButton = document.getElementById( "submit-btn" );
const restartButton = document.getElementById( "restart-btn" );
const resultElement = document.getElementById( "result" );
// Start the quiz
startButton.addEventListener( "click", () => {
	startButton.style.display = "none";
	questionContainer.style.display = "block";
	startTimer(); // Start timer for the current question
	loadQuestion(currentQuestionIndex,userAnswers);   //currentQuestionIndex,userAnswers
} );

  
// Check the selected answer
function checkAnswer(selectedAnswer) {
	userAnswers[currentQuestionIndex] = selectedAnswer; // Store the selected answer
	// No need to update the score here
  }
  
// Handle submit button click
submitButton.addEventListener("click", () => {
	const selectedOption = document.querySelector("input[type=radio]:checked");
	if (selectedOption) {
	  const selectedAnswer = selectedOption.value;
	  checkAnswer(selectedAnswer);
	  selectedOption.checked = false;
	  currentQuestionIndex++;
	  
	  if (currentQuestionIndex < quizQuestions.length) {
		loadQuestion(currentQuestionIndex,userAnswers);
	  } else {
		// All questions have been answered, calculate the score
		calculateScore();
		
		questionContainer.style.display = "none";
		resultElement.textContent = `Your score: ${score}/${quizQuestions.length}`;
		restartButton.style.display = "inline-block";
		submitButton.style.display = "none";
		prevButton.style.display = "none";
	  }
	}
  });
  
// Handle previous button click
prevButton.addEventListener( "click", () => {
	if ( currentQuestionIndex > 0 ) {
		currentQuestionIndex--;
		loadQuestion(currentQuestionIndex,userAnswers);
		var radioList = document.getElementById( "options" );
		var radioButtons = radioList.getElementsByTagName( "input" );
	}
} );
// Handle next button click
nextButton.addEventListener( "click", () => {
	var selectedRadioButton = document.querySelector( 'input[name="option"]:checked' );
	if ( selectedRadioButton ) {
		if ( currentQuestionIndex < quizQuestions.length - 1 ) {
			// const selectedOption = document.querySelector( "input[type=radio]:checked" );
			const selectedAnswer = selectedRadioButton.value;
			checkAnswer( selectedAnswer );
			currentQuestionIndex++;
			loadQuestion(currentQuestionIndex,userAnswers);
		}
	}
} );
// Handle restart button click
restartButton.addEventListener( "click", () => {
	location.reload();
} );



let timer;
const timeLimitPerQuestion = 60; // Time limit in seconds for each question
// Start the timer
function startTimer() {
	let timeRemaining = timeLimitPerQuestion;
	updateTimerDisplay( timeRemaining );
	timer = setInterval( () => {
		timeRemaining--;
		updateTimerDisplay( timeRemaining );
		if ( timeRemaining <= 0 ) {
			clearInterval( timer );
			handleTimeout();
		}
	}, 1000 );
}
// Update the timer display
function updateTimerDisplay( time ) {
	const timerElement = document.getElementById( "timer" );
	timerElement.textContent = `Time Remaining: ${time} seconds`;
}
// Handle timeout when the time limit is reached
function handleTimeout() {
	const selectedOption = document.querySelector("input[type=radio]:checked");
	if (selectedOption) {
	  const selectedAnswer = selectedOption.value;
	  checkAnswer(selectedAnswer);
	  selectedOption.checked = false;
	  currentQuestionIndex++;
	
		// All questions have been answered, calculate the score
		calculateScore();
		
		questionContainer.style.display = "none";
		resultElement.textContent = `Your score: ${score}/${quizQuestions.length}`;
		restartButton.style.display = "inline-block";
		submitButton.style.display = "none";
		prevButton.style.display = "none";
		nextButton.style.display = "none";
	}
	else {
		// All questions have been answered, calculate the score
		calculateScore();
		questionContainer.style.display = "none";
		resultElement.textContent = `Your score: ${score}/${quizQuestions.length}`;
		restartButton.style.display = "inline-block";
		submitButton.style.display = "none";
		prevButton.style.display = "none";
		nextButton.style.display = "none";
	  }
}


function calculateScore() {
	score = 0; // Reset the score
	
	quizQuestions.forEach((question, index) => {
	  const correctAnswer = question.answer;
	  const userAnswer = userAnswers[index];
	  
	  if (userAnswer === correctAnswer) {
		score++;
	  }
	});
  }