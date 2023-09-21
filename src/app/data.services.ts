import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { UserCredential } from '@angular/fire/auth';

@Injectable()

export class DataServices{

constructor(private httpClient:HttpClient){}


    cargarLogin(){

        return this.httpClient.get("https://tp-sala-de-juegos-diazgiossol-default-rtdb.firebaseio.com/userLogin.json")
    }

    guardarLogin(email: string | null) {
        const firebaseUrl = 'https://tp-sala-de-juegos-diazgiossol-default-rtdb.firebaseio.com/userLogin.json';
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false 
        };
        const loginDate = new Date().toLocaleDateString('es-ES', options);
        const loginData = {
          Usuario: email,
          FechaIngreso: loginDate
        };
        this.httpClient.post(firebaseUrl, loginData).subscribe(
          response => console.log('Inicio sesion guardado en bd'),
          error => console.log('Error de guardado en bd')
        );
      }
}