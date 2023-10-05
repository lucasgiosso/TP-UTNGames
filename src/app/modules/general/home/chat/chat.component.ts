import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot,addDoc, query, orderBy,limit } from 'firebase/firestore';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  collectionPath: string = 'msjs';
  mostrarChat = false;
  usuarioLogueado: any;
  nuevoMensaje:string = "";
  messagesRef = collection(this.firestore, this.collectionPath);
  mensajes: any = [
    {
      emisor: "id",
      texto: "¿En que te puedo ayudar?"
    },

  ]

  constructor(private authService: UserService, private firestore: Firestore) {}
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(usuario=> 
      {this.usuarioLogueado = usuario;
      });
      this.getMessages();
  }

  enviarMensaje(event: Event) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      event.preventDefault();

      if (this.nuevoMensaje === "") return;

      const fecha = new Date();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();

      const horaFormateada = `${hora}:${minutos < 10 ? '0' : ''}${minutos}`;

      const mensaje = {
        emisor: this.usuarioLogueado.uid,
        texto: this.nuevoMensaje,
        hora: horaFormateada,
        nombreUsuario: this.usuarioLogueado.email
      };

      addDoc(collection(this.firestore, this.collectionPath), mensaje)
        .then(() => {
          console.log('Mensaje guardado en Firestore');
        })
        .catch((error) => {
          console.error('Error al guardar el mensaje en Firestore:', error);
        });

      this.nuevoMensaje = "";

      setTimeout(() => {
        this.scrollearMsj();
      }, 10);
    }
  }
  
  getMessages() {
    const q = query(collection(this.firestore, this.collectionPath), orderBy('hora'));

    const unsub = onSnapshot(q, (snapshot) => {
      this.mensajes = snapshot.docs.map((doc) => doc.data());
    });
  }

  scrollearMsj(){
    let elementos = document.getElementsByClassName('msj');
    let ultimo: any = elementos[(elementos.length - 1)];
    let toppos = ultimo.offsetTop;

    const contenedor = document.getElementById('contenedorMensajes');
    if (contenedor instanceof HTMLElement) {
    contenedor.scrollTop = toppos;
    } else {
    console.error('El elemento contenedor no es válido.');
    }

  }
}
