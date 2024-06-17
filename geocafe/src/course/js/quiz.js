import increment_unit from "./increment_unit";
import { getDjangoValue } from "./helpers";
import { Swal } from "sweetalert2/dist/sweetalert2";

let modalResult = document.getElementById("result-modal");
let btnResult = document.getElementById("btn-result");
let correct = 0;
let notAuthenticated = getDjangoValue("not_authenticated");

let btnContinueDiv = document.getElementById("btn-continue");
let span = document.getElementsByClassName("close")[0];

// console.log("Modal Result:", modalResult);
// console.log("Button Result:", btnResult);

btnResult.onclick = function () {
    modalResult.style.display = "flex";
}
span.onclick = function () {
    modalResult.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modalResult) {
        modalResult.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var questions = document.querySelectorAll('.question');
    var currentQuestionIndex = 0;
    var answers = {};
    var delay = 2000; // 2 segundos de retraso antes de pasar a la siguiente pregunta
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
        submitQuiz();
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
            correct += 1;
        } else {
            feedbackContainer.textContent = 'Incorrect.';
            feedbackContainer.style.backgroundColor = 'red';
            button.classList.add('incorrect');
            incorrect += 1;
        }

        feedbackContainer.classList.add('show');
        answerButtons.forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(function () {
            feedbackContainer.classList.remove('show');
            button.classList.remove('correct', 'incorrect');
            question.classList.remove('visible');
            question.classList.add('hidden');
            setTimeout(function () {
                showNextQuestion();
            }, 500);
        }, delay);
    }

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function () {
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
            var quesDiv = document.createElement("div");
            quesDiv.classList.add("modal-result");

            var questionText = document.createElement("p");
            questionText.textContent = "Question " + (i + 1);
            questionText.classList.add("question-modal-text");

            var resultText = document.createElement("p");
            resultText.textContent = answers[i] && answers[i].correct ? "🟢 Correct" : "🔴 Incorrect";
            resultText.classList.add("result-modal-text");

            quesDiv.appendChild(questionText);
            quesDiv.appendChild(resultText);
            listItem.appendChild(quesDiv);
            resultList.appendChild(listItem);
        }

        var score = document.createElement("p");
        score.classList.add("score-modal-text");
        // console.log(correct);
        score.textContent = "Score: " + correct + " / " + (questions.length - 1);
        resultList.appendChild(score);

        resultContent.appendChild(resultList);
    }

    var modalResult = document.getElementById("result-modal");
    var span = document.getElementsByClassName("close");
    var btnSad = document.getElementById("continue-modal");
    var modalSat = document.getElementById("sad-modal");
    // console.log(correct);

    // console.log("Modal Result:", modalResult);
    // console.log("Button Result:", btnResult);

    // Cuando el usuario hace clic en <span> (x), cierra el modal
    span.onclick = function () {
        modalResult.style.display = "none";
        if (modalSat) {
            modalSat.style.display = "none";
        }
    }
    // Cuando el usuario hace clic en cualquier parte fuera del modal, ciérralo
    window.onclick = function (event) {
        if (event.target == modalResult) {
            modalResult.style.display = "none";
        }
        var continueModal = document.getElementById("continue-modal");
        if (event.target == continueModal) {
            continueModal.style.display = "none";
        }
    }



    var btnResult = document.getElementById("btn-result");
    if (btnResult) {
        btnResult.onclick = function () {
            modalResult.style.display = "flex";
            displayResults(); // Muestra los resultados en el modal
        }
    }

    function showSadMessageModal() {
        // console.log("showSadMessageModal called");
        var sadMessageModal = document.getElementById("continue-modal");
        sadMessageModal.style.display = "flex";
    }

    function submitQuiz() {
        // Limpiar el contenido previo de btnContinueDiv antes de agregar nuevos botones
        btnContinueDiv.innerHTML = "";

        let totalQuestions = questions.length - 1;
        let correctPercentage = (correct / totalQuestions) * 100;
        // console.log(`correct value: ${correct}`)
        // console.log("El porcentaje de respuestas correctas es: " + correctPercentage);

        if(notAuthenticated){
            let continueLink = document.createElement("a");
            continueLink.textContent = "Continue";
            continueLink.classList.add("quiz-continue", "div-center");
            continueLink.addEventListener("click", function () {
                // Cuando se hace clic en el botón "Continuar", incrementar la unidad actual y redirigir a la página de unidades
                Swal.fire({
                    icon: 'info',
                    title: 'Notification',
                    text: 'You must have an account to unlock the next units',
                })
            })

            btnContinueDiv.appendChild(continueLink);
        }
        else if (correctPercentage > 50) {
            // Si el porcentaje de respuestas correctas es mayor al 50%, mostrar el botón de continuar
            let continueLink = document.createElement("a");
            continueLink.href = "/units?unit_incremented=1";
            continueLink.textContent = "Continue";
            continueLink.classList.add("quiz-continue", "div-center");
            continueLink.addEventListener("click", function () {
                // Cuando se hace clic en el botón "Continuar", incrementar la unidad actual y redirigir a la página de unidades
                increment_unit();
            })

            btnContinueDiv.appendChild(continueLink);
        } else {
            // Si el porcentaje de respuestas correctas es menor o igual al 50%, mostrar el botón de mensaje "IM Sorry :C"
            let sadModalButton = document.createElement("button");
            sadModalButton.textContent = "Failed";
            sadModalButton.addEventListener("click", function () {
                // Cuando se hace clic en el botón "No pasa", mostrar el modal de mensaje "IM Sorry :C"
                showSadMessageModal();
            });
            sadModalButton.classList.add("quiz-result");

            btnContinueDiv.appendChild(sadModalButton);
        }
    }

    // Llama a submitQuiz después de haber respondido todas las preguntas

/* bugs:
    llevo contador que me indica las question correcta y ese valor dentro la funcion submitquiz()
    estoy manejando el valor de correct que tiene almacenado lo respondido pero siempre me indica el valor 0
    pero en la funcio displayresult() uso esa misma variable si me da un valor
    
*/
});


