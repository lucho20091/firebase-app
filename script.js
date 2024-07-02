import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {  getAuth, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged   } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyCWiKCdvpT65gHcrsuYdb4L76a4ApE360g",
  authDomain: "moody-b1a77.firebaseapp.com",
  projectId: "moody-b1a77",
  storageBucket: "moody-b1a77.appspot.com",
  messagingSenderId: "784312620908",
  appId: "1:784312620908:web:23d9718bfe97f49bb58549"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(auth)
console.log(app.options.projectId)



/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn") 

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)
/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        console.log("Sign in with email and password")
      })
      .catch((error) =>{
        console.log(error)
      })

}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value 
    const password = passwordInputEl.value 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        clearAuthFields() 
        console.log(userCredential)
        console.log("Sign up with email and password")
      })
      .catch((error) => {
        console.log(error)
      })
}

function authSignOut(){
  signOut(auth)
    .then(() => {
      clearAuthFields() 
    })
    .catch(error => {
      console.log(error)
    })
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView()
    console.log(user)
  } else {
    showLoggedOutView()
  }
});



/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}