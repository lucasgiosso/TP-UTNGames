import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayoromenor',
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.scss']
})
export class MayoromenorComponent implements OnInit {
  
  title = "";
  btnVolver = 'Volver a Home';
  currentCard: number = 0;
  nextCard: number = 0;
  lastCard: number | null = null;
  currentUser$: Observable<User | null>;
  resultMessageText: string = ''; 
  score: number = 0;
  isDropdownOpen = false;
  showLogoutButton = false;
  @ViewChild('resultMessage', { static: false }) resultMessageElement: ElementRef | undefined;

  constructor(
    private userService: UserService, private auth: Auth,
    private router: Router) {this.currentUser$ = this.userService.getCurrentUser();}
    
    ngOnInit() {
      this.currentUser$ = this.userService.getCurrentUser();
      this.startGame();
    }

  startGame() {
    this.title = "Juego del Mayor o Menor";
    this.currentCard = this.getRandomCard();
    this.nextCard = this.getRandomCard();
    this.resultMessageText = '';
  }

  getRandomCard(): number {
    let card: number;
    do {
      card = Math.floor(Math.random() * 10) + 1;
    } while (card === this.lastCard);
  
    this.lastCard = card; 
    return card;
  }

  makeGuess(guess: 'mayor' | 'menor') {
    this.nextCard = this.getRandomCard();

    if ((guess === 'mayor' && this.nextCard > this.currentCard) ||
        (guess === 'menor' && this.nextCard < this.currentCard)) {
      this.resultMessageText = '¡Correcto!'; 
      this.score++;
    } else {
      this.resultMessageText = '¡Incorrecto!'; 
    }

    this.currentCard = this.nextCard;

    this.showResult();
  }

  showResult() {

    this.resultMessageElement?.nativeElement.classList.add('show');
    setTimeout(() => {

      this.resultMessageElement?.nativeElement.classList.remove('show');
    }, 1000);
  }

  public onClick(event: any): void {
    this.router.navigate(['/home']);
    //console.log(event);
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
          this.router.navigate(['/login']);
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      } else {
        this.router.navigate(['/home/mayorOMenor']);
      }
    });
  }
}
