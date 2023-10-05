import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mostrarChat = false;
  usuarioLogueado: any;
  nuevoMensaje:string = "";
  mensajes: any = [
    {
      emisor: "id",
      texto: "¿En que te puedo ayudar?"
    },

  ]

  constructor(private authService: UserService) {}
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(usuario=> 
      {this.usuarioLogueado = usuario;
      });
  }

  enviarMensaje() {
    
    if (this.nuevoMensaje === "") return;

    console.log(this.nuevoMensaje);
  
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
  
    this.mensajes.push(mensaje);
    this.nuevoMensaje = "";
  
    setTimeout(() => {
      this.scrollearMsj();
    }, 10);
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
