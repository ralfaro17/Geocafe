document.addEventListener("DOMContentLoaded", () => {  
    profilePictureUpdate = JSON.parse(document.getElementById('profile_picture_update').textContent);
    console.log(profilePictureUpdate);
    if (profilePictureUpdate == 1){
        loadProfilePicture(new URL(document.querySelector('#profile-picture').src), document.querySelector('#profile-picture'), getUserId());
    }

    // this loads the profile picture of the user into the profile picture element
    const user_id = getUserId();
    document.querySelector('#profile-picture').src = getUserData(user_id)?.profilePicture;
    const url = new URL(document.querySelector('#profile-picture').src);
    loadProfilePicture(url, document.querySelector('#profile-picture'), user_id);

    setTimeout(() => {
        document.querySelectorAll('.drop-img-users').forEach(element => element.src = getUserData(user_id)?.profilePicture);
    }, 500)
})