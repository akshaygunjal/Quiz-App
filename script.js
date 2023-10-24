const questions = [
    {
        question: "How many times have India won the cricket world cup?",
        answers: [
            { text: "2", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "Which Indian cricketer is also known as the “God of Cricket”?",
        answers: [
            { text: "MS Dhoni", correct: false},
            { text: "Yuvraj Singh", correct: false},
            { text: "Virat Kohli", correct: false},
            { text: "Sachin Tendulkar", correct: true},
        ]
    },
    {
        question: "Who is the current Captain of the Indian National Men’s Cricket Team?",
        answers: [
            { text: "Virat Kohli", correct: false},
            { text: "MS Dhoni", correct: false},
            { text: "Rohit Sharma", correct: true},
            { text: "Hardik Pandya", correct: false},
        ]
    },
    {
        question: " What is the moniker given to the Indian cricket team?",
        answers: [
            { text: "Men in Blue", correct: true},
            { text: "The Team of Lions", correct: false},
            { text: "The Indian Army ", correct: false},
            { text: "None of the above", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
        button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();