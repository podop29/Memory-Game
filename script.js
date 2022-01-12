const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
//vars
let cardsClicked = 0;
let previousTarget ='';
let noClicling = false;
let cardsFlipped = 0;
let counter = document.querySelector('#counter');
let winText = document.querySelector('#winText');

//resetBtn
let resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', function(){
  removeBoard()

});
//Reset Game
function removeBoard(){
  while(gameContainer.firstChild){
    gameContainer.removeChild(gameContainer.firstChild)
  }
let shuffledColors = shuffle(COLORS);
createDivsForColors(shuffledColors);
counter.innerText = 0;
cardsFlipped = 0;
resetBtn.classList.toggle('hidden')
winText.classList.toggle('hidden');

}



function handleCardClick(e) {
  if(noClicling)return;
  if (e.target.classList.contains("flipped")) return;
  //If cards match, set a 'match' class to them
  if(previousTarget.className === e.target.className){
    e.target.style.backgroundColor = e.target.className;
    previousTarget.style.backgroundColor = e.target.className;

    previousTarget.classList.toggle(previousTarget.className);
    e.target.classList.toggle(e.target.className);

    previousTarget.classList.toggle('match');
    e.target.classList.toggle('match');

    previousTarget.removeEventListener("click", handleCardClick);
   e.target.removeEventListener("click", handleCardClick);

    cardsFlipped +=2;
    cardsClicked = 0;
    previousTarget ='';
    counter.innerText = cardsFlipped;
  } 
  else if(cardsClicked<1){
    if(cardsClicked == 0){
      //set the previousTarget variable
      previousTarget = e.target;
    }
 e.target.style.backgroundColor = e.target.className;
 cardsClicked++;
  }
  else{
    cardsClicked = 0;
    previousTarget ='';
    e.target.style.backgroundColor = e.target.className;
    noClicling = true;
    //Turns all of them white if they dont match
    for(let i = 0; i< gameContainer.children.length; i++){
      if(gameContainer.children[i].className !== 'match'){
        setTimeout(function(){
          gameContainer.children[i].style.backgroundColor = '';
          noClicling = false;
        }, 1000);
      }
    }
  }
//Win condition
  if(cardsFlipped === 10){
    e.target.style.backgroundColor = e.target.className;
    resetBtn.classList.toggle('hidden');
    winText.classList.toggle('hidden');
  }
}





// when the DOM loads
createDivsForColors(shuffledColors);




