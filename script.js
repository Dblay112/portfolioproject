// Array of objects representing quiz questions and their respective answers
const questions = [
	{
		question: "Which event marked the end of World War II in Europe?",
		answers: [
			{ text: "Fall of Berlin", correct: false},
			{ text: "Signing of the Treaty of Versailles", correct: false},
			{ text: "D-Day Invasion", correct: false},
			{ text: "V-E Day (Victory in Europe Day)", correct: true},
		]
	},
	// Add more questions and answers following the same structure
];

// DOM element references
const questionElement = document.getElementById("question"); // Reference to the element displaying the question
const answerButtons = document.getElementById("a-buttons"); // Reference to the container of answer buttons
const nextButton = document.getElementById("next-button"); // Reference to the "Next" button

// Variables to track quiz progress and score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; // Set the "Next" button text
    showQuestion(); // Display the first question
}

// Function to display a question
function showQuestion(){
    resetState(); // Reset the state of the quiz interface
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    let questionNo = currentQuestionIndex + 1; // Calculate the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Iterate through the answer options and create buttons for each
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Create a button element
        button.innerHTML = answer.text; // Set the button text
        button.classList.add("btn"); // Add a CSS class to the button
        answerButtons.appendChild(button); // Append the button to the answer buttons container

        // Add a custom attribute to indicate if the answer is correct
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        // Add an event listener to handle button clicks
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state of the quiz interface
function resetState(){
    nextButton.style.display = "none"; // Hide the "Next" button
    while(answerButtons.firstChild){ // Remove all child elements from the answer buttons container
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle the selection of an answer
function selectAnswer(e){
    const selectedBtn = e.target; // Get the clicked button
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the selected answer is correct

    // Add CSS classes based on correctness of the answer
    if (isCorrect){
        selectedBtn.classList.add("correct"); // Add "correct" class to the selected button
        score++; // Increment the score
    } else {
        selectedBtn.classList.add("incorrect"); // Add "incorrect" class to the selected button
    }

    // Disable all answer buttons and highlight correct answers
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Display the "Next" button
}

// Function to display the final score
function showScore(){
    resetState(); // Reset the state of the quiz interface
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`; // Display the score
    nextButton.innerHTML = "Take the Quiz Again"; // Change the "Next" button text
    nextButton.style.display = "block"; // Display the "Next" button
}

// Function to handle "Next" button clicks
function handleNextButton(){
    currentQuestionIndex++; // Move to the next question
    if(currentQuestionIndex < questions.length){ // If there are more questions
        showQuestion(); // Display the next question
    } else { // If all questions have been answered
        showScore(); // Display the final score
    }
}

// Event listener for "Next" button clicks
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){ // If there are more questions
        handleNextButton(); // Handle "Next" button click
    } else { // If all questions have been answered
        startQuiz(); // Start the quiz again
    }
});

startQuiz(); // Start the quiz when the page loads
