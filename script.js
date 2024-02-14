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
	{
		question: "Who wrote the novel To Kill a Mockingbird?",
		answers: [
			{ text: "Harper Lee", correct: true},
			{ text: "F. Scott Fitzgerald", correct: false},
			{ text: "Ernest Hemingway", correct: false},
			{ text: "J.K. Rowling", correct: false},
		]

	},
	{
		question: "What is the largest planet in our solar system?",
		answers: [
			{ text: "Venus", correct: false},
			{ text: "Jupiter", correct: true},
			{ text: "Earth", correct: false},
			{ text: "Mars", correct: false},

		]

	},
	{
		question: "What is the derivative of x^2?",
		answers: [
			{ text: "2x3", correct: false},
			{ text: "2x^1 (or simplified as 2x)", correct: true},
			{ text: "x^3", correct: false},
			{ text: "1/x", correct: false},

		]

	},
	{
		question: "Who was the Prime Minister of Canada as of February 14, 2024?",
		answers: [
			{ text: "Kim Campbell", correct: false},
			{ text: "John Turner", correct: false},
			{ text: "Justin Trudeau", correct: true},
			{ text: "Stephen Harper", correct: false},

		]

	},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("a-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Take the Quiz Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
