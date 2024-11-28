// script.js

// Ödülleri tanımlıyoruz
const prizes = ["100₺", "50₺", "Var Yok", "25₺", "10₺", "75₺", "5₺", "200₺", "125₺", "Kaybettiniz"];
let shuffledPrizes = prizes.sort(() => Math.random() - 0.5);

// Kutular ve mesaj elemanlarını seçiyoruz
const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const countdownDisplay = document.getElementById('countdown');

// Süreyi başlatan değişkenler
let timeRemaining = 180;
let countdownInterval;

// Resetleme işlevi
function resetGame() {
    // Kutuları sıfırlıyoruz
    boxes.forEach((box) => {
        box.textContent = box.getAttribute('data-box');
        box.classList.remove('opened');
    });

    // Ödülleri yeniden karıştırıyoruz
    shuffledPrizes = prizes.sort(() => Math.random() - 0.5);

    // Geri sayımı sıfırlıyoruz
    timeRemaining = 180;
    countdownDisplay.textContent = `Kalan Süre: 60 saniye`;
    startCountdown();
}

// Geri sayım işlevi
function startCountdown() {
    // Eğer bir geri sayım zaten çalışıyorsa önce temizle
    clearInterval(countdownInterval);

    // Geri sayımı başlat
    countdownInterval = setInterval(() => {
        timeRemaining--;

        // Geri sayım güncellemesi
        countdownDisplay.textContent = `Kalan Süre: ${timeRemaining} saniye`;

        // Zaman dolduysa
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            message.textContent = "Süre doldu! Oyun sıfırlanıyor...";
            setTimeout(resetGame, 5000); // 2 saniye sonra resetle
        }
    }, 1000); // Her 1 saniyede bir güncelle
}

// Kutulara tıklama işlemi
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!box.classList.contains('opened')) {
            // Kutuyu açıyoruz
            const selectedPrize = shuffledPrizes[index];
            box.textContent = selectedPrize;
            box.classList.add('opened');

            // Mesajı güncelliyoruz
            if (selectedPrize === "Kaybettiniz") {
                // Eğer kutu "Kaybettiniz" ise
                message.textContent = `Oyun Bitti! "Kaybettiniz" kutusunu seçtiniz. Oyun sıfırlanıyor...`;

                // Geri sayımı durdur
                clearInterval(countdownInterval);

                // 2 saniye sonra oyunu sıfırla
                setTimeout(resetGame, 5000);
            } else {
                // Diğer ödüller için mesaj
                message.textContent = `Kutuyu açtınız: ${selectedPrize}`;
            }
        } else {
            // Eğer kutu zaten açıksa
            message.textContent = `Bu kutu zaten açılmış!`;
        }
    });
});

// Oyunu başlat
resetGame();
