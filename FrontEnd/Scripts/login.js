document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        // Envoi de la requête POST avec les données de connexion
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email, password: password })
        });

        // Conversion de la réponse en JSON
        const data = await response.json();
        console.log(data.token);
        console.log(data.userId);
        console.log(data.message);
        console.log(data.error);

        if (data.userId) {  //user Id est rècuperé
            // Enregistrement du jeton dans le localStorage
            localStorage.setItem('authToken', data.token);
            // Redirection vers la page d'accueil en cas de succès
            window.location.href = './index.html';
            console.log(data.token);
        } else {
            // Affichage du message d'erreur en cas d'échec de la connexion
            errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        // Affichage du message d'erreur en cas de problème avec la requête
        console.error('Erreur:', error);
        errorMessage.textContent = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.';
        errorMessage.style.display = 'block';
    }
});
