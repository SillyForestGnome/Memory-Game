const gameContainer = document.getElementById("game-container");
const card1 = "mikeCard.jpeg";
const card2 = "mickeyCard.jpeg";
const card3 = "peterCard.jpeg";
const card4 = "daveyCard.jpeg";
const card5 = "carCard.jpeg";
const card6 = "albumCard.jpeg";
const cardBack = "backOfCard.jpeg";

const cards = [
  card1,
  card1,
  card2,
  card2,
  card3,
  card3,
  card4,
  card4, 
  card5,
  card5,
  card6,
  card6
];

// SHUFFLE
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter = counter - 1;
    let tempIndex = array[counter];
    array[counter] = array[index];
    array[index] = tempIndex;
  }
  return array;
}

//NEWLY ORDERED ARRAY
let shuffledCards = shuffle(cards);

//LOADING DOM
createDivsForImgs(shuffledCards);

//ADD DYNAMIC DIVS, IMGS AND EVENT LISTENERS FOR EACH CARD
function createDivsForImgs(imgArray) {

  let counter = 0;

  for (let card of imgArray) {
    counter++;

    const itemName = card.substring(0, card.indexOf("Card"));
    const newCard = document.createElement("div"); // card itself
    newCard.classList.add("card"); //give it two class attributes
    newCard.classList.add(itemName.toLowerCase());
    newCard.setAttribute("id", counter); //Creating an id and making the id correspond with the counter

    //Create 2 more divs within the card div, and imgs within:
    const backContainer = document.createElement("div");
    backContainer.classList.add("back-container");
    newCard.appendChild(backContainer);
    
    const backImg = document.createElement("img");
    backImg.src = cardBack;
    backContainer.appendChild(backImg);

    const frontContainer = document.createElement("div");
    frontContainer.classList.add("front-container");
    newCard.appendChild(frontContainer);

    const frontImg = document.createElement("img");
    frontImg.src = card;
    frontContainer.appendChild(frontImg);

    //call handleCardClick when a div is clicked on:
    newCard.addEventListener('click', handleCardClick);

    //append div to element with id of "game-container":
    gameContainer.append(newCard);
  }
}

//CHECKS AND DETERMINING MATCHING

let firstClick, secondClick;
let clickedCards = [];
let debounce = false;

function handleCardClick(event) {
  event.preventDefault();

  //MAKE SURE USER CANNOT CLICK TOO FAST
  if (debounce) {
    return;
  }

  //SAME CARD CLICKED ALERT
  if (clickedCards.length > 0 && event.target === clickedCards[0]) {
    return;
  }

  const clickedCard = event.currentTarget;

  if (!firstClick) {
    firstClick = clickedCard;
    firstClick.classList.toggle('open');
    clickedCards.push(event.target);
    } else if (!secondClick && firstClick !== clickedCard) {
       secondClick = clickedCard;
       secondClick.classList.toggle('open');
       clickedCards.push(event.target);
       }

  checkForMatch();

  //CHECK FOR MATCH
  function checkForMatch() {
    if (firstClick.className === secondClick.className) {
      firstClick.removeEventListener('click', handleCardClick);
      secondClick.removeEventListener('click', handleCardClick);
      firstClick = null;
      secondClick = null;
      clickedCards = [];
      } else {
          debounce = true;//prevent clicks
          setTimeout (function() {
            firstClick.classList.remove('open');
            secondClick.classList.remove('open');
            firstClick = null;
            secondClick = null;
            clickedCards = [];
            debounce = false; // Allow clicks again
          }, 1000);
       }
  }
}

//START BUTTON
//RESET GAME BUTTON
//KEEP SCORE
//STORE LOWEST-SCORING GAME IN LOCAL STORAGE


//__________________________________________________________________________________________________________________________________
//NOTES

//SHUFFLE:
////Counter equals the number of characters in the array. While there are characters in the array, pick a random index and decrease counter by 1 each time (*9, *8, etc). You will then swap the last character with it and take the index selected by decrementing the counter and switch places. 
//// If the counter was 0, by the time counter gets to this part of the loop, would equal -1 because of the decrementing. "Array index out of bounds error".
////**The counter represents the number of characters, not the number of indices. Don't include inxex 0 because you cannot times it by 0.
// Math.random picks a number equal to or greater than 0 and less than 1. Math.floor always rounds down to the nearest whole number. First time this loop runs it is times 10.
//Range - starts inclusive, end is not inclusive.
//Square brackets always indicate an index

//DEBOUNCING:
//boolean is set to decide if there is a rule-prevent a user from continuing an action.

//FIRST CARD CLICKED SECTION:
 //Is lastCardClicked a truthy value? This represents that there already was a card clicked and this is a reference to that card that was clicked
  //This will try to convert it into a boolean depending on what it is.

//SECOND CARD CLICKED SECTION:
 //When checking to see if the same card has been clicked twice, track which card was clicked last and see if index 0 is the last element that generated the event.

//RESET. This will reset lastCardClicked back to null - taking class back off of it that makes it flip over.

//_________________________________________________________________________________________________________________________________
 //CODE NOT USED:
 // const flipCardInner = document.createElement("div");//Container for both front and back
// flipCardInner.classList.add("flip-card-inner");
// newCard.appendChild(flipCardInner);

// flipCardInner.appendChild(flipCardBack);

//const cardId = getAttribute ()

//const openCard

// let lastCardClicked = null; // logic doesn't begin until 2nd card is clicked

// firstClick.classList.add('flip-up');
// firstClick.classList.add('flip-up');

