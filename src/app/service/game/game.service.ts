import { Injectable } from '@angular/core';
import { Card } from '../../component/game/cards/cards.class';
import { Cards } from '../../component/game/cards/cards';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  isOver = new BehaviorSubject<boolean>(false);
  shuffledCards: Card[];
  cards: Card[] = [];
  openCards: Card[];
  flippedCards: number;
  moves: number;

  constructor() {
  }
  clearAll() {
    if (this.cards.length) {
      this.cards.map(card => {
        card.flipped = false;
      });
    }

    this.isOver.next(false);
    this.openCards = [];
    this.flippedCards = 0;
    this.moves = 0;
    this.cards = [];
  }

  startGame(level) {
    this.shuffledCards = shuffle(Cards);

    this.shuffledCards = this.shuffledCards.slice(0, level / 2);
    this.clearAll();

    this.shuffledCards.map(card => {
      // this.cards = [...card, ...card];
      this.cards.push(card);
      this.cards.push(Object.assign({}, card));
      this.cards = shuffle(this.cards);
    });
  }

  flipCard(card: Card) {
    if (!card.flipped && this.openCards.length < 2) {

      if (this.openCards.length === 0) {
        this.openCards.push(card);
        this.openCards[0].flipped = true;
      } else if (this.openCards.length === 1) {
        this.moves++;

        this.openCards.push(card);
        this.openCards[1].flipped = true;

        if (this.openCards[0].name === this.openCards[1].name) {
          this.flippedCards += 2;
          this.openCards = [];

          if (this.flippedCards === this.cards.length) {
            this.isOver.next(true);
          }
        } else {
          setTimeout(() => {
            this.openCards[0].flipped = false;
            this.openCards[1].flipped = false;
            this.openCards = [];
          }, 700);
        }
      }
    }
  }
}

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
