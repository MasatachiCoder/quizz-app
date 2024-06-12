const questions = [
    {
        question: "Quel est le plus grand animal du monde",
        answers: [
            { text: "Requin", correct: false },
            { text: "Baleine", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Quel est le plus grand desert du monde",
        answers: [
            { text: "Groenland", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctique", correct: true }
        ]
    },
    {
        question: "Quel est le plus petit pays du monde",
        answers: [
            { text: "Vatican", correct: true },
            { text: "litchenstein", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false }
        ]
    },
    {
        question: "Quel est le plus petit continent du monde",
        answers: [
            { text: "Asie", correct: false },
            { text: "Oceanie", correct: true },
            { text: "Arctique", correct: false },
            { text: "Afrique", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz()  {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); // Corrected class name
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none'
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Votre score ${score} sur ${questions.length}!`;
    nextButton.innerHTML = 'Rejouer'
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if (currentQuestionsIndex < questions.length) {
        showQuestion();

    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionsIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();



