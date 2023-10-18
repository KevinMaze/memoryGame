// Tableau contenant les url des images
const cards = [
    'https://picsum.photos/id/237/120/120', 
    'https://picsum.photos/id/238/120/120',
    'https://picsum.photos/id/239/120/120',
    'https://picsum.photos/id/240/120/120',
    'https://picsum.photos/id/241/120/120',
    'https://picsum.photos/id/242/120/120',
    'https://picsum.photos/id/243/120/120',
    'https://picsum.photos/id/244/120/120'
];

const gameBoard = document.getElementById('game-board');
let scoreDiv = document.getElementById('score')
let buttonGame = document.getElementById('begin-game');
let buttonReload = document.getElementById('reload'); 
let selectedCards = [];
let score = 0;

buttonGame.addEventListener('click', () => {
    timer();
    buttonGame.style.display = 'none';
    buttonReload.style.opacity = 1;
    buttonReload.addEventListener('click', () => {location.reload()});
    
});

// Méthode createCard avec en parametre la valeur url de l'image et retourne l'objet en html
function createCard(CardUrl){
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;
    
    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${CardUrl}`;
    
    card.appendChild(cardContent);
    
    card.addEventListener('click', onCardClick);
    
    return card;
}

// Fonction pour dupliquer les cartes, nous en avons 8 il nous en faut 16
function duplicateArray(arraySimple){
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);    
    arrayDouble.push(...arraySimple);
    return arrayDouble;    
}

// Fonction pour mélanger les cartes
function shuffleArray(arrayToShuffle){
    const arrayShuffle = arrayToShuffle.sort(() => Math.random() - 0.5);
    return arrayShuffle;
}

// ajouter les cartes créer dans le gameBoard
let allCards = duplicateArray(cards);
// Mélanger les cartes
allCards = shuffleArray(allCards);
allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
});

// Méthode pour ajouter .flip au click
function onCardClick(e){
    const card = e.target.parentElement;
    card.classList.add('flip');

    
    selectedCards.push(card);
    if(selectedCards.length == 2){
        setTimeout(() => {
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                // on a trouvé une paire
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);
                score += 10;
                scoreDiv.innerHTML = score;
                
                const allCardNotFinded = document.querySelectorAll('.card:not(.matched)');
                console.log(allCardNotFinded.length);
                if(allCardNotFinded.length ==0) {
                    //Le joueur à gagné
                    alert('Vous avez gagné');
                }
            }
            else{
                // on a pas trouvé
                selectedCards[0].classList.remove('flip');
                selectedCards[1].classList.remove('flip');
            }
            selectedCards = [];
        }, 1000)
    }
}

// Méthode pour afficher le compte à rebours
function timer(){
    const timerDiv = document.getElementById('timer');
    let seconde = 60;
    let timer = setInterval(() => {
        seconde--;
        console.log(seconde);
        if(seconde == -1){
            alert('Vous avez perdu');
            clearInterval(timer);
        }else{
            timerDiv.innerHTML = seconde;
        }
    }, 1000);
}


