let config = {
    apiKey: "AIzaSyDri8q3MahSUbD9CSQSPOwOC0luqwOhVrI",
    authDomain: "userinformation-7b965.firebaseapp.com",
    databaseURL: "https://userinformation-7b965.firebaseio.com",
    projectId: "userinformation-7b965",
    storageBucket: "userinformation-7b965.appspot.com",
    messagingSenderId: "461132025771"
};

firebase.initializeApp(config);

let db = firebase.firestore()

//sbmt btn sends info to data base
document.getElementById('registerSubmit').addEventListener('click', e => {
    e.preventDefault()

    let name = document.getElementById('userName').value
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value


    let id = db.collection('users').doc().id
    db.collection('users').doc(id).set({
        User: name,
        Email: email,
        Password: password,
    })
    // document.getElementById('userName').value = ''
    // document.getElementById('inputEmail').value = ''
    // document.getElementById('inputPassword').value = ''
    displayContainer()

})

displayContainer = () => {
document.querySelector('.inputContainer').setAttribute('style', 'display:none')
document.querySelector('.userInfo').setAttribute('style','display: " " ')
}