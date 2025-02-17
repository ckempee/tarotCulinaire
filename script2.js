

window.addEventListener('DOMContentLoaded', (event) => {
    const fronts = document.querySelectorAll('.front');
    
    var cartes = [
        {
            nom: 'Le Soleil',
            image: './images/sun.jpg',
            signification: 'Joie, clarté, succès, vitalité, optimisme'
        },
        {
            nom: "L'Amoureux",
            image: './images/lover.jpg',
            signification: 'Choix, amour, désir, relation, dualité'
        },
        {
            nom: 'La Mort',
            image: './images/mort.jpg',
            signification: 'Transformation, fin, renouveau, transition, libération'
        }
    ,
    {
        nom: "L'étoile",
        image: './images/star.jpg',
        signification: 'Espoir, inspiration, sérénité, guidance, foi'
    },
    {
        nom: "La roue de fortune",
        image: './images/rouefortune.jpg',
        signification: 'Destin, changement, cycle, opportunité, hasard'
    },
    {
        nom: "Le diable",
        image: './images/diable.jpg',
        signification: 'Attachement, tentation, passion, obsession, pouvoir'
    },
    {
        nom: "Le pendu",
        image: './images/pendu.jpg',
        signification: 'Sacrifice, lâcher-prise, perspective, pause, renoncement'
    },
    {
        nom: 'Le mat',
        image: './images/sun.jpg',
        signification: 'Liberté, aventure, spontanéité, naïveté, insouciance'
    },
    {
        nom: "Le bateleur",
        image: './images/lover.jpg',
        signification: 'Potentiel, initiative, créativité, action, habileté'
    },
    {
        nom: 'La Papesse',
        image: './images/mort.jpg',
        signification: 'Sagesse, intuition, secret, connaissance, introspection'
    }
,
{
    nom: "L'impératrice",
    image: './images/star.jpg',
    signification: 'Fécondité, communication, beauté, abondance, créativité'
},
{
    nom: "L'empereur",
    image: './images/rouefortune.jpg',
    signification: 'Autorité, stabilité, pouvoir, structure, contrôle'
},
{
    nom: "Le pape",
    image: './images/diable.jpg',
    signification: 'Tradition, spiritualité, enseignement, foi, guidance'
},
{
    nom: "Le chariot",
    image: './images/pendu.jpg',
    signification: 'Volonté, succès, détermination, maîtrise, progression'
},
{
    nom: 'La Justice',
    image: './images/sun.jpg',
    signification: 'Équilibre, vérité, loi, responsabilité, intégrité'
},
{
    nom: "L'hermite",
    image: './images/lover.jpg',
    signification: 'agesse, solitude, réflexion, quête intérieure, prudence'
},
{
    nom: 'La Force',
    image: './images/mort.jpg',
    signification: 'Courage, maîtrise de soi, patience, résilience, énergie'
}
,
{
nom: "La Tempérance",
image: './images/star.jpg',
signification: 'Harmonie, équilibre, modération, guérison, adaptation'
},
{
nom: "La maison de Dieu",
image: './images/rouefortune.jpg',
signification: 'Rupture, choc, révélation, crise, libération'
},
{
nom: "La Lune",
image: './images/diable.jpg',
signification: 'Illusion, intuition, mystère, confusion, rêves'
},
{
nom: "Le jugement",
image: './images/pendu.jpg',
signification: 'Révélation, renaissance, appel, conscience, évaluation'
},
{
nom: "Le monde",
image: './images/pendu.jpg',
signification: 'Accomplissement, plénitude, réalisation, unité, succès'
}
    ];


    /*pur chauque carte(front), je vais rajouter aléatoirement(=mathRandom)
    une des images de mon tableaux cartes :) 
    */
    
    fronts.forEach((front, index) => {
        const randomIndex = Math.floor(Math.random() * cartes.length);
        const randomCard = cartes.splice(randomIndex, 1)[0]; // Retire l'image sélectionnée du tableau pour éviter les doublons
        front.src = randomCard.image;
        front.id =randomCard.nom; // Attribution d'un ID unique à chaque carte choisie
        front.dataset.signification = randomCard.signification; // Attribution de la signification à chaque carte choisie
    });
    


});
