import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot,addDoc, query, orderBy } from 'firebase/firestore';
import { UserService } from 'src/app/user.service';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  

@ViewChild('contenedorMensajes') contenedorMensajesRef!: ElementRef;
 
  collectionPath: string = 'msjs';
  mostrarChat = false; 
  loginDate: string = '';

  usuarioLogueado: any;
  nuevoMensaje:string = "";
  messagesRef = collection(this.firestore, this.collectionPath);
  mensajes: any = []
  scrollDownEnabled = true;


  constructor(private authService: UserService, private firestore: Firestore) {}
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((usuario) => {
      this.usuarioLogueado = usuario;
      this.loginDate = this.formatDate(new Date());
    });
    this.getMessages();
  }

  ngOnDestroy(): void {}
  
  private formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', options);
  }

  enviarMensaje() {
    
    if (this.nuevoMensaje === "") return;
  
    const fecha = new Date();
  
    const mensaje = {
      emisor: this.usuarioLogueado.uid,
      texto: this.nuevoMensaje,
      timestamp: fecha.getTime(),
      fecha: fecha.toLocaleTimeString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      hora: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
      nombreUsuario: this.usuarioLogueado.email
    };
  
    addDoc(collection(this.firestore, this.collectionPath), mensaje)
      .then(() => {
        console.log('Mensaje guardado en Firestore');
        this.nuevoMensaje = "";
        this.scrollChatToTop();
      })
      .catch((error) => {
        console.error('Error al guardar el mensaje en Firestore:', error);
      });
  
    this.nuevoMensaje = "";
  
    setTimeout(() => {
      this.scrollChatToTop();
    }, 0);
  }

  getMessages() {
    
    const q = query(collection(this.firestore, this.collectionPath), orderBy('timestamp', 'asc'));

    onSnapshot(q, (snapshot) => {

      const newMessages = this.mensajes = snapshot.docs.map((doc) => doc.data());
      //this.mensajes = [...this.mensajes, ...newMessages];
      
      this.mensajes = newMessages;
      
      setTimeout(() => {
        this.scrollChatToBottom();
      }, 0);
    });
  }

  scrollChatToBottom() {
    if (this.contenedorMensajesRef) {
      const contenedor = this.contenedorMensajesRef.nativeElement;
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }

  scrollChatToTop() {
    const contenedor = this.contenedorMensajesRef.nativeElement;
    if (contenedor.scrollTop === 0) {

      //this.getMessages();
    }
  }

}
