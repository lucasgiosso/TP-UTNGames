import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

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

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorMensaje = 'Error al iniciar sesión: ' + error;
        console.log(error);
      });
  }
}
