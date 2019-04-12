const config = {
    apiKey: "AIzaSyDri8q3MahSUbD9CSQSPOwOC0luqwOhVrI",
    authDomain: "userinformation-7b965.firebaseapp.com",
    databaseURL: "https://userinformation-7b965.firebaseio.com",
    projectId: "userinformation-7b965",
    storageBucket: "userinformation-7b965.appspot.com",
    // messagingSenderId: "461132025771"
};
firebase.initializeApp(config);

// Get Elements from the DOM
const txtEmail = document.getElementById('inputEmail')
const txtPassword = document.getElementById('inputPassword')
const signInEmail = document.getElementById('modalEmail')
const signInPass = document.getElementById('modalPassword')
const signUpBtn = document.getElementById('registerSubmit')
const logInBtn = document.getElementById('logInBtn')

// // Add signup event
// signUpBtn.addEventListener('click', e=> {
//     e.preventDefault();
//     // Get email and password
//     const email = txtEmail.value;
//     const password = txtPassword.value;
//     const auth = firebase.auth();
//     // sign up 
//     const promise = auth.createUserWithEmailAndPassword(email, password);
//     promise.catch(e => console.log(e.message));
// });

// Add signIn Event

logInBtn.addEventListener('click', e => {
    // e.preventDefault();
    // Get email and password
    const email = signInEmail.value;
    const password = signInPass.value;
    const auth = firebase.auth();
    // sign up 
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.then(e => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }).catch(e => console.log(e.message));
});

// Add signout event
// document.querySelector('.signOut').addEventListener('click', e => {
//     firebase.auth().signOut();
//     document.querySelector('.signOut').style["display"] = 'none';
//     document.querySelector('.signInUp').style.display = '';
// })

// Add a realtime listener//pass through callback function to show every state changes. 
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        window.sessionStorage.setItem("loggedIn", true);
        document.querySelector('.signOut').style["display"] = '';
        document.querySelector('.signInUp').style.display = 'none';
    } else {
        console.log('not logged in');
    }
});

// Add persistence

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(function() {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
// });




// let db = firebase.firestore()

//sbmt btn sends info to data base
// document.getElementById('registerSubmit').addEventListener('click', e => {
//     e.preventDefault()

    // .trim()?
    // let name = document.getElementById('userName').value
    // let email = document.getElementById('inputEmail').value
    // let password = document.getElementById('inputPassword').value
    // let id = db.collection('users').doc().id

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .catch(function(error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     if (errorCode == 'auth/weak-password') {
    //         alert('The password is too weak.');
    //     }
    //     else {
    //         alert(errorMessage);
    //     }
    // })


    // db.collection('users').doc(id).set({
    //     User: name,
    //     Email: email,
    //     Password: password,
    // })
    // document.getElementById('userName').value = ''
    // document.getElementById('inputEmail').value = ''
    // document.getElementById('inputPassword').value = ''
//     displayContainer()

// })




// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         let str = document.querySelector('.signInUp').innerHTML;
//         let res = str.replace("Sign In", "Sign Out");
//         document.querySelector(".signInUp").innerHTML = res;
//     }
// })

// firebase.auth().signOut().then(function(){
//     console.log('success')
// }).catch(function (error) {

// });

// displayContainer = () => {
// document.querySelector('.inputContainer').setAttribute('style', 'display:none')
// document.querySelector('.userInfo').setAttribute('style','display: " " ')
// }