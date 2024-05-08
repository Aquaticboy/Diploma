function setSession(userId, userName, userSurname, userLogin, userPassword, userPermitionLevel) {
    console.log(sessionStorage.getItem("userName"));
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userSurname", userSurname);
    sessionStorage.setItem("userLogin", userLogin);
    sessionStorage.setItem("userPassword", userPassword);
    sessionStorage.setItem("userPermitionLevel", userPermitionLevel);

    console.log("Session data set.");
    console.log(sessionStorage.getItem("userName"));
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
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userSurname");
    sessionStorage.removeItem("userLogin");
    sessionStorage.removeItem("userPassword");
    sessionStorage.removeItem("userPermitionLevel");
    console.log("Session data cleared.");
    console.log(sessionStorage.getItem("userName"));
}