import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { DataServices } from './data.services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: any = {};

  constructor(private auth: Auth, private dataService:DataServices) { 
    
  }

  // register({email, password}: any) 
  // {
  //   return createUserWithEmailAndPassword(this.auth, email, password);
  // }

  obtenerUser(){
    return this.dataService.cargarLogin()
  }

  isAuthenticated(): boolean {
    const user = this.auth.currentUser;
    return !!user; 
  }

  async register(email: string, password: string) 
  {
    const user = await createUserWithEmailAndPassword(this.auth,email, password);
    return await signInWithEmailAndPassword(this.auth,email, password);
  }

  checkIfUserExists(email: string) {
    return fetchSignInMethodsForEmail(this.auth, email)
      .then((signInMethods) => signInMethods && signInMethods.length > 0)
      .catch((error) => {
        console.error('Error al verificar el usuario:', error);
        return false;
      });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          const {email } = user;
          this.dataService.guardarLogin(email);
        }
        return userCredential;
      });
  }

  // login(email: string, password: string) {
  //   return signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential: UserCredential) => {

  //       this.registerUserLogin(userCredential);
  //       return userCredential;
  //     });
  // }
  
  // async login(email: string, password: string) 
  // {
  //   try {
          
  //     return await this.afAuth.signInWithEmailAndPassword(email, password);
      
  //   } catch (error) {
  //     console.log("Error en login con google ", error);
  //     return null;
  //   }
  // }  

  // async loginWithGoogle(email: string, password: string)
  // {
  //   try {
          
  //     return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
      
  //   } catch (error) {
  //     console.log("Error en login ", error);
  //     return null;
  //   }
  // }

  logout() 
  {
    return signOut(this.auth);
  }  

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged((user: User | null) => {
        observer.next(user);
      });
      return () => {
        unsubscribe();
      };
    });
  }
}
