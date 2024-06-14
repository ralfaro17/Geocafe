// use this to get the user data from the local storage, if it doesn't exist, return an empty object to which you can add values
export function getUserData(user_id){
    const userData = localStorage.getItem(`user${user_id}data`);
    if(userData != null){
        return JSON.parse(userData);
    }
    else{
        return {};
    }
};


export function isValidFilename(str) {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(str);
}


// use this to get the profile picture URL of the user
function getProfilePictureUrl(user_id){
    const profilePicture = getUserData(user_id).profilePicture;
    if (profilePicture){
        return new URL(profilePicture);
    }
    else{
        return new URL("https://no.profile.picture");
    }
}


export function isPresignedUrlExpired(url) {
    const urlObj = new URL(url);

    // Extract the X-Amz-Date and X-Amz-Expires parameters
    const amzDate = urlObj.searchParams.get('X-Amz-Date');
    const amzExpires = urlObj.searchParams.get('X-Amz-Expires');

    if (!amzDate || !amzExpires) {
        throw new Error("URL does not contain the necessary AWS presigned parameters.");
    }

    // Parse the X-Amz-Date parameter (format: YYYYMMDDTHHmmssZ)
    const expirationDate = new Date(
        Date.UTC(
            parseInt(amzDate.slice(0, 4)),      // Year
            parseInt(amzDate.slice(4, 6)) - 1,  // Month (0-indexed)
            parseInt(amzDate.slice(6, 8)),      // Day
            parseInt(amzDate.slice(9, 11)),     // Hour
            parseInt(amzDate.slice(11, 13)),    // Minute
            parseInt(amzDate.slice(13, 15))     // Second
        )
    );

    // Add the X-Amz-Expires value (in seconds) to the expiration date
    const expirationTimeInSeconds = parseInt(amzExpires);
    expirationDate.setSeconds(expirationDate.getSeconds() + expirationTimeInSeconds);
    // console.log("Expiration date: " + expirationDate)

    // Compare the expiration date with the current date
    const currentDate = new Date();
    // console.log("Current date: " + currentDate);
    return currentDate > expirationDate;
}


export function getDjangoValue(elementId){
    try{
        return JSON.parse(document.getElementById(`${elementId}`).textContent);
    }
    catch(err){
        return null;
    }
}


// URL has to be a URL object
export function loadProfilePicture(url, imgElement, user_id){
    if (!url.searchParams.get('X-Amz-Date') || isPresignedUrlExpired(url)) {
        // console.log("Presigned URL has expired or doesn't exist.");
        fetch("/generate-new-image-url")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            userData = getUserData(user_id);
            userData.profilePicture = data.url;
            localStorage.setItem(`user${user_id}data`, JSON.stringify(userData));
            imgElement.src = data.url;
            imgElement.style.display = "block";
        });
    }
    else{
        imgElement.src = url;
        imgElement.style.display = "block";
    }
}


export function getUserFiles(){
    fetch('/get-user-files')
    .then(response => response.json())
    .then(data => {
        return data.files[1];
    })

}