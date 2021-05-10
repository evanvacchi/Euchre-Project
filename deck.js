const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ['9', '10', 'J', 'Q', 'K', 'A']

const CARD_VALUE_MAP = {
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

const TRUMP_VALUE_MAP = {
  '9': 19,
  '10': 20,
  'Q' : 21,
  'K' : 22,
  'A' : 23,
  'L' : 24,
  'J' : 25
}

var playerCardSlot1 = document.querySelector('.player-card-slot1');
var playerCardSlot2 = document.querySelector('.player-card-slot2');
var playerCardSlot3 = document.querySelector('.player-card-slot3');
var playerCardSlot4 = document.querySelector('.player-card-slot4');
var playerCardSlot5 = document.querySelector('.player-card-slot5');

var cp1CardSlot1 = document.querySelector('.cp1slotcard1');
var cp1CardSlot2 = document.querySelector('.cp1slotcard2');
var cp1CardSlot3 = document.querySelector('.cp1slotcard3');
var cp1CardSlot4 = document.querySelector('.cp1slotcard4');
var cp1CardSlot5 = document.querySelector('.cp1slotcard5');

var cp2CardSlot1 = document.querySelector('.cp2slotcard1');
var cp2CardSlot2 = document.querySelector('.cp2slotcard2');
var cp2CardSlot3 = document.querySelector('.cp2slotcard3');
var cp2CardSlot4 = document.querySelector('.cp2slotcard4');
var cp2CardSlot5 = document.querySelector('.cp2slotcard5');

var cp3CardSlot1 = document.querySelector('.cp3slotcard1');
var cp3CardSlot2 = document.querySelector('.cp3slotcard2');
var cp3CardSlot3 = document.querySelector('.cp3slotcard3');
var cp3CardSlot4 = document.querySelector('.cp3slotcard4');
var cp3CardSlot5 = document.querySelector('.cp3slotcard5');

const passButton = document.querySelector('.pass');
var upcard = document.querySelector('.deck');
const text = document.querySelector('.text');
// const upcard = this.cards[20];

function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  get upCard() {
    return this.cards[20];
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  deal() {
    //if dealer is 0 player then deal this way...
    //do I actually need 4 different deal functions?????
    for (let i = 0; i < 1; i++) {
        cp1CardSlot1.appendChild(this.cards[i].getHTML());
        cp1CardSlot2.appendChild(this.cards[i+1].getHTML());
        cp2CardSlot1.appendChild(this.cards[i+2].getHTML());
        cp2CardSlot2.appendChild(this.cards[i+3].getHTML());
        cp2CardSlot3.appendChild(this.cards[i+4].getHTML());
        cp3CardSlot1.appendChild(this.cards[i+5].getHTML());
        cp3CardSlot2.appendChild(this.cards[i+6].getHTML());
        playerCardSlot1.appendChild(this.cards[i+7].getHTML());
        playerCardSlot2.appendChild(this.cards[i+8].getHTML());
        playerCardSlot3.appendChild(this.cards[i+9].getHTML());
        cp1CardSlot3.appendChild(this.cards[i+10].getHTML());
        cp1CardSlot4.appendChild(this.cards[i+11].getHTML());
        cp1CardSlot5.appendChild(this.cards[i+12].getHTML());
        cp2CardSlot4.appendChild(this.cards[i+13].getHTML());
        cp2CardSlot5.appendChild(this.cards[i+14].getHTML());
        cp3CardSlot3.appendChild(this.cards[i+15].getHTML());
        cp3CardSlot4.appendChild(this.cards[i+16].getHTML());
        cp3CardSlot5.appendChild(this.cards[i+17].getHTML());
        playerCardSlot4.appendChild(this.cards[i+18].getHTML());
        playerCardSlot5.appendChild(this.cards[i+19].getHTML());
        upcard.appendChild(this.cards[i+20].getHTML());
      }
    }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? 'black': 'red';
  }

  getHTML(){
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add('card', this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

class Euchre {
  constructor(playerCards, cpuOneCards, cpuTwoCards, cpuThreeCards, upcard) {
    this.playerCardsArray = playerCards;
    this.cpuOneCardsArray = cpuOneCards;
    this.cpuTwoCardsArray = cpuTwoCards;
    this.cpuThreeCardsArray = cpuThreeCards;
    this.upcard = upcard;
    this.score1 = document.getElementById('score1');
    this.score2 = document.getElementById('score2');
    this.deck = new Deck(); //i.e. game.deck.shuffle();
    this.cards = new Card(); // I don't think I need to use this, but it's possible.

    // this.team1 = document.getElementsByClassName('t1');
    // this.team2 = document.getElementsByClassName('t2');
  }

  get dealer() {
     // return Math.floor(Math.random() * 4); //this.dealer becomes useable after this getter function.
     return 0 //test with it always starting player as dealer.
  }

  startGame(){
    //decide dealer, shuffle deck, deal cards... decide trump?
    if (this.dealer === 0) {
      console.log('0 player is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 0;
      this.leader = 1;
      this.partner = 2;
      console.log(`leader is ${this.leader}`);
      // console.log(this.deck);

    } else if (this.dealer === 1){
      console.log('computer 1 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 1;
      this.leader = 2;
      this.partner = 3;
      console.log(`leader is ${this.leader}`);
      // i.e. computer decides to pickup or pass...
      document.getElementById('deck').style.gridRowStart='4'; //this works to change deck position!
      document.getElementById('deck').style.gridColumnStart='1';

    } else if (this.dealer === 2) {
      console.log('computer 2 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 2;
      this.leader = 3;
      this.partner = 0;
      console.log(`leader is ${this.leader}`);
      document.getElementById('deck').style.gridRowStart='1';
      document.getElementById('deck').style.gridColumnStart='6';

    } else {
      console.log('computer 3 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 3;
      this.leader = 0;
      this.partner = 1;
      console.log(`leader is ${this.leader}`);
      document.getElementById('deck').style.gridRowStart='6';
      document.getElementById('deck').style.gridColumnStart='9';
    }
  }

  startRound(){
    //pick trump, computer/player pick it up or pass first round & second round
    // this.trump = orderUp().data-value
      text.innerText = 'waiting for computer...';
      this.roundTrump = upcard.firstElementChild.dataset.value.slice(2).trim();
      this.roundValues = [];
      //if cpu orderUp === true, then dealer (computer or player)
      //must pick up the card and discard! person left of the dealer then begins playing the round
      for (var i=0; i< 4; i++) {
        if (this.orderUp() === false) { //if someone passes then next player
          continue
        } else {
          this.isLeader();
          this.cpuLead();
          this.nextPlayer();
          this.cpuLead();
          this.nextPlayer();
          this.cpuLead();
        }
      }

  //
  //     if (this.orderUp() === false) {
  //       this.isLeader();
  //       this.cpuLead();
  //       this.nextPlayer();
  //       setTimeout(() => {
  //       this.cpuLead();
  //       this.nextPlayer();
  //     }, 3000);
  //       setTimeout(() => {
  //       this.cpuLead();
  //     }, 6000);
  // } else if (this.orderUp() === false) { //aka someone passes
  //     if (this.orderUp() === true) {
  //       this.isLeader()
  //       this.cpuLead()
  //       this.nextPlayer()
  //       this.cpuLead()
  //     }
  //     else if (this.orderUp() === false) {
  //       if (this.orderUp() === true) {
  //         this.isLeader()
  //         this.cpuLead()
  //         this.nextPlayer()
  //         this.cpuLead()
  //       }
  //     }
  // }
}

  orderUp() {
    //this.leader needs to be replaced with player? how to determine which player is deciding?
      var arr = [];
      this.getPlayer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim())); //puts suits of cards in array
      var counts = {};
      arr.forEach(function(x) {counts[x] = (counts[x] || 0) + 1;}) // counts all suits in array / in cpu's hand
      console.log(counts);
      console.log(Object.keys(counts).length + ' suited');
      var numTrump = counts[upcard.firstElementChild.dataset.value.slice(2).trim()]; //gets amount of potential trump minus the left...
      if (numTrump === undefined) {
        numTrump = 0;
      }
      // this.cpuOneCardsArray.forEach(card => console.log(CARD_VALUE_MAP[card.firstElementChild.dataset.value.slice(0,2).trim()])); //get card values
      if (this.isLeft() === true) {
        numTrump = numTrump + 1;
      }
      console.log('potential trump ' + numTrump);

      if (numTrump >= 4) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && (this.isLeft() === true || this.isRight() === true) && (this.isSideAce() === true || Object.keys(counts).length <= 3)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        console.log('trump is '+this.roundTrump);
        this.orderer = this.leader;
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && this.isSideAce() === true && Object.keys(counts).length <= 3 && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && Object.keys(counts).length <= 2 && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (this.isLeft() === true && this.isRight() === true && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (this.isRight() === true && this.isLeft() === true && this.isTrumpAce() === true) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      }
      else {
        text.innerText = `Player ${this.leader} passes!`
        console.log(`Computer ${this.leader} passes!`);
        this.pass();
        return false;
      }
  }
  isPartner() { // should really be  isPARTNER DEALER
    if (this.leader === this.realdealer + 2 || this.leader === this.realdealer - 2) {
      return true; //don't need this.orderer? cuz leader is just player
    }
    else {
      return false;
    }
  }
  isOpponent() {
    if (this.leader === this.leader + 1 || this.leader === this.leader - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  pass(){
    //add pass counter for screw the dealer
    return this.nextPlayer();
  }

  discard() {

  }

  cpuLead() {
    if (this.isSideAce() === true) {
      var arr1 = [];
      this.getPlayer().forEach(card => arr1.push(card.firstElementChild.dataset.value));
      var index = arr1.indexOf('A '+ this.offSuit) // card index to play offsuit ace

      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }

      document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;



      // console.log(this.getPlayer()[index]);
      this.leadingSuit = this.getPlayer()[index].firstElementChild.dataset.value.slice(2).trim();
      // console.log(this.leadingSuit);
      return this.leadingSuit;
    } else if (this.orderer === this.leader + 2 || this.orderer === this.leader - 2) {
      //if your partner ordered up trump, lead lowest trump
      var arr2 = [];
      this.getPlayer().forEach(card => arr2.push(card.firstElementChild.dataset.value))
      //if trump in hand play lowest trump, including the left...
      var opposite = {
        "♠":"♣",
        "♣":"♠",
        "♥":"♦",
        "♦":"♥"
      };
      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }

      if (arr2.includes('9 '+this.roundTrump) === true) {
        var index = arr2.indexOf('9 '+this.roundTrump)
      } else if (arr2.includes('10 '+this.roundTrump) === true) {
        var index = arr2.indexOf('10 '+this.roundTrump)
      } else if (arr2.includes('Q '+this.roundTrump) === true) {
        var index = arr2.indexOf('Q '+this.roundTrump)
      } else if (arr2.includes('K '+this.roundTrump) === true) {
        var index = arr2.indexOf('K '+this.roundTrump)
      } else if (arr2.includes('A '+this.roundTrump) === true) {
        var index = arr2.indexOf('A '+this.roundTrump)
      } else if (arr2.includes('J '+opposite[this.roundTrump]) === true) {
        var index = arr2.indexOf('J '+opposite[this.roundTrump])
      } else if (arr2.includes('J '+this.roundTrump) === true ) {
        var index = arr2.indexOf('J '+this.roundTrump)
      } else {
        var index = 0;
      }

      document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;

      this.leadingSuit = this.getPlayer()[index].firstElementChild.dataset.value.slice(2).trim();
      // console.log(this.leadingSuit);
      return this.leadingSuit;

      // getAllIndexes(arr2, this.roundTrump);

    }  else {

      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }




      console.log(this.getPlayer()[0].id); // prints id of specific card

      document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;

      //todo:
      //finish play, pass, and play order.then onto scoring.

      //below line gets value of played card, still need to determine if trump or not...
      console.log('value '+ CARD_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()])
      this.leadingSuit = this.getPlayer()[0].firstElementChild.dataset.value.slice(2).trim();
      // console.log(this.leadingSuit);
      return this.leadingSuit;
      }
  }

  cpuPlay() {
    //reads what suit was lead and requires suit to be followed.
    var arr = [];
    var indexes = [];
    this.getPlayer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim()))
    for (var i=0; i < arr.length -1; i++){
      if (arr[i] === this.leadingSuit) {
        indexes.push(i);
      }
    }
    // if indexes.length < 1 , no trump in hand lead accordingly
    



  }


  isLeader() {
    return this.leader = this.realdealer + 1;
  }
  isLeft() {
    //used for computer to figure out if the J in their hand is considered a trump.
    //if card is a J and opposite suit of the upcard.
    // if (this.leader === 1) { //this.player
      var anyJacks = []
      var opposite = {
        "♠":"♣",
        "♣":"♠",
        "♥":"♦",
        "♦":"♥"
      };
      var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
      var left = opposite[trumpSuit];

      this.getPlayer().forEach(card => anyJacks.push((card.firstElementChild.dataset.value)));
      // console.log(anyJacks);
      // console.log(anyJacks.includes('J '+left)); //boolean
      if (anyJacks.includes('J '+left) === true) {
        // console.log(anyJacks.indexOf('J '+ left)); // index of left in hand
        return true;
      } else {
          return false;
      }
    //need to assign value to trump vs normal cards...?
}
  isRight() {
    var anyJacks = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyJacks.push(card.firstElementChild.dataset.value));
    if (anyJacks.includes('J '+trumpSuit) === true) {
      return true;
    } else {
      return false;
    }
  }
  isSideAce() {
    var anyAces = [];
    var offSuit = ["♠", "♣", "♥", "♦"]
    var countSuits = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyAces.push(card.firstElementChild.dataset.value));
    offSuit = offSuit.filter(e => e !== trumpSuit); //removes trumpsuit from "offsuit array"
    this.getPlayer().forEach(card => countSuits.push(card.firstElementChild.dataset.value.slice(2).trim()));
    var counts = {};
    for (var i = 0; i < countSuits.length; i++) {
      var num = countSuits[i];
      counts[num] = counts[num] ? counts[num] + 1: 1; //counting # of ea suit in hand
    }

    if (anyAces.includes('A '+ offSuit[0]) && counts[offSuit[0]] === 1) {
      this.offSuit = offSuit[0];
      return true;
    } else if (anyAces.includes('A '+ offSuit[1]) && counts[offSuit[1]] === 1) {
      this.offSuit = offSuit[1];
      return true;
    } else if (anyAces.includes('A '+offSuit[2]) && counts[offSuit[2]] === 1) {
      this.offSuit = offSuit[2];
      return true;
    } else {
      return false;
    }
  }
  isTrumpAce() {
    var anyAces = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyAces.push(card.firstElementChild.dataset.value));
    if (anyAces.includes('A '+trumpSuit) === true) {
      return true;
    } else {
      return false;
    }
  }


  getPlayer() {
    //used for inputing into orderUp, isleft, isright, isSideAce,  functions so
    //i don't have to do it 4 times
    if (this.leader === 0) {
      return this.playerCardsArray
    }
    else if (this.leader === 1) {
      return this.cpuOneCardsArray
    }
    else if (this.leader === 2) {
      return this.cpuTwoCardsArray
    }
    else {
      return this.cpuThreeCardsArray
    }
  }

  nextPlayer() {
    //if pass() or play() or cpulead() is called, increment currentplayer aka "leader" by 1 if 3 reset to player 0...
    //start function can reset variable to have the round's true leader (person left of dealer).
    this.leader++
    if (this.leader > 3) {
      this.leader = 0;
    }
    return this.leader
  }

  playerPickUp() {
    text.innerText = 'Choose a card to replace.';
    upcard.classList.toggle('selected');
    playerCardSlot1.classList.toggle('cselected');
    playerCardSlot2.classList.toggle('cselected');
    playerCardSlot3.classList.toggle('cselected');
    playerCardSlot4.classList.toggle('cselected');
    playerCardSlot5.classList.toggle('cselected');
    upcard.addEventListener('click', () => this.playerDiscard());

  }

  playerDiscard() {
    playerCardSlot1.addEventListener('click', () => playerCardSlot1.innerHTML = '');
    playerCardSlot1.addEventListener('click', () => upcard.classList.remove('deck'));
    playerCardSlot1.addEventListener('click', () => upcard.classList.add('player-card-slot1'));
    playerCardSlot1.addEventListener('click', () => this.stopAnimation());
    //how to fix multi-selection after trump pickup ?

    playerCardSlot2.addEventListener('click', () => playerCardSlot2.innerHTML = '');
    playerCardSlot2.addEventListener('click', () => upcard.classList.remove('deck'));
    playerCardSlot2.addEventListener('click', () => upcard.classList.add('player-card-slot2'));
    playerCardSlot2.addEventListener('click', () => this.stopAnimation());

    playerCardSlot3.addEventListener('click', () => playerCardSlot3.innerHTML = '');
    playerCardSlot3.addEventListener('click', () => upcard.classList.remove('deck'));
    playerCardSlot3.addEventListener('click', () => upcard.classList.add('player-card-slot3'));
    playerCardSlot3.addEventListener('click', () => this.stopAnimation());

    playerCardSlot4.addEventListener('click', () => playerCardSlot4.innerHTML = '');
    playerCardSlot4.addEventListener('click', () => upcard.classList.remove('deck'));
    playerCardSlot4.addEventListener('click', () => upcard.classList.add('player-card-slot4'));
    playerCardSlot4.addEventListener('click', () => this.stopAnimation());

    playerCardSlot5.addEventListener('click', () => playerCardSlot5.innerHTML = '');
    playerCardSlot5.addEventListener('click', () => upcard.classList.remove('deck'));
    playerCardSlot5.addEventListener('click', () => upcard.classList.add('player-card-slot5'));
    playerCardSlot5.addEventListener('click', () => this.stopAnimation());
  }


  // isRoundWinner(playerCard, c1Card){
  //   return CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[c1Card.value];
  // would check for trump values here...
  // }
  stopAnimation() {
    playerCardSlot1.classList.toggle('cselected');
    playerCardSlot2.classList.toggle('cselected');
    playerCardSlot3.classList.toggle('cselected');
    playerCardSlot4.classList.toggle('cselected');
    playerCardSlot5.classList.toggle('cselected');
    return true
  }

  trickTaker() {
    //quick glow animation to indicate card that takes the trick.
  }

}

