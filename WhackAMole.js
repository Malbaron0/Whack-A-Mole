let holes = document.querySelectorAll(".hole");
let show = document.querySelector(".testingBtn");
let moles = document.querySelectorAll(".mole");
let lastHole;
let randomMole;
let endGame;


show.addEventListener("click", function () {
    startGame();
}, false);
addClickEvents();
document.querySelector(".showBtn").addEventListener("click", function () {
    moles[1].addEventListener('click', bonk);
}, false);

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function peek() {

    const time = randomTime(500, 2000)
    randomMole = getRandomHole().nextElementSibling; //query the returned node, and get the child element with class "mole"
    randomMole.classList.add("up");
    console.log(randomMole);

    //after a randomTime remove the "up" class from the selected element
    setTimeout(function () {
        randomMole.classList.remove("up");
        //if game hasnt ended, call recursively call peek again
        if (!endGame) {
            peek();
        }
    }, time);
}

//Get random with range of holes length and return a node (div element with class hole)
function getRandomHole() {
    const holeId = Math.floor(Math.random() * holes.length);
    //avoid duplicates by comparing the current random hole to the last, if duplicate, call the function again
    if (lastHole == holeId) {
        console.log(`There was a duplicate - HOLE: ${lastHole}`);
        return getRandomHole();
    }

    lastHole = holeId;
    return holes[holeId]; //reference the node to be returned (holes being a list of nodes) 
}

function startGame() {
    endGame = false;
    peek(); //show the moles
    //after 10 seconds, set endGame to true, while will stop exit the setTimeOut in peek function
    setTimeout(function () {
        endGame = true;
    }, 10000);
}

function bonk(e) {
    console.log("I was clicked");
}

function addClickEvents() {
    for (var i = 0; i < moles.length; i++) {

        var self = moles[i];
        console.log(self);
        self.addEventListener('click', function (event) {

            // call your awesome function here
            bonk(); // 'this' refers to the current button on for loop

        }, false);

    }

}
