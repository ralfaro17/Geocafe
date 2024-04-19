const mode = document.getElementById('mode');
const dark = document.querySelectorAll('.theme');
mode.addEventListener('click', function() {
    dark.forEach(function(elemento) {
        elemento.classList.toggle('darkmode');
    });
});