function stopAnimation() {
  playerCardSlot1.classList.toggle('cselected');
  playerCardSlot2.classList.toggle('cselected');
  playerCardSlot3.classList.toggle('cselected');
  playerCardSlot4.classList.toggle('cselected');
  playerCardSlot5.classList.toggle('cselected');
}

function discard() {
  // if a card is clicked, clear the element ---function discard(elemendID) {(document.getElementById(elementid).innerHTML ='';)}
  //and replace the element's old content with the upcard.

  playerCardSlot1.addEventListener('click', () => playerCardSlot1.innerHTML = '');
  playerCardSlot1.addEventListener('click', () => upcard.classList.remove('deck'));
  playerCardSlot1.addEventListener('click', () => upcard.classList.add('player-card-slot1'));
  playerCardSlot1.addEventListener('click', () => stopAnimation());
  // playerCardSlot1.addEventListener('click', () => upcard = [playerCardSlot1, playerCardSlot1=upcard][0]);
  // console.log('after swap');
  // console.log(playerCardSlot1.innerHTML);
  // console.log(playerCardSlot1.dataset.value);
  // console.log(upcard);
  //still might need to figure out how to assign upcard to a different cardslot

  playerCardSlot2.addEventListener('click', () => playerCardSlot2.innerHTML = '');
  playerCardSlot2.addEventListener('click', () => upcard.classList.remove('deck'));
  playerCardSlot2.addEventListener('click', () => upcard.classList.add('player-card-slot2'));
  playerCardSlot2.addEventListener('click', () => stopAnimation());

  playerCardSlot3.addEventListener('click', () => playerCardSlot3.innerHTML = '');
  playerCardSlot3.addEventListener('click', () => upcard.classList.remove('deck'));
  playerCardSlot3.addEventListener('click', () => upcard.classList.add('player-card-slot3'));
  playerCardSlot3.addEventListener('click', () => stopAnimation());

  playerCardSlot4.addEventListener('click', () => playerCardSlot4.innerHTML = '');
  playerCardSlot4.addEventListener('click', () => upcard.classList.remove('deck'));
  playerCardSlot4.addEventListener('click', () => upcard.classList.add('player-card-slot4'));
  playerCardSlot4.addEventListener('click', () => stopAnimation());

  playerCardSlot5.addEventListener('click', () => playerCardSlot5.innerHTML = '');
  playerCardSlot5.addEventListener('click', () => upcard.classList.remove('deck'));
  playerCardSlot5.addEventListener('click', () => upcard.classList.add('player-card-slot5'));
  playerCardSlot5.addEventListener('click', () => stopAnimation());
}

