const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    showHintBtn = document.querySelector(".show-hint"); // New hint button

let correctWord, timer;

// Initialize countdown timer
const initTimer = (maxTime) => {
    clearInterval(timer);
    let timeLeft = maxTime;
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

// Start or refresh the game
const initGame = () => {
    initTimer(120); // 2 minutes

    // Get random word object from the words list
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    // Shuffle using Fisher-Yates
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    document.querySelector(".hint").style.visibility = "hidden"; // Hide hint initially
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

// Check user input against correct word
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");

    if (userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    }

    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
};

// Show Hint button logic
showHintBtn.addEventListener("click", () => {
    document.querySelector(".hint").style.visibility = "visible";
});

// Button event listeners
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Start the game on load
initGame();
