//ESCH
// Définition des variables contenant le texte du titre et du paragraphe
document.addEventListener('DOMContentLoaded', () => {
    let contenuImg = "assets/images/abajour-tahina.png";
    let contenuTitre = "Abajour Tahina";
  
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

    // Création d'un div avec createElement. Dans cette div, on va créer un titre h1 et un paragraphe p
    let nouvelleFigure = document.createElement("figure")
    let nouveauImg = document.createElement("img")
    let nouveauTitre = document.createElement("figcaption")

    // On ajoute du texte dans le titre et le paragraphe
    nouveauTitre.textContent = contenuTitre
    nouveauImg.src = contenuImg;
    nouveauImg.alt = contenuTitre;

    // On ajoute le titre et le paragraphe dans la div
    nouvelleFigure.appendChild(nouveauImg)
    nouvelleFigure.appendChild(nouveauTitre)

    // On ajoute la figure dans la galerie
    let gallery = document.querySelector("div.gallery");
    gallery.appendChild(nouvelleFigure) 
});
  