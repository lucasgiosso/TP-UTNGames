import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {
  
  title = "";
  public btnVolver = 'Volver a Home';
  palabrasSecretas : string[] = ["CASA", "AUTO", "ARBOL", "CIELO", "GATO"];
  palabraSecreta: string = "";
  palabraOculta : string = "";
  palabraOcultaArreglo : string = "";
  intentos = 0;
  gano = false;
  perdio = false;
  letras = [
    "a","b","c","d","e","f","g","h","i","j","k",
    "l","m","n","o","p","q","r","s","t","u","v",
    "w","x","y","z"
  ];

  ngOnInit() {
    
    this.iniciarNuevoJuego();
  }
  
  constructor(private router: Router) {
    
   
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
    console.log(event);
  }
  
  elegirPalabraSecreta() {
    const indiceAleatorio = Math.floor(Math.random() * this.palabrasSecretas.length);
    this.palabraSecreta = this.palabrasSecretas[indiceAleatorio];
    console.log(this.palabraSecreta);
  }
  
  iniciarNuevoJuego() {
    
    this.elegirPalabraSecreta(); 

    this.palabraOculta = "_ ".repeat(this.palabraSecreta.length);
    
    this.title = "Juego del Ahorcado";
    this.intentos = 0;
    this.gano = false;
    this.perdio = false;
    this.letras = [
      "a","b","c","d","e","f","g","h","i","j","k",
      "l","m","n","o","p","q","r","s","t","u","v",
      "w","x","y","z"
    ];
  }
  
  comprobar(letra: string) {
    
    this.existeLetra(letra);

    let palabraOcultaArreglo = this.palabraOculta.split(" ");
  

    for (let i = 0; i < this.palabraSecreta.length; i++) {
      if (this.palabraSecreta[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }

    this.palabraOculta = palabraOcultaArreglo.join(" ");
    console.log(`Letra adivinada: ${letra}`);
    console.log(`Palabra oculta actualizada: ${this.palabraOculta}`);
    this.verificaGanador();

  }

  verificaGanador() {

    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");
      
    if (palabraEvaluar === this.palabraSecreta) {
      this.gano = true;
      this.mostrarMensajeGanador();
    }
    if (this.intentos === 9) {
      this.perdio = true;
      this.mostrarMensajePerdedor();
    }
  }

  mostrarMensajeGanador() {
    Swal.fire({
      icon: 'success',
      title: '¡Ganaste!',
      text: 'Has adivinado la palabra correctamente.',
      showCancelButton: true,
      cancelButtonText: 'Volver a jugar',
      confirmButtonText: 'Salir',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        this.iniciarNuevoJuego();
      } else if (result.isConfirmed) {

        this.router.navigate(['/home']);
      }
    });
  }
  
  mostrarMensajePerdedor() {
    
    Swal.fire({
      icon: 'error',
      title: '¡Perdiste!',
      text: 'Has agotado tus intentos.',
      html: `La palabra correcta era: <strong>${this.palabraSecreta}</strong>`,
      showCancelButton: true,
      cancelButtonText: 'Volver a jugar',
      confirmButtonText: 'Salir',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        this.iniciarNuevoJuego();
      } else if (result.isConfirmed) {

        this.router.navigate(['/home']);
      }
    });
  
  }

  existeLetra(letra: string) {

    const letraMinuscula = letra.toLowerCase();
    const palabraSecretaMinuscula = this.palabraSecreta.toLowerCase();
  
    if (palabraSecretaMinuscula.includes(letraMinuscula)) {

    } else {
      this.intentos++;
    }
  }
}