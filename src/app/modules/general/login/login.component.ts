import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formLogin: FormGroup;
  errorMensaje: string = '';
  currentUser: User | null = null;
  defaultEmail = 'admin@utngames.com';
  defaultPassword = '1234567';
  email: string = '';
  password: string = '';


  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) 

  {
    //this.formLogin = new FormGroup({email: new FormControl(), password: new FormControl()})
    this.formLogin = this.fb.group({email: [''], password: ['']});
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({email: [''], password: ['']});
  }

  onRegister() 
  {
    this.router.navigate(['/register'])
    .then(response => {console.log(response);
          this.router.navigate(['/register'])})
    .catch(error =>console.log(error));
  }

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
      .catch((error: any) => {
        console.error(error);
        let errorMessage = 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'El correo electrónico no existe. Por favor, verifica.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'La contraseña es incorrecta. Por favor, verifica.';
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
        });
    });
}

  loginLoad(): void{
    this.formLogin.setValue({email: this.defaultEmail, password: this.defaultPassword});
  }
}
