import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User, fetchSignInMethodsForEmail } from '@angular/fire/auth';


interface MyDocumentSnapshotExists extends firebase.firestore.DocumentSnapshot {

}

interface MyQueryDocumentSnapshot extends firebase.firestore.QueryDocumentSnapshot {

}

interface MyQuerySnapshot extends firebase.firestore.QuerySnapshot {

}

interface MyDocumentChange extends firebase.firestore.DocumentChange {

}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: any = {};

  constructor(private auth: Auth,  private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  register({email, password}: any) 
  {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // async register(email: string, password: string) 
  // {
  //   try {
          
  //     return await this.afAuth.createUserWithEmailAndPassword(email, password);
      
  //   } catch (error) {
  //     console.log("Error en registro ", error);
  //     return null;
  //   }
  // }  

  checkIfUserExists(email: string) {
    return fetchSignInMethodsForEmail(this.auth, email)
      .then((signInMethods) => signInMethods && signInMethods.length > 0)
      .catch((error) => {
        console.error('Error al verificar el usuario:', error);
        return false;
      });
  }

  // login({email, password}: any) 
  // {
  //   return signInWithEmailAndPassword(this.auth, email, password);
  // }  

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        // Iniciar sesión exitosa, registrar el log del usuario
        this.registerUserLogin(userCredential);
        return userCredential;
      });
  }
  
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

  async registerUserLogin(user: UserCredential): Promise<void> {
    if (user.user) {
      const userId = user.user.uid;
      const loginDate = new Date().toISOString();

      await this.firestore.collection('userLogins').doc(userId).set({
        loginDate
      });
    }
  }
}
