//ESCH
// Définition des variables contenant le texte du titre et du paragraphe
document.addEventListener('DOMContentLoaded', () => {
 
    //menu categories
    //fetch('http://localhost:5678/api/categories')
    // Контейнер для меню
    const menuContainer = document.getElementById('menu-category');

        // Функция для создания кнопок меню
        function createMenuButtons(categories) {
            // Очищаем контейнер меню
            menuContainer.innerHTML = '';

            const button = document.createElement('button');
            button.className = 'menu-button';
            button.innerText = 'Tous';
            button.id = `menu-item-Tous`;
            menuContainer.appendChild(button);
           // buttons pour chaque category
            categories.forEach(category => {
                const button = document.createElement('button');
                button.className = 'menu-button';
                button.innerText = category.name;
                button.id = `menu-item-${category.id}`;
                menuContainer.appendChild(button);
            });
        }

        // Асинхронная функция для получения данных из API
        async function fetchMenu() {
            try {
                // Запрос к API
                const response = await fetch('http://localhost:5678/api/categories');
                // Проверяем, что ответ успешный (статус 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Преобразуем ответ в JSON
                const data = await response.json();
                // Создаем кнопки меню с полученными данными
                createMenuButtons(data);
            } catch (error) {
                // В случае ошибки, выводим сообщение
                menuContainer.innerHTML = 'Failed to load menu';
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    
    fetchMenu();
    

    //Works
    fetch('http://localhost:5678/api/works')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        
/*         const reponse = await fetch("http://localhost:5678/api/works");
        const data = await reponse.json();
 */
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
  