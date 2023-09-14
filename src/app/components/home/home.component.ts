import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './home-data';
import { UserService } from 'src/app/user.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false;
    screenWidth = 0;
    navData = navbarData;
    currentUser: any;

    constructor(private auth: Auth,
      private userService: UserService,
      private router: Router) { }

    @HostListener('window:resize', ['$event'])
    onResize(event: any){
      this.screenWidth = window.innerWidth;
      if (this.screenWidth <= 768) {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
    }

    ngOnInit(): void {
      this.screenWidth = window.innerWidth;
    }

    toggleCollapse(): void{
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    closeSidenav(): void{
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    handleNavigation(routeLink: string) {
      console.log('Route Link Clicked:', routeLink);
      if (routeLink === 'logout') {
        this.logout();
      }
    }

    logout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Lamentamos que quieras salir...',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir'
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(this.auth).then(() => {
            this.router.navigate(['/login']);
          });
        }
      });
    }
}
