const mode = document.getElementById('mode');
const dark = document.querySelectorAll('.theme');
const nav_img = document.getElementById('nav-img');

let user_id = null;
let theme = null;

try{
    user_id = JSON.parse(document.getElementById('user_id').textContent);
    theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
}
catch(err){
    console.log(err);
}

document.addEventListener("DOMContentLoaded", () => {
    const updateImage = () => {
        theme = JSON.parse(localStorage.getItem(`user${user_id}Preferences`));
        if (theme != null && +theme.darkmode === 1 && user_id != null) {
            nav_img.src = nav_img.getAttribute('data-dark-src');
        } else {
            nav_img.src = nav_img.getAttribute('data-light-src');
        }
    };

    if(mode != null && user_id != null){
        mode.addEventListener('click', function(){
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
    };

    if(theme != null && +theme.darkmode === 1 && user_id != null){
        dark.forEach(function(elemento) {
                elemento.classList.toggle('darkmode');
        });
        updateImage();
    }
});