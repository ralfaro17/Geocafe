
document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        let password = document.querySelector("#password-input").value;
        let confirm_password = document.querySelector("#confirm-password-input").value;
        event.preventDefault();

        if(password === confirm_password){
            form.submit()
        }
        else{
            
        }
    })
})