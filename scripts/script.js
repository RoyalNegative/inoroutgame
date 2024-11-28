const prizes = ["100₺", "50₺", "Var Yok", "25₺", "10₺", "75₺", "5₺", "200₺", "125₺", "Kaybettiniz"];
let shuffledPrizes = prizes.sort(() => Math.random() - 0.5);

const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const countdownDisplay = document.getElementById('countdown');

let timeRemaining = 180;
let countdownInterval;

function resetGame() {
    boxes.forEach((box) => {
        box.textContent = box.getAttribute('data-box');
        box.classList.remove('opened');
    });

    shuffledPrizes = prizes.sort(() => Math.random() - 0.5);

    timeRemaining = 180;
    countdownDisplay.textContent = `Kalan Süre: 60 saniye`;
    startCountdown();
}

function startCountdown() {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        timeRemaining--;

        countdownDisplay.textContent = `Kalan Süre: ${timeRemaining} saniye`;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            message.textContent = "Süre doldu! Oyun sıfırlanıyor...";
            setTimeout(resetGame, 5000);
        }
    }, 1000);
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!box.classList.contains('opened')) {
            const selectedPrize = shuffledPrizes[index];
            box.textContent = selectedPrize;
            box.classList.add('opened');

            if (selectedPrize === "Kaybettiniz") {
                message.textContent = `Oyun Bitti! "Kaybettiniz" kutusunu seçtiniz. Oyun sıfırlanıyor...`;
                clearInterval(countdownInterval);
                setTimeout(resetGame, 5000);
            } else {
                message.textContent = `Kutuyu açtınız: ${selectedPrize}`;
            }
        } else {
            message.textContent = `Bu kutu zaten açılmış!`;
        }
    });
});

resetGame();
