const players = ["Pablo", "Marian"];
let ekolpawCurrentPlayerIndex = 0;

function initializePlayerData(player) {
    if (localStorage.getItem(`${player.toLowerCase()}Sets`) === null) {
        localStorage.setItem(`${player.toLowerCase()}Sets`, 0);
    }
    if (localStorage.getItem(`${player.toLowerCase()}Points`) === null) {
        localStorage.setItem(`${player.toLowerCase()}Points`, 501);
    }
    if (localStorage.getItem(`currentPlayerIndex`) === null) {
        localStorage.setItem(`currentPlayerIndex`, 0);
    }
}

players.forEach(initializePlayerData);

function getCurrentPlayerIndex(){
    return parseInt(localStorage.getItem(`currentPlayerIndex`));
}

function incrementCurrentPlayerIndex(){
    let currentIndex = localStorage.getItem(`currentPlayerIndex`);
    currentIndex = 1 - currentIndex;
    localStorage.setItem(`currentPlayerIndex`, currentIndex);
}

function changePlayer() {
    const pabloElement = document.getElementById('pablo-name');
    const marianElement = document.getElementById('marian-name');

    [pabloElement, marianElement].forEach(el => el.classList.remove('inactive-name-color'));
    
    if (getCurrentPlayerIndex() === 0) {
        pabloElement.classList.add('inactive-name-color');
    } else {
        marianElement.classList.add('inactive-name-color');
    }
    incrementCurrentPlayerIndex();
}

function updatePoints(points) {
    const player = players[getCurrentPlayerIndex()].toLowerCase();
    console.log(player);
    const currentPlayerPointsText = document.getElementById(`${player}-points`);
    const currentPlayerSetsText = document.getElementById(`${player}-sets`);
    
    let currentPlayerPoints = parseInt(localStorage.getItem(`${player}Points`), 10);
    let currentPlayerSets = parseInt(localStorage.getItem(`${player}Sets`), 10);

    currentPlayerPoints -= points;
    
    if (currentPlayerPoints <= 0) {
        currentPlayerPoints = 501;
        currentPlayerSets++;
        currentPlayerSetsText.textContent = currentPlayerSets;
        setsChangeAnimation();
        resetAllPlayersPoints();
    }

    currentPlayerPointsText.textContent = currentPlayerPoints;
    localStorage.setItem(`${player}Points`, currentPlayerPoints);
    localStorage.setItem(`${player}Sets`, currentPlayerSets);
    updateSetColors();
}

function resetAllPlayersPoints() {
    players.forEach(player => {
        document.getElementById(`${player.toLowerCase()}-points`).textContent = 501;
        localStorage.setItem(`${player.toLowerCase()}Points`, 501);
    });
}

function updateSetColors() {
    const pabloSetPoints = parseInt(document.getElementById('pablo-sets').textContent, 10);
    const marianSetPoints = parseInt(document.getElementById('marian-sets').textContent, 10);

    const pabloSetyStyle = document.getElementById('pablo-sets');
    const marianSetyStyle = document.getElementById('marian-sets');

    [pabloSetyStyle, marianSetyStyle].forEach(el => el.classList.remove('highlight'));

    if (pabloSetPoints > marianSetPoints) {
        pabloSetyStyle.classList.add('highlight');
    } else if (marianSetPoints > pabloSetPoints) {
        marianSetyStyle.classList.add('highlight');
    }
}

function scoreChangeAnimation(points) {
    if (points > 0) {
        const currentPlayerScore = document.getElementById(`${players[getCurrentPlayerIndex()].toLowerCase()}-points`);
        console.log(currentPlayerScore);
        currentPlayerScore.classList.remove('scoreUpdateAnimation');
        setTimeout(() => currentPlayerScore.classList.add('scoreUpdateAnimation'), 0);
        setTimeout(() => currentPlayerScore.classList.remove('scoreUpdateAnimation'), 500);
    }
}

function setsChangeAnimation() {
    const currentPlayerSets = document.getElementById(`${players[getCurrentPlayerIndex()].toLowerCase()}-sets`);
    console.log(currentPlayerSets);
    currentPlayerSets.classList.remove('scoreUpdateAnimation');
    setTimeout(() => currentPlayerSets.classList.add('scoreUpdateAnimation'), 0);
    setTimeout(() => currentPlayerSets.classList.remove('scoreUpdateAnimation'), 500);
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const pointsInputValue = parseInt(document.getElementById('points-input').value, 10) || 0;
    updatePoints(pointsInputValue);
    scoreChangeAnimation(pointsInputValue);
    changePlayer();
    document.getElementById('points-input').value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    players.forEach(player => {
        localStorage.setItem(`${player.toLowerCase()}Sets`, 0);
        localStorage.setItem(`${player.toLowerCase()}Points`, 501);
        document.getElementById(`${player.toLowerCase()}-points`).textContent = 501;
        document.getElementById(`${player.toLowerCase()}-sets`).textContent = 0;
    });
    changePlayer();
    updateSetColors();
});

window.onload = () => {
    players.forEach(player => {
        document.getElementById(`${player.toLowerCase()}-points`).textContent = localStorage.getItem(`${player.toLowerCase()}Points`);
        document.getElementById(`${player.toLowerCase()}-sets`).textContent = localStorage.getItem(`${player.toLowerCase()}Sets`);
    });
    changePlayer();
    changePlayer();
};
