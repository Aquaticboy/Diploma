// Function to clear session data
function clearSession() {
    // Clear sessionStorage
    console.log(sessionStorage.getItem("userName"));
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userSurname");
    sessionStorage.removeItem("userLogin");
    sessionStorage.removeItem("userPassword");
    sessionStorage.removeItem("userPermitionLevel");
    console.log("Session data cleared.");
    console.log(sessionStorage.getItem("userName"));
}

// Function to set session data
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