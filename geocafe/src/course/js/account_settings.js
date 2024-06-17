import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'
import { getUserData, getDjangoValue, loadProfilePicture, getProfilePictureUrl } from './helpers.js'


document.addEventListener("DOMContentLoaded", () => { 
    // this loads the profile picture of the user into the profile picture element
    const user_id = getDjangoValue('user_id');
    const profilePictureImage = document.querySelector('#profile-picture')
    const url = getProfilePictureUrl(user_id);
    const deleteAccountButton = document.getElementById('delete-account-button');
    loadProfilePicture(url, profilePictureImage, user_id);


    // this is the logic for the form
    const form = document.querySelector('form');
    const default_profile_picture_path = document.getElementById('default-profile-picture-path').textContent;
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
                const csrftoken = Cookies.get('csrftoken'); 
                fetch("/delete-profile-picture", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken,
                    }
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
            }
            document.querySelector("button[type='submit']").disabled = true;
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
        picture_deleted = false;
    });

    delete_profile_picture_button.addEventListener('click', function() {
        profile_picture.src = default_profile_picture_path;
        profile_picture_input.value = null;
        picture_deleted = true;
    });

    deleteAccountButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Are you sure you want to delete your account?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const csrftoken = Cookies.get('csrftoken'); 
                fetch("/delete-account", {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken,
                    }
                })
                .then(response => response.json())
                .then(result => {
                    Swal.fire({
                        title: 'Account deleted',
                        text: 'Your account has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1600);
                })
            }
        })
    })
})