// ===========================================
// Decode Google JWT Token
// ===========================================

function parseJwt(token) {

    let base64Url = token.split('.')[1];

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(

        atob(base64)

        .split('')

        .map(function (c) {

            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

        })

        .join('')

    );

    return JSON.parse(jsonPayload);

}


// ===========================================
// Google Login Success
// ===========================================

function handleCredentialResponse(response) {

    console.log("Google Login Success");

    // Decode User Information
    const user = parseJwt(response.credential);

    console.log(user);

    // Hide Login Page
    document.getElementById("loginPage").style.display = "none";

    // Show Home Page
    document.getElementById("homePage").style.display = "block";

    // Profile Image
    document.getElementById("profilePic").src = user.picture;

    // User Name
    document.getElementById("userName").innerHTML = user.name;

    // User Email
    document.getElementById("userEmail").innerHTML = user.email;

    // Welcome Message
    document.getElementById("welcomeText").innerHTML =
        "Hello " + user.name + " 👋";

}


// ===========================================
// Logout
// ===========================================

function logout() {

    google.accounts.id.disableAutoSelect();

    document.getElementById("homePage").style.display = "none";

    document.getElementById("loginPage").style.display = "flex";

}


// ===========================================
// Page Load
// ===========================================

window.onload = function () {

    // Show Login Page
    document.getElementById("loginPage").style.display = "flex";

    // Hide Home Page
    document.getElementById("homePage").style.display = "none";

}


// ===========================================
// Debug (Optional)
// ===========================================

console.log("Student Login Application Loaded Successfully");