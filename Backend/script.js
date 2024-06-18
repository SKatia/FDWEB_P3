//ESCH

//document.addEventListener('DOMContentLoaded', () => {

    const gallery = document.querySelector('div.gallery');
    const menuContainer = document.getElementById('menu-category');
    const modal = document.getElementById('myModal');
    const modalGallery = document.getElementById('modal-gallery');
    const changeGallery = document.getElementById('lien-modification');
    const btnCloseModal = document.getElementsByClassName('close')[0];

    //***********FONCTIONS**************

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

    // Définition des variables 
    //let gallery = document.querySelector("div.gallery");

    //menu categories
    //const menuContainer = document.getElementById('menu-category');

    // Chargement initial
    fetchMenu();
    filterWorksByCategory("*")

    // Vérification de l'authentification
    // window.onload = function() {
    // Fonction pour vérifier l'authentification
    function checkAuthentication() {
        const authToken = localStorage.getItem('authToken');
        const authLink = document.getElementById('auth-link');
        const modification = document.getElementById('lien-modification');
        const barModification = document.getElementById('mode-edition');
        const menu_category = document.getElementById('menu-category');

        if (authToken) {
            // Utilisateur connecté
            authLink.innerHTML = '<a href="#" id="logout-link">logout</a>';
            modification.style.display = 'inline';
            barModification.style.display = 'block';
            menu_category.style.display = 'none';

            // Gestion du clic sur le lien de déconnexion
            document.getElementById('logout-link').addEventListener('click', function (event) {
                event.preventDefault();
                localStorage.removeItem('authToken');
                authLink.innerHTML = '<a href="login.html">login</a>';
                modification.style.display = 'none';
                barModification.style.display = 'none';
                menu_category.style.display = 'flex';
                checkAuthentication(); // Re-check authentication after logging out
                //const errorMessage = document.getElementById('error-message');
                //    window.location.href = 'login.html';
            });
        } else {
            // Utilisateur non connecté
            modification.style.display = 'none';
            barModification.style.display = 'none';
            menu_category.style.display = 'flex';
            authLink.innerHTML = '<a href="login.html">login</a>';
        };
    };

    // Vérification de l'authentification au chargement de la page
    checkAuthentication();

    // ***********Gestion du modal

    async function chargerGalerieModal() {
        console.log('загрузка галереи')
        // Vider la galerie avant d'ajouter les nouvelles images
        modalGallery.innerHTML = '';
        try {
            const response = await fetch('http://localhost:5678/api/works');
            const works = await response.json();


            works.forEach(work => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const image = document.createElement('img');
                const cartIcon = document.createElement('i');

                image.src = work.imageUrl; // l'URL de l'image
                image.alt = work.title;

                // Ajouter l'icône du panier
                cartIcon.className = 'fa-solid fa-trash-can cart-icon';

                // modalGallery.appendChild(image);
                // modalGallery.appendChild(cartIcon);

                galleryItem.appendChild(image);
                galleryItem.appendChild(cartIcon);
                modalGallery.appendChild(galleryItem);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des travaux :', error);
        }
    }
    // Obtenez l'élément modal
    //const modal = document.getElementById("myModal");

    // Obtenez le bouton qui ouvre le modal
    //const btn = document.getElementById("modification");
    //const btn = document.getElementById("openModalBtn");

    // Obtenez l'élément <span> qui ferme le modal
    //const span = document.getElementsByClassName("close")[0];

    changeGallery.addEventListener('click', () => {
        modal.style.display = "block";
        chargerGalerieModal()
    });

    // Lorsque l'utilisateur clique sur <span> (x), fermez le modal
    btnCloseModal.onclick = function () {
        modal.style.display = "none";
    }

    // Lorsque l'utilisateur clique n'importe où en dehors du modal, fermez-le
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

//});