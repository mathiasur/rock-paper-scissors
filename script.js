const $weapons = document.querySelectorAll('.weapons');
const $playerChoice = document.querySelector('#player-choice');
const $computerChoice = document.querySelector('#computer-choice');
const $selection = document.querySelector('.selection');
const $playerScore = document.querySelector('#pScore');
const $computerScore = document.querySelector('#cScore');
const $result = document.querySelector('#result');
const $menu = document.querySelector('.select-menu');
const $block = document.querySelector('.block');
const $finalResult = document.querySelector('#final-result');
const $info = document.querySelector('#info');
const $points = document.querySelector('#points');
const $yesBtn = document.querySelector('#yes');
const $noBtn = document.querySelector('#no');

let pScore = 0;
let cScore = 0;
let rounds = 0;

$selection.addEventListener('click', (e) => {

    let id = e.target.id;

    if (id) {
        clearChoices();
        playRound(id);
    }

});


$yesBtn.addEventListener('click', () => location.reload());

$noBtn.addEventListener('click', () => 
    window.location.href = 'https://github.com/mathiasur'
);


function clearChoices() {
    while ($playerChoice.firstChild) $playerChoice.removeChild($playerChoice.firstChild);
    while ($computerChoice.firstChild) $computerChoice.removeChild($computerChoice.firstChild);
}

function playRound(id) {

    $info.textContent = '';
    $points.textContent = 0;

    let player = id;
    let computer = computerChoice();

    showChoices(player, $playerChoice);
    showChoices(computer, $computerChoice);

    let result = roundResult(player, computer);

    $result.textContent = result;

    if (result === 'You Won!') {
        pScore++;
        rounds++;
        $playerScore.textContent = pScore;
        $info.textContent = `${player} beats ${computer}`;
        $points.textContent = '+1';
    }
    if (result === 'You Lost!') {
        cScore++;
        rounds++;
        $computerScore.textContent = cScore;
        $info.textContent = `${computer} beats ${player}`;
        $points.textContent = '-1';
    }

    if (rounds === 5) showSelectMenu();
}

function computerChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) return 'rock';
    if (choice === 1) return 'paper';
    if (choice === 2) return 'scissors';
}

function showChoices(id, dest) {
    let img = document.createElement('img');
    img.src = `images/${id}.png`;
    img.classList.add('animate');
    dest.appendChild(img);
}

function roundResult(player, computer) {
    if (player != computer) {
        if (player === 'rock' && computer === 'scissors') return 'You Won!';
        if (player === 'paper' && computer === 'rock') return 'You Won!';
        if (player === 'scissors' && computer === 'paper') return 'You Won!';
        return 'You Lost!'
    }
    return 'Draw!'
}

function showSelectMenu() {

    let final;

    if (cScore > pScore) final = 'You Lose';
    else final = 'You Won!'

    $block.style = 'display: flex';

    setTimeout(() => {

        $result.textContent = '';

        $menu.style = 'display: flex';
        $finalResult.textContent = final;

    }, 2000);

}