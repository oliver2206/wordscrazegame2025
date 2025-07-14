const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
    clearInterval(timer);
    let timeLeft = maxTime; // Timer countdown value
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timeText.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(timer);
            alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    initTimer(120); // 2 minutes = 120 seconds
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    
    // Shuffle the word using Fisher-Yates algorithm
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) {
        return alert("Please enter the word to check!");
    }

    if (userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    }

    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Initialize the game on page load
initGame();
