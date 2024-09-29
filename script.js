const players = ["Pablo", "Marian"];
let currentPlayerIndex = 0;

if (localStorage.getItem('pabloSets') === null) {
    localStorage.setItem('pabloSets', 0);
}

if (localStorage.getItem('marianSets') === null) {
    localStorage.setItem('marianSets', 0);
}

if (localStorage.getItem('pabloPoints') === null) {
    localStorage.setItem('pabloPoints', 501);
}

if (localStorage.getItem('marianPoints') === null) {
    localStorage.setItem('marianPoints', 501);
}

function changePlayer() {
    const pabloElement = document.getElementById('pablo-name');
    const marianElement = document.getElementById('marian-name');
    

    pabloElement.classList.remove('inactive-name-color');
    marianElement.classList.remove('inactive-name-color');
    
    if (currentPlayerIndex === 0) {
        pabloElement.classList.add('inactive-name-color');
    } else {
        marianElement.classList.add('inactive-name-color');
    }


    if(currentPlayerIndex == 0){
        currentPlayerIndex = 1;
    }else{let marianPoints = 
        currentPlayerIndex = 0;
    }
}

function updatePoints(currentPlayerIndex, points) {
    const currentPlayerPointsText = document.getElementById(`${players[currentPlayerIndex].toLowerCase()}-points`);
    const currentPlayerSetsText = document.getElementById(`${players[currentPlayerIndex].toLowerCase()}-sets`);
    
    let currentPlayerPoints = localStorage.getItem(`${players[currentPlayerIndex].toLowerCase()}Points`);
    let currentPlayerSets = localStorage.getItem(`${players[currentPlayerIndex].toLowerCase()}Sets`);

    currentPlayerPoints -= points;
    
    if (currentPlayerPoints <= 0) {
        currentPlayerPoints = 501;
        currentPlayerSets++;
        currentPlayerSetsText.textContent = currentPlayerSetsText;
        // setsChangeAnimation(player);
        document.getElementById(`pablo-points`).textContent = 501;
        document.getElementById(`marian-points`).textContent = 501;
    }

    currentPlayerPointsText.textContent = currentPlayerPoints;
    localStorage.setItem(`${players[currentPlayerIndex].toLowerCase()}Points`, currentPlayerPoints);
    localStorage.setItem(`${players[currentPlayerIndex].toLowerCase()}Sets`, currentPlayerSets);
    // updateSetColors();
}

function updateSetColors() {
    const pabloSetPoints = parseInt(document.getElementById('pablo-sets').textContent);
    const marianSetPoints = parseInt(document.getElementById('marian-sets').textContent);

    const pabloSetyStyle = document.getElementById('pablo-sets');
    const marianSetyStyle = document.getElementById('marian-sets');

    pabloSetyStyle.classList.remove('highlight');
    marianSetyStyle.classList.remove('highlight');

    if (pabloSetPoints > marianSetPoints) {
        pabloSetyStyle.classList.add('highlight');
    } else if (marianSetPoints > pabloSetPoints) {
        marianSetyStyle.classList.add('highlight');
    }
}

function scoreChangeAnimation(currentPlayer, points) {
    const currentPlayerScore = document.getElementById(`${currentPlayer.toLowerCase()}-points`);
    if(points > 0){
        currentPlayerScore.classList.remove('scoreUpdateAnimation');
        setTimeout(() => {
            currentPlayerScore.classList.add('scoreUpdateAnimation');
        }, 0);
        setTimeout(() => {
            currentPlayerScore.classList.remove('scoreUpdateAnimation');
        }, 500);
    }
}

function setsChangeAnimation(currentPlayer) {
    const currentPlayerSets = document.getElementById(`${currentPlayer.toLowerCase()}-sets`);
        currentPlayerSets.classList.remove('scoreUpdateAnimation');
        setTimeout(() => {
            currentPlayerSets.classList.add('scoreUpdateAnimation');
        }, 0);
        setTimeout(() => {
            currentPlayerSets.classList.remove('scoreUpdateAnimation');
        }, 500);
}

function saveDataToLocalStorage(){
    let pabloCurrentSets = localStorage.getItem('pabloCurrentSets');
    let marianCurrentSets = localStorage.getItem('marianCurrentSets');
    let pabloCurrentPoints = localStorage.getItem('pabloCurrentPoints');
    let marianCurrentPoints = localStorage.getItem('marianCurrentPoints');


    pabloCurrentSets = 21;
   
   localStorage.setItem('user', pabloCurrentSets);

}

document.getElementById('submitBtn').addEventListener('click', () => {
    const inputValue = parseInt(document.getElementById('inputValue').value) || 0;

    // const currentPlayer = players[currentPlayerIndex];
    updatePoints(currentPlayerIndex, inputValue);
    // scoreChangeAnimation(currentPlayer, inputValue);
    // changePlayer();
    // saveDataToLocalStorage();
    // document.getElementById('inputValue').value = '';
});


document.getElementById('resetBtn').addEventListener('click', () => {
        localStorage.setItem('pabloSets', 0);
        localStorage.setItem('marianSets', 0);
        localStorage.setItem('pabloPoints', 501);
        localStorage.setItem('marianPoints', 501);    
        document.getElementById('pablo-points').textContent = localStorage.getItem('pabloPoints');
        document.getElementById('marian-points').textContent = localStorage.getItem('marianPoints');
        document.getElementById('pablo-sets').textContent = localStorage.getItem('pabloSets');
        document.getElementById('marian-sets').textContent = localStorage.getItem('marianSets');
});

window.onload = () => {
    document.getElementById('pablo-points').textContent = localStorage.getItem('pabloPoints');
    document.getElementById('marian-points').textContent = localStorage.getItem('marianPoints');
    document.getElementById('pablo-sets').textContent = localStorage.getItem('pabloSets');
    document.getElementById('marian-sets').textContent = localStorage.getItem('marianSets');
};