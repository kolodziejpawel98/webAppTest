const players = ["Pablo", "Marian"];
let currentPlayerIndex = 0;

function changePlayer() {
    if(currentPlayerIndex == 0){
        currentPlayerIndex = 1;
    }else{
        currentPlayerIndex = 0;
    }
    document.getElementById('currentPlayer').textContent = `Kto zaczynał: ${players[currentPlayerIndex]}`;
}

function updatePoints(player, points) {
    const playerPoints = document.getElementById(`${player.toLowerCase()}-points`);
    const playerSety = document.getElementById(`${player.toLowerCase()}-sets`);
    let currentPoints = parseInt(playerPoints.textContent);
    currentPoints -= points;

    if (currentPoints <= 0) {
        currentPoints = 501;
        playerSety.textContent = parseInt(playerSety.textContent) + 1;
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

document.getElementById('submitBtn').addEventListener('click', () => {
    const inputValue = parseInt(document.getElementById('inputValue').value) || 0;

    const currentPlayer = players[currentPlayerIndex];
    updatePoints(currentPlayer, inputValue);

    changePlayer();
    document.getElementById('inputValue').value = '';
});