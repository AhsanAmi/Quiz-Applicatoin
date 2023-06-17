function calculateScore(userAnswers) {
	 score = 0; // Reset the score
	
	quizQuestions.forEach((question, index) => {
	  const correctAnswer = question.answer;
	  const userAnswer = userAnswers[index];
	  
	  if (userAnswer === correctAnswer) {
		score++;
	  }
	});
    return score;
  }

  export {calculateScore};