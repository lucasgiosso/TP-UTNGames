import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

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
  {
    this.formReg = new FormGroup({email: new FormControl(), password: new FormControl()})
  }

  ngOnInit() : void{}

  onSubmit() 
  {
    this.userService.register(this.formReg.value)
    .then(response => {console.log(response);
    this.router.navigate(['/home'])
    })
    .catch(error =>console.log(error));
  }

  public onClick(event: any): void 
  {
    this.router.navigate(['/login']);
    console.log(event);
  }
}
