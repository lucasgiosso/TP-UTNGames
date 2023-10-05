import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SalaDeJuegos';

  constructor(){}

  ngOnInit(): void {

    // firebase.initializeApp({
      
    //   apiKey: "AIzaSyBZOj2JN99O-Pz74t-0MJ1OXhb4PeopHMI",

    //   authDomain: "tp-sala-de-juegos-diazgiossol.firebaseapp.com",}
    // )
  }

    isSideNavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav(data: SideNavToggle): void{
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
  }
}
