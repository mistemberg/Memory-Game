//definying variables
const gameContainer = document.getElementById("game"); //access the game div
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClick = false; //variable to be later use to avoid clicking in more than two cards at a time
const COLORS = [
  "blue",
  "lightblue",
  "skyblue",
  "darkblue",
  "cornflowerblue",
  "blue",
  "lightblue",
  "skyblue",
  "darkblue",
  "cornflowerblue"
];

//function to shuffle the color array using the Fisher-Yates method
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    //swap the last element with it (because of Fisher-Yates)
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//variable created to call function shuffle(COLORS) later
let shuffledColors = shuffle(COLORS);

//function with a loop to crate a div for each color + event 'click' to the cards
function divsEachColor(colorArr) {
  for (let color of colorArr) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", cardClick);
    gameContainer.append(newDiv);
  }
}

//logical function to gives meaning when a card is clicked, checks if player can click another card or if 2 cards are already clicked
function cardClick(event) {
  if (noClick) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstCard || !secondCard) {
    currentCard.classList.add("flipped");
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
  }

  if (firstCard && secondCard) {
    noClick = true;
    // debugger
    let gif1 = firstCard.className;
    let gif2 = secondCard.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      firstCard.removeEventListener("click", cardClick);
      secondCard.removeEventListener("click", cardClick);
      firstCard = null;
      secondCard = null;
      noClick = false;
    } else {
      setTimeout(function() {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        noClick = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}

divsEachColor(shuffledColors);
