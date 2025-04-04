const grid =document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')

const characters = [
    'banana',
    'coco',
    'limao',
    'mamao',
    'melancia',
    'morango',
    'pera',
    'uva',
    'abacaxi',
    'maca'

]

const createElement = (tag,className)=>{
    const element = document.createElement(tag);
    element.className = className
    return element;
}


let firstCard = '';
let secondCard= '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        clearInterval(this.loop);

        const modal = document.getElementById('endgame-modal');
        const playerName = document.getElementById('player-name');
        const finalTime = document.getElementById('final-time');

        playerName.innerHTML = spanPlayer.innerHTML;
        finalTime.innerHTML = timer.innerHTML;

        modal.classList.remove('hidden');
    }
};
function restartGame() {
    window.location.href = '../index.html'; 
}

const checkCards =()=>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');


    if (firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
            secondCard.firstChild.classList.add('disabled-card');
            firstCard= '';
            secondCard= '';
            checkEndGame();
    }else{

        setTimeout(()=> {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard= '';
            secondCard= '';
        }, 500);
       
    }
    
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
        
    }else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
       secondCard = target.parentNode;

       checkCards();
    }

}

const createCard =(character)=>{
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../img/${character}.png)`;

   

    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card;
    
    }

    const loadGame = ()=>{
        const duplicateCharacters= [...characters, ...characters];

        const shuffledArray = duplicateCharacters.sort(()=> Math.random() - 0.5);
        

    shuffledArray.forEach((character)=> {
            const card = createCard(character);
            grid.appendChild(card);
        });
    }

    const startTimer = () => {
        let seconds = 0;
    
        this.loop = setInterval(() => {
            seconds++;
    
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
    
            
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
            timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
        }, 1000);
    };
    
    window.onload =()=>{
        

        spanPlayer.innerHTML=localStorage.getItem('player');
        startTimer();
        loadGame();

    }
  