// script.js
//sk-proj-SzndVpPFodBKE0GShgd4T3BlbkFJqGAvcF6CErevYbaEjbEL= api

let selectedCards = 0;

//création d'une fonction qui, a chaque carte choisis, la retourne.
//cette fonction se fait tant qu'on a pas choisit les 3 cartes
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

//fonction toggle qui ferme la fenetre qui s'ouvre quand on clique sur la croix

async function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popUp = document.getElementById('popUp');
    popUp.classList.toggle('active');

    const chosenCards = document.querySelectorAll('.newCard');
    const cards = Array.from(chosenCards).map(card => {
        const frontImg = card.querySelector('.front');
        return {
            nom: frontImg.id,
            signification: frontImg.dataset.signification
        };
    });

    const divInterpretation = document.querySelector('.interpretationCartes');
    if (popUp.classList.contains('active')) {
        divInterpretation.innerHTML = ''; // Clear previous content

        // paragraphe avec un rappel des 3 cartes tirées
        const reminderParagraph = document.createElement('div');
        reminderParagraph.innerHTML = `<strong>Cartes tirées :</strong><br>
        1. ${cards[0].nom} : ${cards[0].signification}<br>
        2. ${cards[1].nom} : ${cards[1].signification}<br>
        3. ${cards[2].nom} : ${cards[2].signification}<br><br>`;
        divInterpretation.appendChild(reminderParagraph);

        // Vérifier s'il y a une interprétation précédemment enregistrée
        const previousInterpretation = localStorage.getItem('tarotInterpretation');
        if (previousInterpretation) {
            const interpretationParagraph = document.createElement('div');
            interpretationParagraph.innerHTML = `<strong>Interprétation :</strong><br>${previousInterpretation}`;
            divInterpretation.appendChild(interpretationParagraph);
        } else {
            try {
                // 1. j'appelle chatgpt
                const interpretation = await getChatGPTInterpretation(cards);

                // j'affiche le pop up
                const interpretationParagraph = document.createElement('div');
                interpretationParagraph.innerHTML = `<strong>Interprétation :</strong><br>${interpretation}`;
                divInterpretation.appendChild(interpretationParagraph);

                // j'enregistre localement l'interprétation fournie par chatgpt 
                localStorage.setItem('tarotInterpretation', interpretation);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'interprétation:', error);
                const errorParagraph = document.createElement('div');
                errorParagraph.innerHTML = `<strong>Erreur :</strong> Impossible de récupérer l'interprétation. Veuillez réessayer plus tard.`;
                divInterpretation.appendChild(errorParagraph);
            }
        }
    } else {
        divInterpretation.innerHTML = '';
    }
}
// fonction chatgpt qui me permet de générer un texte en lui donnant mes 3 cartes yeaaaaaah j'ai réussit!!!
async function getChatGPTInterpretation(cards) {
    showLoadingBalls();
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        {"role": "system", "content": "Tu es un assistant utile pour l'interprétation des tarots culinaires afin de donner des prédictions."},
        {"role": "user", "content": `Voici trois cartes de tarot culinaire avec leurs significations :
1. ${cards[0].nom} : ${cards[0].signification}
2. ${cards[1].nom} : ${cards[1].signification}
3. ${cards[2].nom} : ${cards[2].signification}
        
Lis l'avenir de la personne de manière personnalisée en fonction de ces trois cartes de taot en faisant des liens entre elles. Agis comme une grande voyante ou une grande tireuse de carte qui guide et donne des réponses.
Les cartes, dans l'ordre, corresponde à 'présent, passé, futur' ou à 'Situation - Défi - Évolution'. Je veux que tu fasses comme si c'était moi qui parlait afin que les gens ne se doutent pas qu'il s'agit d'un texte généré par chatgpt donc pas de 'bien sur' etc. 
Je veux aussi que tu ne coupe pas le texte au milieu d'une phrase.`}
    ];

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500
        })
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la communication avec l\'API OpenAI');
    }

    const data = await response.json();
    hideLoadingBalls(); // Cette ligne est déplacée ici pour être exécutée après la réponse de l'API
    return data.choices[0].message.content.trim();
}


// Fonction pour recommencer
function restart() {
    // je supprime l'intérprétation enregistré localement
    localStorage.removeItem('tarotInterpretation');
    // je recharge la page
    location.reload();
}

// Fonction pour supprimer l'interprétation lorsque l'utilisateur quitte la page
window.addEventListener('beforeunload', function(event) {
    localStorage.removeItem('tarotInterpretation');
});




// Récupérer les éléments des 3 points de chargement
const balls = document.querySelectorAll('.loading-ball');

// Fonction pour afficher les 3 petits points de chargement de l'interprétage le temps que chatgpt le fasse
function showLoadingBalls() {
    balls.forEach(ball => {
        ball.style.display = 'block';
    });
}

// Fonction pour cacher les point de chargement une fois que l'interprétation est prête
function hideLoadingBalls() {
    balls.forEach(ball => {
        ball.style.display = 'none';
    });
}
