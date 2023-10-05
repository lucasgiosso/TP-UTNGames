import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  formReg: FormGroup;
  hidePassword: boolean = true; 
  public btnVolver = 'Volver a iniciar sesión';

  constructor(
    private userService: UserService,
    private router: Router)
  {
    this.formReg = new FormGroup({email: new FormControl(), password: new FormControl(), confirmPassword: new FormControl()})
    // this.formReg = new FormGroup({
    //   email: new FormControl('', [Validators.email, Validators.required]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   confirmPassword: new FormControl('', [Validators.required])
    // });
  }

  ngOnInit() : void{}

    togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmit() {
    
    if (this.formReg.invalid) {
      return;
    }

    const passwordControl = this.formReg.get('password');
    const confirmPasswordControl = this.formReg.get('confirmPassword');
    const { email, password, confirmPassword } = this.formReg.value;
  
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la contraseña',
        text: 'Las contraseñas no coinciden. Por favor, verifica.',
      }).then(() => {
        if (passwordControl && confirmPasswordControl) {
          passwordControl.reset();
          confirmPasswordControl.reset();
        }
      });
      return;
    }
  
    try {
      const userExists = await this.userService.checkIfUserExists(email);
  
      if (userExists) {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario existente',
                  text: 'El correo electrónico ya está registrado. Inicia sesión en lugar de registrarte.',
                }).then(() => {
                  if (passwordControl && confirmPasswordControl) {
                    passwordControl.reset();
                    confirmPasswordControl.reset();
                  }
                });
      } else {

        const userCredential = await this.userService.register(email, password);
  
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Bienvenido!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    } catch (error: any) {

      if (error.code === 'auth/invalid-email') {
        Swal.fire({
          icon: 'error',
          title: 'Error en el correo electrónico',
          text: 'El formato del correo electrónico es incorrecto. Por favor, verifica.',
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña débil',
          text: 'La contraseña es demasiado débil. Debe contener al menos 6 caracteres.',
        }).then(() => {
          if (passwordControl && confirmPasswordControl) {
            passwordControl.reset();
            confirmPasswordControl.reset();
          }
        });
      } else {
        console.error('Error en el registro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un error al registrar tu cuenta. Por favor, verifica tus datos.',
        }).then(() => {
          if (passwordControl && confirmPasswordControl) {
            passwordControl.reset();
            confirmPasswordControl.reset();
          }
        });
      }
    }
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/login']);
    console.log(event);
  }
}
