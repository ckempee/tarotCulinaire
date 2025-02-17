// Contenu de script1.js
let selectedCards = 0;

function moveCard(card) {
    if (selectedCards < 3) {
        selectedCards++;

        const newCard = card.cloneNode(true);
        newCard.style.transform = 'rotateY(180deg)';
        newCard.style.position = 'absolute';
        newCard.style.transition = 'transform 0.6s ease';
        newCard.classList.add('newCard');
      
        const destination = document.getElementById(`choisie${selectedCards}`);
        destination.appendChild(newCard);

        card.style.opacity = '0';
        setTimeout(() => {
            card.style.visibility = 'hidden';
        }, 600);
    }

    if (selectedCards === 3) {
        toggle();
    }
}

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popUp = document.getElementById('popUp');
    popUp.classList.toggle('active');

    // Récupérer uniquement les 3 cartes choisies
    const chosenCards = document.querySelectorAll('.carteChoisie');
    const popupContent = document.getElementById('popUp');
    popupContent.innerHTML = ''; // Effacer le contenu précédent de la pop-up
    
    chosenCards.forEach((card, index) => {
        const cardName = card.id; // Récupérer le nom de la carte
        const cardSignification = card.dataset.signification; // Récupérer la signification de la carte

        const paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong>Carte ${index + 1} (${cardName}):</strong> ${cardSignification}`;
        popupContent.appendChild(paragraph);
    });
}

// Fonction pour recommencer
function restart() {
    location.reload();
}

// Contenu de script2.js
window.addEventListener('DOMContentLoaded', (event) => {
    const cartes = [
        {
            nom: 'Le Soleil',
            image: 'sun.jpg',
            signification: 'joie, bonheur, succès'
        },
        {
            nom: "L'Amoureux",
            image: 'lover.jpg',
            signification: 'amour, relation, choix'
        },
        {
            nom: 'La Mort',
            image: 'mort.jpg',
            signification: 'transformation, changement, renouveau'
        }
    ,
    {
        nom: "L'étoile",
        image: 'star.jpg',
        signification: 'transformation, changement, renouveau'
    },
    {
        nom: "La roue de fortune",
        image: 'rouefortune.jpg',
        signification: 'transformation, changement, renouveau'
    },
    {
        nom: "Le diable",
        image: 'diable.jpg',
        signification: 'transformation, changement, renouveau'
    },
    {
        nom: "Le pendu",
        image: 'pendu.jpg',
        signification: 'transformation, changement, renouveau'
    },
    {
        nom: 'Le Soleil',
        image: 'sun.jpg',
        signification: 'joie, bonheur, succès'
    },
    {
        nom: "L'Amoureux",
        image: 'lover.jpg',
        signification: 'amour, relation, choix'
    },
    {
        nom: 'La Mort',
        image: 'mort.jpg',
        signification: 'transformation, changement, renouveau'
    }
,
{
    nom: "L'étoile",
    image: 'star.jpg',
    signification: 'transformation, changement, renouveau'
},
{
    nom: "La roue de fortune",
    image: 'rouefortune.jpg',
    signification: 'transformation, changement, renouveau'
},
{
    nom: "Le diable",
    image: 'diable.jpg',
    signification: 'transformation, changement, renouveau'
},
{
    nom: "Le pendu",
    image: 'pendu.jpg',
    signification: 'transformation, changement, renouveau'
},
{
    nom: 'Le Soleil',
    image: 'sun.jpg',
    signification: 'joie, bonheur, succès'
},
{
    nom: "L'Amoureux",
    image: 'lover.jpg',
    signification: 'amour, relation, choix'
},
{
    nom: 'La Mort',
    image: 'mort.jpg',
    signification: 'transformation, changement, renouveau'
}
,
{
nom: "L'étoile",
image: 'star.jpg',
signification: 'transformation, changement, renouveau'
},
{
nom: "La roue de fortune",
image: 'rouefortune.jpg',
signification: 'transformation, changement, renouveau'
},
{
nom: "Le diable",
image: 'diable.jpg',
signification: 'transformation, changement, renouveau'
},
{
nom: "Le pendu",
image: 'pendu.jpg',
signification: 'transformation, changement, renouveau'
},
{
nom: "Le pendu",
image: 'pendu.jpg',
signification: 'transformation, changement, renouveau'
}
    ];

    const fronts = document.querySelectorAll('.carte');
    fronts.forEach((front, index) => {
        const randomIndex = Math.floor(Math.random() * cartes.length);
        const randomCard = cartes.splice(randomIndex, 1)[0]; // Retire l'image sélectionnée du tableau pour éviter les doublons
        front.src = randomCard.image;
        front.id = `carte-${index + 1}`; // Attribution d'un ID unique à chaque carte choisie
        front.dataset.signification = randomCard.signification; // Attribution de la signification à chaque carte choisie
    });
});
