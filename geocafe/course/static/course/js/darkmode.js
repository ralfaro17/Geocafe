const mode = document.getElementById('mode');
const dark = document.querySelectorAll('.theme');
const user_id = JSON.parse(document.getElementById('user_id').textContent);
let theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
document.addEventListener("DOMContentLoaded", () => {
    if(+theme.darkmode === 1){
        dark.forEach(function(elemento) {
                elemento.classList.toggle('darkmode');
            });
        }
    })

    mode.addEventListener('click', function() {
        if (+theme.darkmode === 1 && user_id != null) {
            localStorage.setItem(`user${user_id}Preferences`, JSON.stringify({'darkmode': 0}))
        } else {
            localStorage.setItem(`user${user_id}Preferences`, JSON.stringify({'darkmode': 1}))
        }
        dark.forEach(function(elemento) {
            elemento.classList.toggle('darkmode');
        });
    });