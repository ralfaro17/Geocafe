document.addEventListener("DOMContentLoaded", function() {
    var questions = document.querySelectorAll('.question');
    var currentQuestionIndex = 0;
    var answers = {};
    var delay = 2000; // 2 segundos de retraso antes de pasar a la siguiente pregunta
    var correct = 0;
    var incorrect = 0;

    var feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback-global');
    document.body.appendChild(feedbackContainer);

    function showQuestion(index) {
        questions.forEach((question, idx) => {
            if (idx === index) {
                question.classList.remove('hidden');
                setTimeout(() => {
                    question.classList.add('visible');
                }, 10); // Un pequeño retraso para asegurar que la transición ocurra
            } else {
                question.classList.remove('visible');
                question.classList.add('hidden');
            }
        });
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            }, 10); 
        } else {
            // Aquí puedes manejar lo que sucede cuando se completan todas las preguntas
            alert("Quiz completed!");
        }
    }

    function handleAnswer(button) {
        var question = button.closest('.question');
        var questionIndex = Array.from(questions).indexOf(question);
        var isCorrect = button.getAttribute('data-correct') === 'true';
        answers[questionIndex] = button.getAttribute('data-answer');

        var answerButtons = question.querySelectorAll('.answer');

        if (isCorrect) {
            feedbackContainer.textContent = 'Correct!';
            feedbackContainer.style.backgroundColor = 'green';
            button.classList.add('correct');
            correct++;
        } else {
            feedbackContainer.textContent = 'Incorrect.';
            feedbackContainer.style.backgroundColor = 'red';
            button.classList.add('incorrect');
            incorrect++;
        }

        feedbackContainer.classList.add('show');
        answerButtons.forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(function() {
            feedbackContainer.classList.remove('show');
            button.classList.remove('correct', 'incorrect');
            question.classList.remove('visible');
            question.classList.add('hidden');
            setTimeout(function() {
                showNextQuestion();
            }, 500);
        }, delay);
    }

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function() {
            handleAnswer(this);
        });
    });

    // Inicialización - Mostrar la primera pregunta
    showQuestion(currentQuestionIndex);
});

function submitQuiz() {
    // Aquí puedes manejar el envío del quiz
    console.log('Quiz submitted with answers:', answers);
    alert("Quiz submitted!");
}
