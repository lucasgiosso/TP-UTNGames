import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, timer, takeUntil , Subject,of  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth, User } from '@angular/fire/auth'
import { UserService } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {
  
  title = "Preguntados";
  explicacion = "Presiona el boton para que aparezca tu pregunta."
  isDropdownOpen = false;
  paises: any[] = [];
  showLogoutButton = false;
  currentUser$: Observable<User | null>;
  btnVolver = 'Volver a Home';
  gameActive: boolean = true;
  data: any[] = [];
  timeIsUpAlertShown: boolean = false;
  questionText: string = '';
  answerText: string = '';
  secondsLeft: number = 40; 
  timer$: Observable<number> = timer(0, 1000);
  destroy$: Subject<void> = new Subject<void>();
  userAnswer: string = '';
  isAnswered: boolean = false;
  score: number = 0;
  answerOptions: string[] = [];
  selectedPregunta: string = '';
  private isSpinning: boolean = false;
  showRoulette = true;
  sectorImages: string[] = [];
  timer: any;
  
  preguntas = [
    {
      nombre:'France',
      pregunta: '¿Cuál es la capital de Francia?',
      respuestaCorrecta: 'París',
      respuestaIncorrecta1: 'Londres',
      respuestaIncorrecta2: 'Berlín',
      respuestaIncorrecta3: 'Madrid',
      sector: 1, 
      flagUrl:'https://flagcdn.com/fr.svg'

    },
    {
      nombre:'Argentina',
      pregunta: '¿Cuál es la capital de Argentina?',
      respuestaCorrecta: 'Buenos Aires',
      respuestaIncorrecta1: 'Chile',
      respuestaIncorrecta2: 'Rosario',
      respuestaIncorrecta3: 'Rio Negro',
      sector: 2, 
      flagUrl:'https://flagcdn.com/ar.svg'

    },
    {
      nombre:'Germany',
      pregunta: '¿Cuál es la capital de Alemania?',
      respuestaCorrecta: 'Berlín',
      respuestaIncorrecta1: 'Kabul',
      respuestaIncorrecta2: 'Argel',
      respuestaIncorrecta3: 'Viena',
      sector: 3, 
      flagUrl:'https://flagcdn.com/de.svg'

    },
    {
      nombre:'Albania',
      pregunta: '¿Cuál es la capital de Albania?',
      respuestaCorrecta: 'Tirana',
      respuestaIncorrecta1: 'Luanda',
      respuestaIncorrecta2: 'Ereván',
      respuestaIncorrecta3: 'Camberra',
      sector: 4, 
      flagUrl:'https://flagcdn.com/al.svg'

    },
    {
      nombre:'Belgium',
      pregunta: '¿Cuál es la capital de Bélgica?',
      respuestaCorrecta: 'Bruselas',
      respuestaIncorrecta1: 'Belmopán',
      respuestaIncorrecta2: 'Camberra',
      respuestaIncorrecta3: 'Gaborone',
      sector: 5, 
      flagUrl:'https://flagcdn.com/be.svg'

    },
    {
      nombre:'Brazil',
      pregunta: '¿Cuál es la capital de Brasil?',
      respuestaCorrecta: 'Brasilia',
      respuestaIncorrecta1: 'Uagadugú',
      respuestaIncorrecta2: 'Guitega',
      respuestaIncorrecta3: 'Timbu',
      sector: 6, 
      flagUrl:'https://flagcdn.com/br.svg'

    },
    {
      nombre:'Canada',
      pregunta: '¿Cuál es la capital de Canadá?',
      respuestaCorrecta: 'Ottawa',
      respuestaIncorrecta1: 'Doha',
      respuestaIncorrecta2: 'Yamena',
      respuestaIncorrecta3: 'Praia',
      sector: 7, 
      flagUrl:'https://flagcdn.com/ca.svg'
    },
  ];
  
  constructor(private userService: UserService, private auth: Auth,
    private router: Router, private apiService : ApiService, private http: HttpClient) 
    {
      this.currentUser$ = this.userService.getCurrentUser();
      this.obtenerDatosDeTodosLosPaises();
    }
  
  ngOnInit() {
    this.apiService.obtenerPaises();
    this.startTimer();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  obtenerDatosDeTodosLosPaises() {
    const paisesSeleccionados = ['Argentina', 'Francia', 'Albania', 'Bélgica', 'Brasil', 'Canadá', 'Alemania'];
    this.paises = this.paises.filter(pais => paisesSeleccionados.includes(pais.name));
  }
  
  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
  }

  getFlagUrlForSector(sector: number): Observable<string | undefined> {
    const sectorInfo = this.preguntas.find(info => info.sector === sector);
    if (sectorInfo) {
      return this.http.get<string>(sectorInfo.flagUrl);
    }
    return of(undefined); 
  }

  checkAnswer(selectedAnswer: string) {
    const currentQuestion = this.preguntas.find(question => question.pregunta === this.questionText);
  
    if (currentQuestion) {
      if (selectedAnswer === currentQuestion.respuestaCorrecta) {
        this.increaseScore(10);
        this.gameActive = false;
        this.resetGame();
        
        Swal.fire({
          icon: 'success',
          title: '¡Respuesta correcta!',
          text: 'Has ganado puntos.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.resetGame();
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Respuesta incorrecta',
          html: `La respuesta correcta es: <strong>${currentQuestion.respuestaCorrecta}</strong>`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.resetGame();
        });
      }
    }
  
    this.isAnswered = true;
  }

  getScore(): number {
    return this.score;
  }

  increaseScore(points: number): void {
    this.score += points;
  }

  spinRoulette() {
    if (this.isSpinning) {
      return;
    }
  
    const spinButton = document.querySelector('.spin-button') as HTMLButtonElement;
  
    if (spinButton) {
      this.isSpinning = true;
      spinButton.disabled = true;
  
      const roulette = document.querySelector('.roulette') as HTMLElement;
  
      if (roulette) {
        roulette.style.transition = 'none';
        const currentRotation = roulette.style.transform;
        const matches = currentRotation.match(/-?\d+/);
        const currentRotationValue = matches ? parseInt(matches[0]) : 0;
  
        const numSectors = 7;
  
        const randomRotations = 2 + Math.floor(Math.random() * 2);
  
        const totalRotation = 360 * randomRotations + Math.floor(Math.random() * 360);
  
        const degreesPerSector = totalRotation / numSectors;
  
        const rotationValue = currentRotationValue + totalRotation;
  
        roulette.style.transition = 'transform 4s ease-in-out';
        roulette.style.transform = `rotate(${rotationValue}deg`;
  
        setTimeout(() => {
          const randomSector = Math.floor(Math.random() * 7) + 1;
  
          const selectedQuestion = this.preguntas.find(
            (item) => item.sector === randomSector
          );

          console.log('Random Sector:', randomSector);
          console.log('Selected Question:', selectedQuestion);
  
          if (selectedQuestion) {
            
            this.selectedPregunta = selectedQuestion.pregunta;
            this.answerOptions = this.getAnswerOptionsForQuestion(selectedQuestion);
            this.showRoulette = false;
            this.isAnswered = true;
            this.loadQuestionAutomatically();
            this.gameActive = true;
            this.startTimer();
          }
  
          this.isSpinning = false;
          spinButton.disabled = false;
        }, 4000);
      }
    }
  }

  loadQuestionAutomatically() {

    const randomIndex = Math.floor(Math.random() * this.preguntas.length);
    const selectedQuestion = this.preguntas[randomIndex];
    
    if (selectedQuestion) {
      this.questionText = selectedQuestion.pregunta;
      this.answerOptions = this.getAnswerOptionsForQuestion(selectedQuestion);
    }
    this.secondsLeft = 40;
    this.startTimer();
  }

  resetGame() {
    this.questionText = '';
    this.answerOptions = [];
    this.isAnswered = false;
    this.showRoulette = true;
    this.gameActive = true;
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer$ = timer(0, 1000).pipe(
      takeUntil(this.destroy$)
    );
  
    this.timer$.subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        this.timeIsUp();
      }
    });
  }

  timeIsUp() {

    if (!this.isAnswered) {
      const currentQuestion = this.preguntas.find(question => question.pregunta === this.questionText);
      if (currentQuestion) {
        Swal.fire({
          icon: 'info',
          title: '¡Se acabó el tiempo!',
          text: 'La respuesta correcta es: ' + currentQuestion.respuestaCorrecta,
          confirmButtonText: 'OK',
        }).then(() => {
          this.spinRoulette();
        });
      } else {

      }
    }
  }

  getAnswerOptionsForQuestion(question: any): string[] {
    const answers = [
      question.respuestaCorrecta,
      question.respuestaIncorrecta1,
      question.respuestaIncorrecta2,
      question.respuestaIncorrecta3
    ];
  
    const randomComparator = () => Math.random() - 0.5;
  
    const shuffledAnswers = answers.sort(randomComparator);
  
    return shuffledAnswers;
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
        this.router.navigate(['/home/preguntados']);
      }
    });
  }
}