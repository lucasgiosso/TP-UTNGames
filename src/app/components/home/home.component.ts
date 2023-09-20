import { Component, EventEmitter, HostListener, OnInit, Output, ElementRef } from '@angular/core';
import { navbarData } from './home-data';
import { UserService } from 'src/app/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
    currentUser$: Observable<User | null>;
    isDropdownOpen = false;
    showLogoutButton = false;

    constructor(private auth: Auth,
      private userService: UserService,
      private router: Router, private el: ElementRef){
        this.currentUser$ = this.userService.getCurrentUser();
      }
      
      // @HostListener('document:click', ['$event'])
      // onClick(event: MouseEvent) {
      //   console.log('Document Click Event');
      //   if (
      //     !this.el.nativeElement.contains(event.target) ||
      //     ((event.target as HTMLElement).classList.contains('navbar-custom') || 
      //       (event.target as HTMLElement).classList.contains('dropdown-content'))
      //   ) {
      //     this.isDropdownOpen = false;
      //     console.log('Dropdown closed');
      //   }
      // }

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

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.showLogoutButton = this.isDropdownOpen; 
    }

    async logout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Lamentamos que quieras salir...',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.auth.signOut();
            this.router.navigate(['/login']);
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
        } else {
          this.router.navigate(['/home']);
        }
      });
    }
    // logout() {
    //   Swal.fire({
    //     title: '¿Estás seguro?',
    //     text: 'Lamentamos que quieras salir...',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Sí, salir'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       signOut(this.auth).then(() => {
    //         this.router.navigate(['/login']);
    //       });
    //     } 
    //     else{
    //       this.router.navigate(['/home']);
    //     }
    //   });
    // }

    userLogged() {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          console.log(user?.email);
        },
        (error) => {
          console.error('Error al obtener el usuario actual:', error);
        }
      );
    }
}
