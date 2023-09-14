import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
// import 'animate.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;
  errorMensaje: string = '';

  constructor(private userService: UserService,
    private router: Router) 
  {
    this.formLogin = new FormGroup({email: new FormControl(), password: new FormControl()})
  }

  ngOnInit(): void{}

  onRegister() 
  {
    this.router.navigate(['/register'])
    .then(response => {console.log(response);
          this.router.navigate(['/register'])})
    .catch(error =>console.log(error));
  }

  // onSubmit() {
  //   this.userService.login(this.formLogin.value)
  //     .then(response => {
  //       console.log(response);
  //       this.router.navigate(['/home']);
  //     })
  //     .catch(error => {
  //       //this.errorMensaje = 'Error al iniciar sesión: ' + error;
  //       console.log(error);

  //       Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
  //       });
  //     });
  //   }

    onSubmit() {
      this.userService.login(this.formLogin.value)
        .then(response => {
          console.log(response);

          Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
              text: '¡Bienvenido!',
              confirmButtonText: 'OK'
          }).then(() => {
              this.router.navigate(['/home']);
          });
        })
        .catch(error => {
          console.log(error);
  
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
          });
        });
    }

    // onSubmit() {
    //   this.userService.login(this.formLogin.value)
    //     .then(response => {
    //       console.log(response);
    
    //       Swal.fire({
    //         title: 'Inicio de sesión exitoso',
    //         text: '¡Bienvenido!',
    //         icon: 'success',
    //         showClass: {
    //           popup: 'animate__animated animate__zoomIn' // Clase de animación para mostrar
    //         },
    //         hideClass: {
    //           popup: 'animate__animated animate__zoomOut' // Clase de animación para ocultar
    //         },
    //         confirmButtonText: 'OK'
    //       }).then(() => {
    //         this.router.navigate(['/home']);
    //       });
    //     })
    //     .catch(error => {
    //       this.errorMensaje = 'Error al iniciar sesión: ' + error;
    //       console.log(error);
    
    //       Swal.fire({
    //         title: 'Error al iniciar sesión',
    //         text: 'Por favor, verifica tu correo electrónico y contraseña.',
    //         icon: 'error',
    //         showClass: {
    //           popup: 'animate__animated animate__shakeX' // Clase de animación para mostrar el error
    //         },
    //         hideClass: {
    //           popup: 'animate__animated animate__fadeOut' // Clase de animación para ocultar el error
    //         }
    //       });
    //     });
    // }
}
