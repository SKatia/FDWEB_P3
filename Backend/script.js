//ESCH

//document.addEventListener('DOMContentLoaded', () => {

    const gallery = document.querySelector('div.gallery');
    const menuContainer = document.getElementById('menu-category');
    const modal = document.getElementById('myModal');
    const modalGallery = document.getElementById('modal-gallery');
    const modalGalleryView = document.getElementById('modal-gallery-view');
    const modalAddPhotoView = document.getElementById('modal-add-photo-view');
    const changeGallery = document.getElementById('lien-modification');
    const btnCloseModal = document.getElementsByClassName('close')[0];
    const openAddPhotoBtn = document.getElementById('open-add-photo-btn');
    const backToGalleryIcon = document.getElementById('back-to-gallery-icon');
    const photoUploadForm = document.getElementById('photo-upload-form');
    const photoCategorySelect = document.getElementById('photo-category');
    const fileInput = document.getElementById('imageUrl');
    const zonePreviewImage = document.getElementById('zone-ajout-image')
    //const NoImage = document.getElementById('no-image')
    //const OuiImage = document.getElementById('oui-image')
    const ajoutFileLabel = document.querySelector('.custom-file-upload');

    //кастомизация выбора файла изображения
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const fileName = file ? file.name : 'Ajouter Photo';
        ajoutFileLabel.textContent = fileName;

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                zonePreviewImage.innerHTML = `<img src="${e.target.result}" alt="Work Preview">`;
                // NoImage.style.display = 'none';
                // OuiImage.style.display = 'block'
                // const workPreviewImg = document.getElementById('workPreview');
                // workPreviewImg.src = e.target.result;
                // workPreviewImg.alt = fileName; // Обновление атрибута alt
                };
            reader.readAsDataURL(file);
        } else {
            zonePreviewImage.innerHTML = '';
        }
    });
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

        // Remplir le sélecteur de catégorie dans le formulaire d'ajout de photo
        populateCategorySelect(categories);
}

    // Fonction pour remplir le sélecteur de catégorie
    function populateCategorySelect(categories) {
        if (!photoCategorySelect) return;
        photoCategorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            photoCategorySelect.appendChild(option);
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

    // Fonction pour afficher works (gallerie page d'accueil)
    function displayWorks(works) {
        // On vide le conteneur des œuvres
        gallery.innerHTML = '';

        // On crée des éléments pour chaque œuvre
        works.forEach(work => {
            let nouvelleFigure = document.createElement("figure");
            nouvelleFigure.classList.add('gallery-item');
            nouvelleFigure.dataset.id = work.id; // Ajouter l'ID comme attribut de données

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
        console.log('загрузка галереи');
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
                cartIcon.dataset.id = work.id; // Ajouter l'ID comme attribut de données

                galleryItem.appendChild(image);
                galleryItem.appendChild(cartIcon);
                modalGallery.appendChild(galleryItem);
            });

            // icons de suppression
            const cartIcons = document.querySelectorAll('.cart-icon');
            cartIcons.forEach(icon => {
                icon.addEventListener('click', async (event) => {
                    const workId = event.target.dataset.id;
                    await deleteWork(workId);
                    
                    // Suppression element parent de gallerie sans recharger les pages
                    event.target.parentElement.remove(); 
                    const mainGalleryItem = document.querySelector(`.gallery-item[data-id="${workId}"]`);
                    if (mainGalleryItem) {
                        mainGalleryItem.remove();
                    }                
                });

            });
        } catch (error) {
            console.error('Erreur lors du chargement des travaux :', error);
        }
    }

    //fonction de suppresion des ouvres/works
    async function deleteWork(workId) {
        const authToken = localStorage.getItem('authToken'); // token de localStorage
        try {
            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du travail ' + response.statusText);
            }
            console.log('Work deleted successfully');
        } catch (error) {
            console.error('Erreur lors de la suppression du travail :', error);
        }
    }

    // Ouvrir la vue Ajout Photo
    openAddPhotoBtn.addEventListener('click', () => {
        modalGalleryView.style.display = 'none';
        modalAddPhotoView.style.display = 'block';
    });

    // Retourner à la vue Galerie Photo
    backToGalleryIcon.addEventListener('click', () => {
        modalAddPhotoView.style.display = 'none';
        modalGalleryView.style.display = 'block';
        // fileInput.value = '';

    });

    // Gestion du formulaire d'upload de photo
    photoUploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');
        // const formData = new FormData(photoUploadForm);
    
        const titleInput = document.getElementById('title');
        const categoryInput = document.getElementById('photo-category');
        const formData = new FormData();

        formData.append('title', titleInput.value);
        formData.append('category', parseInt(categoryInput.value)); // Conversion du code de la catégorie en entier
 
        formData.append('image',fileInput.files[0]);

        // const userId = localStorage.getItem('userId');
        // if (userId) {
        //     formData.append('userId', userId);
        // }
        
        // Вывод содержимого FormData в консоль
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

            try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Erreur lors de l\'upload de la photo ' + response.statusText);
            }

            // Очистка поля выбора файла после успешной загрузки
            fileInput.value = '';
            // Après l'upload réussi, retourner à la vue Galerie Photo
            modalAddPhotoView.style.display = 'none';
            modalGalleryView.style.display = 'block';
            // Réinitialiser le formulaire et revenir à la vue de la galerie
            photoUploadForm.reset();
            //**************заменить 
            chargerGalerieModal(); // Rafraîchir la galerie
            //**************** */
        } catch (error) {
            console.error('Erreur lors de l\'upload de la photo :', error);
        }
    });

    changeGallery.addEventListener('click', () => {
        modal.style.display = "block";
        chargerGalerieModal()
    });

    // Lorsque l'utilisateur clique sur <span> (x), fermez le modal
    btnCloseModal.onclick = function () {
        modal.style.display = "none";
        modalAddPhotoView.style.display = 'none';
        modalGalleryView.style.display = 'block';
        filterWorksByCategory("*")
    }

    // Lorsque l'utilisateur clique n'importe où en dehors du modal, fermez-le
    window.onclick = function (event) {
        if (event.target === modal) {
            modalAddPhotoView.style.display = 'none';
            modalGalleryView.style.display = 'block';
            modal.style.display = "none";
            filterWorksByCategory("*")
        }
    }

            // fileInput.addEventListener('change', (event) => {
            //     const file = event.target.files[0];
            //     const fileName = file ? file.name : 'Ajouter Photo';
            //     customLabel.textContent = fileName;

            //     if (file) {
            //         const reader = new FileReader();
            //         reader.onload = function(e) {
            //             preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
            //         };
            //         reader.readAsDataURL(file);
            //     } else {
            //         preview.innerHTML = '';
            //     }
            // });
//});