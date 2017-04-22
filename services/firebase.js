
import firebase from "firebase";

const config = {
  apiKey: "",
  authDomain: "exhibitordeck.firebaseapp.com",
  databaseURL: "https://exhibitordeck.firebaseio.com",
  storageBucket: "exhibitordeck.appspot.com",
  messagingSenderId: ""
};

firebase.initializeApp(config);

export signin = function(token)
{
  firebase.auth().signInWithCustomToken(token).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });


}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}


export default firebase;
