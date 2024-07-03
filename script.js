import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {  getAuth, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged,
          GoogleAuthProvider,
          signInWithPopup,
          updateProfile    } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyCWiKCdvpT65gHcrsuYdb4L76a4ApE360g",
  authDomain: "moody-b1a77.firebaseapp.com",
  projectId: "moody-b1a77",
  storageBucket: "moody-b1a77.appspot.com",
  messagingSenderId: "784312620908",
  appId: "1:784312620908:web:23d9718bfe97f49bb58549"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

console.log(db)
/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const updateProfileButtonEl = document.getElementById("update-profile-btn")

const editProfileButtonEl = document.getElementById("edit-profile")
const updateProfileEl = document.getElementById("update-profile")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

updateProfileButtonEl.addEventListener("click", authUpdateProfile)

editProfileButtonEl.addEventListener("click", showEdit)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user) 
    } else {
        showLoggedOutView() 
    }
})

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Signed in with Google")
        }).catch((error) => {
            console.error(error.message)
        })
}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message) 
        })
}

function authSignOut() {
    signOut(auth)
        .then(() => {
        }).catch((error) => {
            console.error(error.message)
        })
}

function authUpdateProfile() {
    const newDisplayName = displayNameInputEl.value
    const newPhotoURL = photoURLInputEl.value
    
    updateProfile(auth.currentUser, {
            displayName: newDisplayName,
            photoURL: newPhotoURL
        }).then(() => {
            console.log("Profile updated")
        }).catch((error) => {
            console.error(error.message)
        })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex" 
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}

function showProfilePicture(imgElement, user) {
    const photoURL = user.photoURL
    
    if (photoURL) {
        imgElement.src = photoURL
    } else {
        imgElement.src = "assets/images/default-profile-picture.jpeg"
    }
}

function showUserGreeting(element, user) {
    const displayName = user.displayName
    
    if (displayName) {
        const userFirstName = displayName.split(" ")[0]
        
        element.textContent = `Hey ${userFirstName}, how are you?`
    } else {
        element.textContent = `Hey friend, how are you?`
    }
}

function showEdit(){
    updateProfileEl.classList.toggle("hide")
}