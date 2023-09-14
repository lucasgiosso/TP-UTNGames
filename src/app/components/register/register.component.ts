import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
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
  public btnVolver = 'Volver a login';

  constructor(
    private userService: UserService,
    private router: Router)
    // private route: ActivatedRoute)
  {
    this.formReg = new FormGroup({email: new FormControl(), password: new FormControl()})
  }

  ngOnInit() : void{}

  onSubmit() {
    const { email, password } = this.formReg.value;

    if (email && password) {

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