function orderUp() {

  text.innerText = 'Pick it up or pass?'

  upcard.addEventListener('click', () => upcard.classList.toggle('selected'));
  upcard.addEventListener('click', changeText);
  upcard.addEventListener('click', () => playerCardSlot1.classList.toggle('cselected'));
  upcard.addEventListener('click', () => playerCardSlot2.classList.toggle('cselected'));
  upcard.addEventListener('click', () => playerCardSlot3.classList.toggle('cselected'));
  upcard.addEventListener('click', () => playerCardSlot4.classList.toggle('cselected'));
  upcard.addEventListener('click', () => playerCardSlot5.classList.toggle('cselected'));
  upcard.addEventListener('click', () => discard()); //discard function is called when upcard(deck) is clicked
  console.log(playerCardSlot1.innerHTML)
}


const changeText = () => {
  const text = document.querySelector('.text');
  text.innerText = 'Choose a card to discard.';
}

const revertText = () => {
  const text = document.querySelector('.text');
  text.innerText = 'Pick it up or pass?';
}

text.innerText = 'Pick it up or pass?';

function pass() {
  passButton.addEventListener('click', () => passButton.style.display='none');
  passButton.addEventListener('click', () => upcard.style.display='none');
  // passButton.addEventListener('click', () => upcard.classList.toggle('back-of-card'));
  // text.innerText = 'You pass. Waiting for Computer';
}

function ready() {
  //add overlays to start game and when user wins/loses game later
  let playerCards = Array.from(document.getElementsByClassName('p1'));
  let cpuOneCards = Array.from(document.getElementsByClassName('c1'));
  let cpuTwoCards = Array.from(document.getElementsByClassName('c2'));
  let cpuThreeCards = Array.from(document.getElementsByClassName('c3'));
  let upcard = document.getElementById('deck');

  let game = new Euchre(playerCards, cpuOneCards, cpuTwoCards, cpuThreeCards, upcard);
  game.startGame();
  game.startRound();


  }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
