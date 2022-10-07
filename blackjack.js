var dealerSum = 0;
var yourSum = 0;
var totalMoney = 100;
var dealerAceCount = 0;
var yourAceCount = 0;
var winnings = 0;
var currentBet = 0;
var credit = 100;
var hidden;
var deck;

var canDouble = true;
var canHit = true;
var canStay = true;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    // startGame();
    document.getElementById("your-cards").innerHTML = '';
    document.getElementById("dealer-cards").innerHTML = '';
    document.getElementById("dealerSum").classList.add('hide');
    document.getElementById("yourSum").classList.add('hide');
    document.getElementById("stay").classList.add('hide');
    document.getElementById("hit").classList.add('hide');
    document.getElementById("double").classList.add('hide');

    document.getElementById('credits').innerHTML=`Credits: ${credit}`; 
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function deal(){
    if(currentBet == 0){
        window.alert("Please enter a bet!");
        return;
    }
    document.getElementById("your-cards").innerHTML = '';
    yourSum = 0;
    document.getElementById("dealer-cards").innerHTML = '';
    dealerSum = 0;

    var img = document.createElement('img');
    img.setAttribute('id', 'hidden');
    img.src = "./cards/BACK.png"
    document.getElementById('dealer-cards').appendChild(img);
    yourAceCount = 0;
    dealerAceCount = 0;
    winnings = 0;

    document.getElementById("currentBet").innerHTML = `Current Bet: ${currentBet}`;


    console.log(document.getElementById("dealer-cards"))
    canHit = true;
    canStay = true;
    canDouble = true;

    document.getElementById("dealerSum").classList.remove('hide');
    document.getElementById("yourSum").classList.remove('hide');
    document.getElementById("stay").classList.remove('hide');
    document.getElementById("hit").classList.remove('hide');
    document.getElementById("double").classList.remove('hide');
    document.getElementById("betBtn").classList.add('hide');
    document.getElementById("deal").classList.add('hide');
    document.getElementById("winnings").classList.add('hide');

    




    showCredits();
    buildDeck();
    shuffleDeck();
    startGame();
}

function startGame() {

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    console.log(hidden);
    console.log(dealerSum);
    // for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    document.getElementById("dealer-cards").append(cardImg);
    document.getElementById("dealer-sum").innerText = getValue(card);
    // while (dealerSum < 17) {
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src = "./cards/" + card + ".png";
    //     dealerSum += getValue(card);
    //     dealerAceCount += checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg);
    //     document.getElementById("dealer-sum").innerText = dealerSum ;

    // }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        yourSum = reduceAce(yourSum, yourAceCount);
        document.getElementById("your-cards").append(cardImg);
        document.getElementById("your-sum").innerText = yourSum;


    }
    message = '';
    if (yourSum == 21 && dealerSum == 21) {
        message = "Push!"
        document.getElementById("hidden").src = "./cards/" + hidden + ".png"
        document.getElementById("dealer-sum").innerText = dealerSum;
        moneyBack();
        setTimeout(() => {
            newGame();
          }, 3000); 
          
        canHit = false;
        canStay = false;
        canDouble = false;



    } else if (dealerSum == 21) {
        message = "Blackjack! You lose"
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        document.getElementById("dealer-sum").innerText = dealerSum;

        setTimeout(() => {
            newGame();
          }, 3000); 

        canHit = false;
        canStay = false;
        canDouble = false;

    } else if (yourSum == 21) {
        message = 'Blackjack! You win!'
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        document.getElementById("dealer-sum").innerText = dealerSum;
        blackjackWin();

        setTimeout(() => {
            newGame();
          }, 3000); 


        canHit = false;
        canStay = false;
        canDouble = false;

    }

    document.getElementById("results").innerText = message;

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("double").addEventListener("click", double);
}

function hit() {
    if (!canHit) {
        return;
    }

    canDouble = false;
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourAceCount += checkAce(card);
    yourSum += getValue(card)
    console.log(card[0]);
    dealerAceCount += checkAce(card);
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    document.getElementById("your-cards").append(cardImg);
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);
    console.log(yourAceCount);
    console.log(reduceAce(yourSum, yourAceCount));

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
        canStay = false;
        canDouble = false;
        document.getElementById("results").innerText = "Busted!";
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        document.getElementById("dealer-sum").innerText = dealerSum;
        setTimeout(() => {
        newGame();
      }, 3000);  


    }
    // console.log(reduceAce(yourSum, yourAceCountTwo));


    // while (dealerSum < 17) {
    // let cardImg = document.createElement("img");
    // let card = deck.pop();
    // cardImg.src = "./cards/" + card + ".png";
    // dealerSum += getValue(card);
    // dealerAceCount += checkAce(card);
    // console.log(hidden)
    // document.getElementById("dealer-cards").append(cardImg);
    // document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);
    // }

}

