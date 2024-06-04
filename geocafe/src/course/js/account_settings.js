import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

document.addEventListener("DOMContentLoaded", () => { 
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (document.getElementById('password').value.trim () != document.getElementById('password2').value.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match',
            });
        }
        else{
            form.submit();
        }
    });

    const profile_picture = document.querySelector("#profile-picture");

    const profile_picture_input = document.getElementById('new-profile-picture');

    profile_picture_input.addEventListener('change', function() {
        const reader = new FileReader();
        reader.onload = function(e) {
            profile_picture.src = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    });
})