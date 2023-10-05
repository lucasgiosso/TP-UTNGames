import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import Swal from 'sweetalert2';

interface Word {
  word: string;
  hint: string;
}

@Component({
  selector: 'app-word-scramble',
  templateUrl: './word-scramble.component.html',
  styleUrls: ['./word-scramble.component.scss']
})
export class WordScrambleComponent implements OnInit {
  wordText: HTMLElement | null = null;
  hintText: HTMLElement | null = null;
  timeText: HTMLElement | null = null;
  inputField: HTMLInputElement | null = null;
  refreshBtn: HTMLElement | null = null;
  checkBtn: HTMLElement | null = null;

  correctWord = '';
  timer: any;

  words: Word[] = [
    {
      word: "sumar",
      hint: "El proceso de agregar numeros"
    },
    {
      word: "meeting",
      hint: "Evento en el que se reúnen personas"
    },
    {
      word: "numero",
      hint: "Simbolo matematico usado para contar"
    }
  ];

  ngOnInit(): void {
    this.wordText = document.querySelector(".word");
    this.hintText = document.querySelector(".hint span");
    this.timeText = document.querySelector(".time b");
    this.inputField = document.querySelector("input");
    this.refreshBtn = document.querySelector(".refresh-word");
    this.checkBtn = document.querySelector(".check-word");

    this.refreshBtn?.addEventListener("click", () => {
      this.initGame();
    });
    
    this.checkBtn?.addEventListener("click", () => {
      this.checkWord();
    });

    this.initGame();
  }

  initGame(): void {
    this.initTimer(30);
    const randomObj = this.words[Math.floor(Math.random() * this.words.length)];
    const wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    if (this.wordText && this.hintText) {
      this.wordText.innerText = wordArray.join("");
      this.hintText.innerText = randomObj.hint;
    }
    this.correctWord = randomObj.word.toLowerCase();
    if (this.inputField) {
      this.inputField.value = "";
    }
  }

  checkWord(): void {
    if (!this.inputField) {
      Swal.fire({
        icon: 'error',
        title: 'Uh...',
        text: 'Por favor, ingrese la palabra para chequear!',
      });
      return;
    }
    const userWord = this.inputField.value.toLowerCase();
    
    if (userWord !== this.correctWord) 
    {
      Swal.fire({
        icon: 'error',
        title: 'Uh...',
        text: `Uh! ${userWord} no es la palabra correcta.`,
      });
    } 
    else {
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones!',
        text: `${this.correctWord.toUpperCase()} es la palabra correcta.`,
      });
    this.initGame();
  }
  }
  refreshGame(): void {
    this.initGame();
  }

  // initTimer(maxTime: number): void {
  //   clearInterval(this.timer);
  //   this.timer = setInterval(() => {
  //     if (maxTime > 0) {
  //       maxTime--;
  //       if (this.timeText) {
  //         this.timeText.innerText = maxTime.toString();
  //       }
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: `Time's up! ${this.correctWord.toUpperCase()} was the correct word.`,
  //       });
  //       this.initGame();
  //     }
  //   }, 1000);
  // }

  async initTimer(maxTime: number): Promise<void> {
    clearInterval(this.timer);
    let timeUp = false;
  
    this.timer = setInterval(async () => {
      if (maxTime > 0 && !timeUp) {
        maxTime--;
        if (this.timeText) {
          this.timeText.innerText = maxTime.toString();
        }
      } else if (!timeUp) {
        timeUp = true;
        const swalResult = await Swal.fire({
          icon: 'error',
          title: 'Uh...',
          text: `Tiempo finalizado! ${this.correctWord.toUpperCase()} era la palabra correcta.`,
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
  
        if (swalResult.isConfirmed) {
          this.initGame();
        }
      }
    }, 1000);
  }

}