const lettersDiv = document.getElementById("letters");
const wordsDiv = document.getElementById("words");
const deleteBtn = document.getElementById("delete");

//let's get a random word from the words array:

async function getWord() {
  const fetchUrl =
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";
  const data = await fetch(fetchUrl);
  const wordList = await data.text();
  const words = wordList.split("\r\n");
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
let chosenWord = getWord()
  .then((v) => v)
  .then((v2) => {
    return v2.toString();
  });
//turn the chosen word into an array
let wordArr = chosenWord.then((v) => v.split(""));
//shuffle the word
wordArr.then((a) => shuffleArray(a));
//let's turn each letter into a button that the user can click

function makeLettersClickable() {
  wordArr.then((a) => {
    a.forEach((v) => {
      const letterBtn = document.createElement("button");
      letterBtn.textContent = v;
      letterBtn.className = "keyboard";
      letterBtn.id = "letter";
      letterBtn.addEventListener("click", (e) => {
        wordsDiv.textContent += e.target.textContent;
        checkWord();
      });
      lettersDiv.appendChild(letterBtn);
    });
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
  chosenWord.then((w) => {
    if (wordsDiv.textContent.toString() == w) {
      alert("Well done!\nYou got the word and it was " + w);
      chosenWord = getWord()
        .then((v) => v)
        .then((v2) => {
          return v2.toString();
        });
      //turn the chosen word into an array
      wordArr = chosenWord.then((v) => v.split(""));
      //shuffle the word
      wordArr.then((a) => shuffleArray(a));

      lettersDiv.textContent = "";
      wordsDiv.textContent = "";
      makeLettersClickable();
    }
  });
}
