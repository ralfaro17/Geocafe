const mode = document.getElementById('mode');
const dark = document.querySelectorAll('.theme');
const nav_img = document.getElementById('nav-img');
const user_id = JSON.parse(document.getElementById('user_id').textContent);
let theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
document.addEventListener("DOMContentLoaded", () => {
    const updateImage = () => {
        theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
        if (theme != null && +theme.darkmode === 1 && user_id != null) {
            nav_img.src = nav_img.getAttribute('data-dark-src');
        } else {
            nav_img.src = nav_img.getAttribute('data-light-src');
        }
    };

    mode.addEventListener('click', function() {
        theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
        if (theme != null && +theme.darkmode === 1 && user_id != null) {
            localStorage.setItem(`user${user_id}Preferences`, JSON.stringify({'darkmode': 0}))
        } else {
            localStorage.setItem(`user${user_id}Preferences`, JSON.stringify({'darkmode': 1}))
        }
        dark.forEach(function(elemento) {
            elemento.classList.toggle('darkmode');
        });
        updateImage();
    });

    if(theme != null && +theme.darkmode === 1 && user_id != null){
        dark.forEach(function(elemento) {
                elemento.classList.toggle('darkmode');
        });
        updateImage();
    }
});