function stay() {
    if (!canStay) {
        return;
    }
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        document.getElementById("dealer-sum").innerText = dealerSum;

    }

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canDouble = false;
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (dealerSum > 21) {
        message = "You win!";
        regularWin();
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum == dealerSum) {
        message = "Push!";
        moneyBack();
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum > dealerSum) {
        message = "You Win!";
        regularWin();
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum < dealerSum) {
        message = "You Lose!";
        setTimeout(() => {
            newGame();
          }, 3000); 
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function double(){
    if (!canDouble) {
        return;
    }else if(credit < currentBet * 2){
        return;
    }
    credit -= currentBet;
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourAceCount += checkAce(card);
    yourSum += getValue(card)
    dealerAceCount += checkAce(card);
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    document.getElementById("your-cards").append(cardImg);
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);
    document.getElementById("credits").innerHTML = `Credits: ${credit}`
    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
        canStay = false;
        document.getElementById("results").innerText = "Busted!";
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        document.getElementById("dealer-sum").innerText = dealerSum;




    }
   
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        document.getElementById("dealer-sum").innerText = dealerSum;

    }

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canDouble = false;
    canHit = false;
    canStay = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (dealerSum > 21) {
        message = "You win!";
        doubleWin();
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum == dealerSum) {
        message = "Push!";
        regularWin()
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum > dealerSum) {
        message = "You Win!";
        doubleWin();
        setTimeout(() => {
            newGame();
          }, 3000); 
    } else if (yourSum < dealerSum) {
        message = "You Lose!";
        setTimeout(() => {
            newGame();
          }, 3000); 
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        console.log(card[0])
        return 1;
    }
    return 0;
}

function reduceAce(yourSum, yourAceCount) {
    while (yourSum > 21 && yourAceCount > 0) {
        yourSum -= 10;
        yourAceCount -= 1;
    }
    return yourSum;
}

function showCredits(){
    credit -= currentBet;
    document.getElementById('credits').innerHTML= `Credits: ${credit}`;
}

function regularWin(){
    winnings = currentBet * 2;
    credit += winnings;
}

function blackjackWin(){
    winnings = currentBet * 2.5;
    credit += winnings;
}

function doubleWin(){
    winnings = currentBet * 4;
    credit += winnings;
}

function moneyBack(){
    winnings = currentBet;
    credit += winnings;
}


function increaseBet(id) {
    var betAmount = parseInt(id, 10)
    if(betAmount + currentBet <= credit){
        currentBet += betAmount;
    }else if(betAmount + currentBet > credit){
        currentBet = credit;
    }
    document.getElementById("currentBet").innerHTML =`Current Bet: ${currentBet}`
}


function newGame() {
    document.getElementById("your-cards").innerHTML = '';
    document.getElementById("dealer-cards").innerHTML = '';
    document.getElementById("dealerSum").classList.add('hide');
    document.getElementById("yourSum").classList.add('hide');
    document.getElementById("stay").classList.add('hide');
    document.getElementById("hit").classList.add('hide');
    document.getElementById("double").classList.add('hide');

    document.getElementById("betBtn").classList.remove('hide');
    document.getElementById("deal").classList.remove('hide');
    document.getElementById("winnings").classList.remove('hide');

    document.getElementById("winnings").innerHTML=`Won: ${winnings}`

    document.getElementById("credits").innerHTML=`Credits: ${credit}`
    document.getElementById("currentBet").innerHTML=`Current Bet: 0`



    // dealerSum = 0;

    // var img = document.createElement('img');
    // img.setAttribute('id', 'hidden');
    // img.src = "./cards/BACK.png"
    // document.getElementById('dealer-cards').appendChild(img);
    // yourAceCount = 0;
    // dealerAceCount = 0;

    currentBet = 0;
//     document.getElementById("currentBet").innerHTML = `Current Bet: ${currentBet}`;


//     console.log(document.getElementById("dealer-cards"))
//     canHit = true;
//     canStay = true;
//     canDouble = true;





//     buildDeck();
//     shuffleDeck();

//     startGame();
}