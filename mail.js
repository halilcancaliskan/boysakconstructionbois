const firebaseConfig = {
    apiKey: "AIzaSyCBV9hlV7BgodCKQFc1rmJ_uZp8fGRd_Zk",
    authDomain: "boysakconstructionbois-4ddb8.firebaseapp.com",
    databaseURL: "https://boysakconstructionbois-4ddb8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "boysakconstructionbois-4ddb8",
    storageBucket: "boysakconstructionbois-4ddb8.appspot.com",
    messagingSenderId: "313161485766",
    appId: "1:313161485766:web:9d8f08cf777ec38f03f6c7",
    measurementId: "G-94HQEEKQJ2"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var telephone = getElementVal("telephone");
    var msgContent = getElementVal("message");

    saveMessages(name, emailid, telephone, msgContent);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, telephone, msgContent) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        name: name,
        emailid: emailid,
        telephone: telephone,
        msgContent: msgContent,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};