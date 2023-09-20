// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable } from "rxjs";
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { User, UserCredential, signInWithEmailAndPassword, Auth } from 'firebase/auth';

// interface LoginRequest {
//     email: string;
//     password: string;
//   }


// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//     currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   currentUserData: BehaviorSubject<UserCredential | null> = new BehaviorSubject<UserCredential | null>(null);

//   constructor(private afAuth: AngularFireAuth) {}

//   loginCredentials(credentials: LoginRequest): Observable<UserCredential> {
//     return new Observable<UserCredential>((observer) => {
//       this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
//         .then((userCredential) => {
//           this.currentUserData.next(userCredential); 
//           this.currentUserLoginOn.next(true); 
//           observer.next(userCredential);
//           observer.complete();
//         })
//         .catch((error) => {
//           console.error("Error al iniciar sesión:", error);
//           this.currentUserData.next(null); 
//           this.currentUserLoginOn.next(false);
//           observer.error(error); 
//           observer.complete();
//         });
//     });
//   }
// }