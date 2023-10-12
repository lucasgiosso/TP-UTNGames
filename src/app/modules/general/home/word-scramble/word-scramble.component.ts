import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

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
  title = "";
  btnVolver = 'Volver a Home';
  currentUser$: Observable<User | null>;
  isDropdownOpen = false;
  showLogoutButton = false;

  words: Word[] = [
    {
      word: "sumar",
      hint: "El proceso de agregar numeros"
    },
    {
      word: "encuentro",
      hint: "Evento en el que se reúnen personas"
    },
    {
      word: "numero",
      hint: "Simbolo matematico usado para contar"
    }
  ];

  constructor(
    private userService: UserService, private auth: Auth,
    private router: Router) {this.currentUser$ = this.userService.getCurrentUser();}

  ngOnInit(): void {
    this.wordText = document.querySelector(".word");
    this.hintText = document.querySelector(".hint span");
    this.timeText = document.querySelector(".time b");
    this.inputField = document.querySelector("input");
    this.refreshBtn = document.querySelector(".refresh-word");
    this.checkBtn = document.querySelector(".check-word");
    this.currentUser$ = this.userService.getCurrentUser();
    this.refreshBtn?.addEventListener("click", () => {
      this.initGame();
    });
    
    this.checkBtn?.addEventListener("click", () => {
      this.checkWord();
    });

    this.initGame();
  }

  public onClick(event: any): void {
    this.stopTimer();
    this.router.navigate(['/home']);
    //console.log(event);
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

  clearInputField(): void {
    if (this.inputField) {
      this.inputField.value = '';
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
        title: 'Mmmm... no',
        text: `${userWord} no es la palabra correcta.`,
      });
      this.clearInputField();
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
          title: 'Uh...perdiste',
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.showLogoutButton = this.isDropdownOpen; 
  }


  async logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Lamentamos que quieras salir...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('Route link clicked: logout');
          await this.auth.signOut();
          this.stopTimer();
          this.router.navigate(['/login']);
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      } else {
        this.router.navigate(['/home/word-scramble']);
      }
    });
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

}