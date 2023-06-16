import './main.css'
let userAnswers = [];
let currentQuestionIndex = 0;
let score = 0;
// Sample quiz questions
const quizQuestions = [ {
	question: "Q:1 What is the capital of France?"
	, options: [ "Paris", "London", "Berlin", "Rome" ]
	, answer: "Paris"
}, {
	question: "Q:2 Who painted the Mona Lisa?"
	, options: [ "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo" ]
	, answer: "Leonardo da Vinci"
}, {
	question: "Q:3 What is the largest planet in our solar system?"
	, options: [ "Jupiter", "Mars", "Earth", "Saturn" ]
	, answer: "Jupiter"
}, {
	question: "Q:4 Which country won the FIFA World Cup in 2018?"
	, options: [ "France", "Brazil", "Germany", "Spain" ]
	, answer: "France"
}, {
	question: "Q:5 Who wrote the Harry Potter book series?"
	, options: [ "J.K. Rowling", "Stephen King", "George R.R. Martin", "Dan Brown" ]
	, answer: "J.K. Rowling"
}, {
	question: "Q:6 What is the chemical symbol for gold?"
	, options: [ "Au", "Ag", "Fe", "Cu" ]
	, answer: "Au"
}, ];
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
	loadQuestion();
} );
// Load question and options
function loadQuestion() {
	const currentQuestion = quizQuestions[currentQuestionIndex];
	questionElement.textContent = currentQuestion.question;
	optionsElement.innerHTML = "";
	
	currentQuestion.options.forEach((option) => {
	  const liElement = document.createElement("li");
	  const inputElement = document.createElement("input");
	  const labelTag = document.createElement("label");
	  inputElement.type = "radio";
	  inputElement.id = option;
	  inputElement.name = "option";
	  inputElement.value = option;
	  labelTag.textContent = option;
	  labelTag.setAttribute("for", option);
	  liElement.appendChild(labelTag);
	  liElement.prepend(inputElement);
	  
	  // Check if the user has answered the current question previously
	  const previousAnswer = userAnswers[currentQuestionIndex];
	  if (previousAnswer && previousAnswer === option) {
		inputElement.checked = true; // Pre-select the previous answer
	  }
	  
	  optionsElement.appendChild(liElement);
	});
	
	// Show or hide previous and next buttons
	if (currentQuestionIndex === 0) {
	  prevButton.style.display = "none";
	} else {
	  prevButton.style.display = "inline-block";
	}
	
	if (currentQuestionIndex === quizQuestions.length - 1) {
	  nextButton.style.display = "none";
	  submitButton.style.display = "inline-block";
	} else {
	  nextButton.style.display = "inline-block";
	  submitButton.style.display = "none";
	}
  }
  
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
		loadQuestion();
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
		loadQuestion();
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
			loadQuestion();
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