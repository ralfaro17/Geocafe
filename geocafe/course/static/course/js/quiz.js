var modalResult = document.getElementById("result-modal");
var btnResult = document.getElementById("btn-result");
var span = document.getElementsByClassName("close")[0];

console.log("Modal Result:", modalResult);
console.log("Button Result:", btnResult);

btnResult.onclick = function() {
    modalResult.style.display = "flex";
}
span.onclick = function() {
    modalResult.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modalResult) {
        modalResult.style.display = "none";
    }
}

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
            // Mostrar los resultados en el modal
            displayResults();
            if (btnResult) {
                btnResult.click();
            }
        }
    }
    

    function handleAnswer(button) {
        var question = button.closest('.question');
        var questionIndex = Array.from(questions).indexOf(question);
        var isCorrect = button.getAttribute('data-correct') === 'true';
        answers[questionIndex] = {
            answer: button.getAttribute('data-answer'),
            correct: isCorrect
        };

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
    function displayResults() {
        var resultContent = document.getElementById("resultado");
        if (!resultContent) {
            console.error("No se pudo encontrar el elemento con el ID 'resultado'.");
            return;
        }

        resultContent.innerHTML = ""; // Limpiar contenido previo

        var resultList = document.createElement("ul");
        for (var i = 0; i < questions.length - 1; i++) {
            var listItem = document.createElement("li");
            listItem.textContent = "Pregunta " + (i + 1) + ": " + (answers[i] && answers[i].correct ? "Correcta" : "Incorrecta");
            resultList.appendChild(listItem);
        }

        resultContent.appendChild(resultList);
    }

    var modalResult = document.getElementById("result-modal");
    var span = document.getElementsByClassName("close")[0];

    // Cuando el usuario hace clic en <span> (x), cierra el modal
    span.onclick = function() {
        modalResult.style.display = "none";
    }

    // Cuando el usuario hace clic en cualquier parte fuera del modal, ciérralo
    window.onclick = function(event) {
        if (event.target == modalResult) {
            modalResult.style.display = "none";
        }
    }

    // Aquí va el resto de tu código, como mostrar y manejar las preguntas y respuestas del quiz

    // Por ejemplo:
    var btnResult = document.getElementById("btn-result");
    if (btnResult) {
        btnResult.onclick = function() {
            modalResult.style.display = "block";
            displayResults(); // Muestra los resultados en el modal
        }
    }
});

function submitQuiz() {
    console.log('Quiz submitted with answers:', answers);
    alert("Quiz submitted!");
}
