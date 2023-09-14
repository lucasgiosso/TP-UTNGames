import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.scss']
})
export class QuiensoyComponent {

  public btnVolver = 'Volver a Home';

  constructor(
    private userService: UserService,
    private router: Router)
    {}
  public onClick(event: any): void 
  {
    this.router.navigate(['/home']);
    console.log(event);
  }
}
