import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { UserCredential } from '@angular/fire/auth';
import { Firestore, addDoc, collection, getDoc, getDocs, updateDoc, setDoc, doc } from '@angular/fire/firestore';


@Injectable()

export class DataServices{

constructor(private firestore: Firestore) {}

cargarLogin() {
  const firebaseCollection = 'userLogin';
  const collectionRef = collection(this.firestore, firebaseCollection);

  return getDocs(collectionRef);
}

guardarLogin(email: string | null) {
  
  const firebaseCollection = 'userLogin';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const loginDate = new Date().toLocaleDateString('es-ES', options);
  const loginData = {
    Usuario: email,
    FechaIngreso: loginDate,
  };

  const collectionRef = collection(this.firestore, firebaseCollection);

  setDoc(doc(collectionRef), loginData)
    .then(() => {
      console.log('Inicio de sesión guardado en Firestore');
    })
    .catch((error: any) => {
      console.error('Error al guardar en Firestore: ', error);
    });
  }

}