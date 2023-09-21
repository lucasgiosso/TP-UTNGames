import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
import { User } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { addDoc,getFirestore, Firestore, collection, doc, setDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

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
    //this.formLogin = new FormGroup({email: new FormControl(), password: new FormControl()})
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
      .catch((error: any) => {
          console.error(error);
          if (error.code === 'auth/user-not-found') {
            Swal.fire({
              icon: 'error',
              title: 'Error en el correo electrónico',
              text: 'El correo electrónico no existe. Por favor, verifica.',
            });
          } else if (error.code === 'auth/wrong-password') {
            Swal.fire({
              icon: 'error',
              title: 'Error en la contraseña',
              text: 'La contraseña es incorrecta. Por favor, verifica.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
            });
          }
        });
  }

  // onSubmit() {
  //   if (this.formLogin.invalid) {
  //     return;
  //   }

  //   const { email, password } = this.formLogin.value;

  //   const auth = getAuth(); 

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential: any) => {
  //       const user = userCredential.user;

  //       if (user) {
  //         const userId = user.uid;
  //         const loginDate = new Date().toISOString();

  //         const firestore = getFirestore(); 
  //         const userLoginsRef = collection(firestore, 'userLogins');
  //         const userLoginDocRef = doc(userLoginsRef, userId);

  //         setDoc(userLoginDocRef, {
  //           userId,
  //           loginDate
  //         })
  //           .then(() => {
  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Inicio de sesión exitoso',
  //               text: '¡Bienvenido!',
  //               confirmButtonText: 'OK'
  //             }).then(() => {
  //               this.router.navigate(['/home']);
  //             });
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.error(error);

  //       if (error.code === 'auth/invalid-email') {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error en el correo electrónico',
  //           text: 'El correo electrónico es inválido. Por favor, verifica.',
  //         });
  //       } else if (error.code === 'auth/wrong-password') {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error en la contraseña',
  //           text: 'La contraseña es incorrecta. Por favor, verifica.',
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
  //         });
  //       }
  //     });
  // }

  loginLoad(): void{
    this.formLogin.setValue({email: this.defaultEmail, password: this.defaultPassword});
  }
}
