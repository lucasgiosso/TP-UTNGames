import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formReg: FormGroup;
  public btnVolver = 'Volver a iniciar sesión';

  constructor(
    private userService: UserService,
    private router: Router)
    // private route: ActivatedRoute)
  {
    this.formReg = new FormGroup({email: new FormControl(), password: new FormControl(), confirmPassword: new FormControl()})
  }

  ngOnInit() : void{

  }

  onSubmit() {

    if (this.formReg.invalid) {
      
      return;
    }

    const passwordControl = this.formReg.get('password');
    const confirmPasswordControl = this.formReg.get('confirmPassword');
    const { email, password, confirmPassword } = this.formReg.value;
    
    if (email && password && confirmPassword) {

      if (password !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la contraseña',
          text: 'Las contraseñas no coinciden. Por favor, verifica.',
        })
      }
  
      this.userService.checkIfUserExists(email).then((userExists) => {
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
          this.userService.register(this.formReg.value)
            .then(response => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Bienvenido!',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/home']);
              });
            })
            .catch(error => console.log(error));
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
    }
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/login']);
    console.log(event);
  }
}
