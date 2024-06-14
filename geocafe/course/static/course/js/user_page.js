import { getDjangoValue } from "./base";

document.addEventListener("DOMContentLoaded", () => {  
    profilePictureUpdate = JSON.parse(document.getElementById('profile_picture_update').textContent);
    console.log(profilePictureUpdate);
    if (profilePictureUpdate == 1){
        loadProfilePicture(new URL(document.querySelector('#profile-picture').src), document.querySelector('#profile-picture'), getDjangoValue('user_id'));
    }

    // this loads the profile picture of the user into the profile picture element
    const user_id = getDjangoValue('user_id');
    const profilePictureImage = document.querySelector('#profile-picture')
    const url = getProfilePictureUrl(user_id);
    loadProfilePicture(url, profilePictureImage, user_id);

    setTimeout(() => {
        document.querySelectorAll('.drop-img-users').forEach(element => element.src = getUserData(user_id)?.profilePicture);
    }, 500)
})