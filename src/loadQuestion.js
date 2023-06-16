import quizQuestions from './questionArray'
const questionElement = document.getElementById( "question" );
const optionsElement = document.getElementById( "options" );
const prevButton = document.getElementById( "prev-btn" );
const nextButton = document.getElementById( "next-btn" );
const submitButton = document.getElementById( "submit-btn" );

// Load question and options
function loadQuestion(currentQuestionIndex,userAnswers) {
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


  export{loadQuestion};