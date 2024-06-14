function updateImage() {
    const nav_img = document.getElementById('nav-img');

    theme = getUserData(user_id)?.darkmode;
    if (theme != null && +theme.darkmode === 1 && user_id != null) {
        nav_img.src = nav_img.getAttribute('data-dark-src');
    } else {
        nav_img.src = nav_img.getAttribute('data-light-src');
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const mode = document.getElementById('mode');
    const dark = document.querySelectorAll('.theme');
    const user_id = getDjangoValue("user_id");

    let theme = null;


    try{
        theme = getUserData(user_id)?.darkmode;
    }
    catch(err){
        console.log(err);
    }


    if(mode != null && user_id != null){
        mode.addEventListener('click', function(){
            userData = getUserData(user_id);
            theme = userData?.darkmode;

            if (theme != null && theme === 1 && user_id != null) {
                userData.darkmode = 0;
                localStorage.setItem(`user${user_id}data`, JSON.stringify(userData))
            } else {
                userData.darkmode = 1;
                localStorage.setItem(`user${user_id}data`, JSON.stringify(userData))
            }
            dark.forEach(function(elemento) {
                elemento.classList.toggle('darkmode');
            });
            updateImage();
        });
    };

    if(theme != null && theme === 1 && user_id != null){
        dark.forEach(function(elemento) {
            elemento.classList.toggle('darkmode');
        });
        updateImage();
    }
});