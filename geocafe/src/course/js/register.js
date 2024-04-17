import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// Import our custom CSS
import '../../scss/styles.sass'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


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
            Swal.fire({
                icon: "error",
                title: "Register error",
                text: "Your passwords don't match",
            });
        }
    })
})