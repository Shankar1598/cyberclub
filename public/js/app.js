// Initialize Firebase

(function () {
  var config = {
    apiKey: "AIzaSyBZpS90In5pBvGJQJ9RbLrcNO1y_AvYlfg",
    authDomain: "cyberclub-84603.firebaseapp.com",
    databaseURL: "https://cyberclub-84603.firebaseio.com",
    projectId: "cyberclub-84603",
    storageBucket: "",
    messagingSenderId: "402508135066"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // alert("changeig")
      document.getElementById("userBtn").classList.remove("hidden");
      document.getElementById("loginBtn").classList.add("hidden");
      document.getElementById("sign-out").classList.remove("hidden");
    } else {
      // No user is signed in.
    }
  });

}());

function loginWithEmail() {
  var emailText = document.getElementById("email").value;
  // console.log(emailText);
  var passwordText = document.getElementById("password").value;

  var promiss = firebase.auth().signInWithEmailAndPassword(emailText, passwordText)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      if(errorCode=="auth/user-not-found"){
        alert("User not found! SignUp first.");
      }else if(errorCode=="auth/invalid-email"){
        alert("Enter a valid e-mail")
      }
    })
    .then(function (user) {
      // console.log(user);
    });
}

function googleLogIn() {
  console.log("called...");
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    loginSuccess();
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorMessage);
    // ...
  });
}

function facebookLogIn() {
  // alert("called");
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {

    var token = result.credential.accessToken;

    var user = result.user;
    console.log(user);
    loginSuccess();
  }).catch(function (error) {

    var errorCode = error.code;
    var errorMessage = error.message;

    var email = error.email;

    var credential = error.credential;

  });
}

function gitHubLogIn() {
  var provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {

    var token = result.credential.accessToken;

    var user = result.user;
    console.log(user);
    loginSuccess();
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    console.log(errorMessage);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function loginSuccess() {
  window.location="index.html";
}

function userSpace() {
  window.location="userspace.html"
}

function login(){
  window.location="login.html";
}

function signupWithEmail(){
  location.href="signup.html";
}

function signOutCall(){
  // alert("fun call")
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    document.getElementById("userBtn").classList.add("hidden");
    document.getElementById("loginBtn").classList.remove("hidden");
    document.getElementById("sign-out").classList.add("hidden");
  }).catch(function(error) {
    // An error happened.
    console.log("didnt sign out")
  });
}

function SignUp(){

  alert("signing up");
  email=validateEmail(document.getElementById("email").value);
  password=document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  alert("success");

  loginSuccess();
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}