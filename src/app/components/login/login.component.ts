import { Component } from '@angular/core';
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
export class LoginComponent {

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
    this.formLogin = new FormGroup({email: new FormControl(), password: new FormControl()})
    this.formLogin = this.fb.group({email: [''], password: ['']});
  }

  ngOnInit(): void {

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
      .catch(error => {
        console.log(error);

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
        });
      });
  }

  loginLoad(): void{
    this.formLogin.setValue({email: this.defaultEmail, password: this.defaultPassword});
  }
}
