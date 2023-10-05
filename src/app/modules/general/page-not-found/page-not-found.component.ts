import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit{

  public btnVolver = 'Volver';

  constructor(private userService: UserService, private location: Location) {}

    ngOnInit() : void{
    
  }

  // public onClick(event: any): void {
    
  //   if (this.userService.getCurrentUser()) {
  //     this.location.go('/home');
  //   } else {
      
  //     this.location.back();
  //   }
  // }
  
  public onClick(event: any): void {
  
      this.location.back();
  }
}
