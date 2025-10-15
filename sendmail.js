const form = document.querySelector('form');

function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "bcbnord@gmail.com",
        Password: "E944508F1E11A83E0F7135F219698BC0491D",
        To: 'webcaliskan@gmail.com',
        From: "webcaliskan@gmail.com",
        Subject: "Nouveau message de " + document.getElementById("name").value,
        //récupérer les valeurs des champs du formulaire
        Body: "Nom: " + document.getElementById("name").value
            + "<br>Email: " + document.getElementById("emailid").value
            + "<br>Téléphone: " + document.getElementById("telephone").value
            + "<br>Message: " + document.getElementById("message").value
    }).then(
        message => alert("Mail envoyé avec succès")
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});