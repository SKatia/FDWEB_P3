//ESCH
// Définition des variables contenant le texte du titre et du paragraphe

//menu categories
const menuContainer = document.getElementById('menu-category');
let gallery = document.querySelector("div.gallery");

// Fonction pour créer les boutons du menu
function createMenuButtons(categories) {
    // On vide le conteneur du menu
    menuContainer.innerHTML = '';

    const button = document.createElement('button');
    button.className = 'menu-button';
    button.innerText = 'Tous';
    button.id = `menu-item-Tous`;
    button.addEventListener('click', () => filterWorksByCategory('*'));
    menuContainer.appendChild(button);
    // buttons pour chaque category
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'menu-button';
        button.innerText = category.name;
        button.id = `menu-item-${category.id}`;
        button.addEventListener('click', () => filterWorksByCategory(category.id));
        menuContainer.appendChild(button);
    });
}

// Fonction asynchrone pour obtenir les données de l'API
async function fetchMenu() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'était pas correcte ' + response.statusText);
        }
        const data = await response.json();
        createMenuButtons(data);
    } catch (error) {
        menuContainer.innerHTML = 'Failed to load menu';
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Fonction pour afficher works
function displayWorks(works) {
    // On vide le conteneur des œuvres
    gallery.innerHTML = '';

    // On crée des éléments pour chaque œuvre
    works.forEach(work => {
        let nouvelleFigure = document.createElement("figure");
        let nouveauImg = document.createElement("img");
        let nouveauTitre = document.createElement("figcaption");

        // Définir les attributs et le contenu
        nouveauImg.src = work.imageUrl; 
        nouveauImg.alt = work.title;   
        nouveauTitre.textContent = work.title; 

        // Ajouter l'image et la légende à la figure
        nouvelleFigure.appendChild(nouveauImg);
        nouvelleFigure.appendChild(nouveauTitre);

        // Ajouter la figure dans la galerie
        gallery.appendChild(nouvelleFigure);
    });
}

// Fonction pour filtrer les œuvres par catégorie
async function filterWorksByCategory(categoryId) {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        const filteredWorks = works.filter(work => work.categoryId === categoryId);
        if (categoryId == "*") {
            displayWorks(works);
        } else {
            displayWorks(filteredWorks);
        }
    } catch (error) {
        gallery.innerHTML = 'Échec du chargement des œuvres';
        console.error('Il y a eu un problème avec l\'opération fetch:', error);
    }
}

fetchMenu();

//Works
filterWorksByCategory("*")
/*     fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWorks(data)
         })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête fetch :', error);
        });
 */
