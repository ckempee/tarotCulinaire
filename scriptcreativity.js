// script.js
//sk-proj-SzndVpPFodBKE0GShgd4T3BlbkFJqGAvcF6CErevYbaEjbEL= api

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
// fonction chatgpt qui me permet de générer un texte en lui donnant mes 3 cartes yeaaaaaah
async function getChatGPTInterpretation(cards) {
    showLoadingBalls();
    const apiKey = 'sk-proj-SzndVpPFodBKE0GShgd4T3BlbkFJqGAvcF6CErevYbaEjbEL';
    const url = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        {"role": "system", "content": "Tu es un assistant utile pour l'interprétation des tarots culinaires pour un tirage créatif."},
        {"role": "user", "content": `Voici trois cartes de tarot culinaire avec leurs significations :
1. ${cards[0].nom} : ${cards[0].signification}
2. ${cards[1].nom} : ${cards[1].signification}
3. ${cards[2].nom} : ${cards[2].signification}
        
Fournis une idée culinaire créative, originale et personnalisée de ces trois cartes en faisant des liens entre elles. Par exemple un genre de plat que la personne pourrait tester. 
Il s'agit d'une tirage de créativité, c'est-à-dire: Ce tirage encourage à explorer de nouvelles idées culinaires, à briser la routine des repas habituels, à stimuler votre imagination et à expérimenter des saveurs uniques et nouvelles. Les cartes agissent comme des déclencheurs pour débloquer votre créativité culinaire et vous aider à accéder à des recettes originales et des combinaisons de saveurs inattendues. Amusez-vous!.
Je veux que tu fasses comme si c'était moi qui parlait afin que les gens ne se doutent pas qu'il s'agit d'un texte généré par chatgpt donc pas de 'bien sur' etc. 
Je veux aussi que tu ne coupe pas le texte au milieu d'une phrase.
je te donne également une liste d'aliment pour les cartes du tarot desquelles tu peux t'inspirer:
Le Bateleur : Cette carte représente la créativité et le pouvoir de manifestation. Les aliments associés pourraient être des ingrédients polyvalents et inspirants tels que le citron, l'ail, les herbes fraîches et les épices aromatiques.

La Papesse : Symbole de sagesse et de connaissance intuitive. Les aliments associés pourraient être des superaliments riches en nutriments tels que les baies, les graines de chia, les épinards, et les algues marines.

L'Impératrice : Représentant la fertilité et l'abondance. Les aliments associés pourraient être des fruits et légumes de saison, des herbes aromatiques fraîches, les œufs, et les produits laitiers.

L'Empereur : Symbolisant le contrôle et la structure. Les aliments associés pourraient être des plats traditionnels et réconfortants tels que les ragoûts, les potées, les pommes de terre, et les viandes rôties.

Le Pape : Représentant la tradition et la spiritualité. Les aliments associés pourraient être des plats de cuisine régionale et des recettes ancestrales transmises de génération en génération.

L'Amoureux : Symbole de l'amour et des choix. Les aliments associés pourraient être des douceurs romantiques comme le chocolat, les fraises, les figues, et les fruits exotiques.

Le Chariot : Représentant la maîtrise de soi et le mouvement. Les aliments associés pourraient être des collations énergétiques et des plats adaptés aux déplacements tels que les barres de céréales, les fruits secs, et les salades fraîches.

La Justice : Symbole d'équilibre et de responsabilité. Les aliments associés pourraient être des repas équilibrés et nutritifs composés de légumes verts, de céréales complètes, et de protéines maigres.

L'Ermite : Représentant la sagesse intérieure et la réflexion. Les aliments associés pourraient être des aliments réconfortants et apaisants tels que les soupes, les tisanes, et les plats mijotés.

La Roue de Fortune : Symbole du changement et du cycle de la vie. Les aliments associés pourraient être des plats saisonniers et des recettes qui célèbrent la diversité des ingrédients disponibles tout au long de l'année.

La Force : Représentant le courage et la persévérance. Les aliments associés pourraient être des plats épicés et audacieux tels que les curry, les plats mexicains, et les marinades savoureuses.

Le Pendu : Symbole de sacrifice et de lâcher-prise. Les aliments associés pourraient être des plats légers et digestes tels que les salades fraîches, les smoothies verts, et les plats végétariens.

La Mort : Représentant la transformation et le renouveau. Les aliments associés pourraient être des plats de saison qui célèbrent la fin d'un cycle et le début d'un nouveau, tels que les plats d'automne riches en saveurs.

La Tempérance : Symbole de l'équilibre et de la modération. Les aliments associés pourraient être des plats équilibrés et harmonieux qui mettent en valeur les saveurs naturelles des ingrédients.

Le Diable : Représentant les désirs terrestres et les tentations. Les aliments associés pourraient être des plats riches et indulgents tels que les desserts au chocolat, les plats frits, et les aliments confort.

La Maison-Dieu (La Tour) : Symbole de la destruction et de la libération. Les aliments associés pourraient être des plats réconfortants et revigorants qui apportent du réconfort en période de crise, tels que les soupes réconfortantes et les plats réconfortants.

L'Étoile : Représentant l'inspiration et l'espoir. Les aliments associés pourraient être des plats lumineux et revitalisants tels que les salades de fruits frais, les smoothies, et les plats méditerranéens.

La Lune : Symbole de l'intuition et de l'imagination. Les aliments associés pourraient être des plats oniriques et mystérieux tels que les desserts à base de fruits de mer, les plats de poisson, et les recettes à base de riz.

Le Soleil : Représentant la joie et la vitalité. Les aliments associés pourraient être des plats colorés et énergisants tels que les salades de fruits frais, les smoothies verts, et les plats d'été légers.

Le Jugement : Symbole du réveil et de la révélation. Les aliments associés pourraient être des plats de célébration et de renouveau tels que les plats de fête, les desserts festifs, et les recettes spéciales.
`}
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




// Récupérer les éléments des boules de chargement
const balls = document.querySelectorAll('.loading-ball');

// Fonction pour afficher les boules de chargement
function showLoadingBalls() {
    balls.forEach(ball => {
        ball.style.display = 'block';
    });
}

// Fonction pour cacher les boules de chargement
function hideLoadingBalls() {
    balls.forEach(ball => {
        ball.style.display = 'none';
    });
}
