const lettersDiv = document.getElementById("letters");
const wordsDiv = document.getElementById("words");
const deleteBtn = document.getElementById("delete");
const words = [
  "test",
  "train",
  "drink",
  "pray",
  "water",
  "ice",
  "people",
  "school",
  "computer",
  "title",
];

//let's get a random word from the words array:

function getWord() {
  let randomNum = Math.floor(Math.random() * words.length);
  return words[randomNum];
}

//A function to shuffle given array.

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
  }
  return arr;
}

//get random word
let chosenWord = getWord();
//turn the chosen word into an array
let wordArr = chosenWord.split("");
//shuffle the word
shuffleArray(wordArr);
//let's turn each letter into a button that the user can click

function makeLettersClickable() {
  wordArr.forEach((v) => {
    const letterBtn = document.createElement("button");
    letterBtn.textContent = v;
    letterBtn.addEventListener("click", (e) => {
      wordsDiv.textContent += e.target.textContent;
      checkWord();
    });
    lettersDiv.appendChild(letterBtn);
  });
}

makeLettersClickable();
//Let's make the delete button do it's job

deleteBtn.addEventListener("click", (e) => {
  //split it's text content into an array to simply pop the last letter from the array
  let text = wordsDiv.textContent.split("");
  if (text.length > 0) {
    text.pop();
    //update the div's text content
    wordsDiv.textContent = text.join("");
  }
});

//let's write a function to check if the word the player entered matches the chosen word

function checkWord() {
  if (wordsDiv.textContent.toString() == chosenWord) {
    alert("Well done!\nYou got the word and it was " + chosenWord);
    chosenWord = getWord();
    wordArr = chosenWord.split("");
    shuffleArray(wordArr);
    lettersDiv.textContent = "";
    wordsDiv.textContent = "";
    makeLettersClickable();
  }
}
