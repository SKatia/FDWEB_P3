//ESCH
// Définition des variables contenant le texte du titre et du paragraphe
document.addEventListener('DOMContentLoaded', () => {
/*     let contenuImg = "assets/images/abajour-tahina.png";
    let contenuTitre = "Abajour Tahina";
 */  
/*     let figure = `
        <figure>
            <img ${contenuImg}>
            <figcaption>${contenuTitre}</figcaption>
        </figure>
    `;
    let gallery = document.querySelector("div.gallery");
    //gallery.innerHTML = figure;
    //gallery.appendChild(figure) 
  
 */

 /*    // Création d'un div avec createElement. Dans cette figure, on va créer un titre fogcaption et un image img
    let nouvelleFigure = document.createElement("figure")
    let nouveauImg = document.createElement("img")
    let nouveauTitre = document.createElement("figcaption")

    // On ajoute du texte dans le titre et l'image'
    nouveauTitre.textContent = contenuTitre
    nouveauImg.src = contenuImg;
    nouveauImg.alt = contenuTitre;

    // On ajoute le titre et le paragraphe dans la div
    nouvelleFigure.appendChild(nouveauImg)
    nouvelleFigure.appendChild(nouveauTitre)

    // On ajoute la figure dans la galerie
    let gallery = document.querySelector("div.gallery");
    gallery.appendChild(nouvelleFigure) 
 */
 
    //menu categories
    fetch('http://localhost:5678/api/categories')
    // Контейнер для меню
    const menuContainer = document.getElementById('category');

    // Buttons
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'menu-button';
        button.innerText = item.name;
        button.id = `menu-item-${item.id}`;
        menuContainer.appendChild(button);
    });

    fetch('http://localhost:5678/api/works')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let gallery = document.querySelector("div.gallery");

        data.forEach(work => {
            let nouvelleFigure = document.createElement("figure");
            let nouveauImg = document.createElement("img");
            let nouveauTitre = document.createElement("figcaption");

            // Définir les attributs et le contenu
            nouveauImg.src = work.imageUrl; // Assurez-vous que 'imageUrl' est le bon champ dans vos données
            nouveauImg.alt = work.title;   // Assurez-vous que 'title' est le bon champ dans vos données
            nouveauTitre.textContent = work.title; // Assurez-vous que 'title' est le bon champ dans vos données

            // Ajouter l'image et la légende à la figure
            nouvelleFigure.appendChild(nouveauImg);
            nouvelleFigure.appendChild(nouveauTitre);

            // Ajouter la figure dans la galerie
            gallery.appendChild(nouvelleFigure);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch :', error);
    });
});
  