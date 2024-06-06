import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'

document.addEventListener("DOMContentLoaded", () => { 
    const form = document.querySelector('form');
    const default_profile_picture_path = document.getElementById('default-profile-picture-path').textContent;
    console.log(default_profile_picture_path)
    const delete_profile_picture_button = document.getElementById('delete-profile-picture-button');
    let picture_deleted = false;

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
            if (picture_deleted){
                const csrftoken = Cookies.get('csrftoken'); // Assuming you're using the `js-cookie` library
                fetch("/delete-profile-picture", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken,
                    }
                })
                .then(response => response.json())
                .then(result => console.log(result))
            }
            document.querySelector("button[type='submit']").disabled = true;
            setTimeout(() => {
                form.submit();
            }, 500);
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
        picture_deleted = false;
    });

    delete_profile_picture_button.addEventListener('click', function() {
        profile_picture.src = default_profile_picture_path;
        profile_picture_input.value = null;
        picture_deleted = true;
    });
})