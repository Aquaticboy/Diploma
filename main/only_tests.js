function setSession(userId, userName, userSurname, userLogin, userPassword, userPermitionLevel) {
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userSurname", userSurname);
    sessionStorage.setItem("userLogin", userLogin);
    sessionStorage.setItem("userPassword", userPassword);
    sessionStorage.setItem("userPermitionLevel", userPermitionLevel);

    console.log("Session data set.");
}

// Function to get session data
function getSession() {
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}
// Function to clear session data
function clearSession() {
    // Clear sessionStorage
    sessionStorage.removeItem("userId");
    console.log("Session data cleared.");
}