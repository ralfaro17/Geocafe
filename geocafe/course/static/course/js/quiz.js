// static/course/js/quiz.js

document.addEventListener("DOMContentLoaded", function() {
    var questions = document.querySelectorAll('.question');
    var currentQuestionIndex = 0;
    var answers = {};
    var delay = 2000; // 2 segundos de retraso antes de pasar a la siguiente pregunta
    var correct,incorrect;

    function showQuestion(index) {
        questions.forEach((question, idx) => {
            question.style.display = (idx === index) ? 'block' : 'none';
        });
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
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

        var feedback = question.querySelector('.feedback');
        var answerButtons = question.querySelectorAll('.answer');

        if (isCorrect) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
            button.classList.add('correct');
            correct++;
        } else {
            feedback.textContent = 'Incorrect.';
            feedback.style.color = 'red';
            button.classList.add('incorrect');
            incorrect++;
        }

        feedback.style.display = 'block';

        setTimeout(function() {
            feedback.style.display = 'none';
            button.classList.remove('correct', 'incorrect');
            showNextQuestion();
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
