const players = ["Pablo", "Marian"];
let currentPlayerIndex = 0;

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
    }else{
        currentPlayerIndex = 0;
    }
}

function updatePoints(player, points) {
    const playerPoints = document.getElementById(`${player.toLowerCase()}-points`);
    const playerSety = document.getElementById(`${player.toLowerCase()}-sets`);
    let currentPoints = parseInt(playerPoints.textContent);
    currentPoints -= points;

    if (currentPoints <= 0) {
        currentPoints = 501;
        playerSety.textContent = parseInt(playerSety.textContent) + 1;
        setsChangeAnimation(player);
        document.getElementById(`pablo-points`).textContent = currentPoints;
        document.getElementById(`marian-points`).textContent = currentPoints;
    }

    playerPoints.textContent = currentPoints;
    updateSetColors();
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

document.getElementById('submitBtn').addEventListener('click', () => {
    const inputValue = parseInt(document.getElementById('inputValue').value) || 0;

    const currentPlayer = players[currentPlayerIndex];
    updatePoints(currentPlayer, inputValue);
    scoreChangeAnimation(currentPlayer, inputValue);
    changePlayer();
        
    document.getElementById('inputValue').value = '';
});

