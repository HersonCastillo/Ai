import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  private io;
  constructor(private socket: SocketService){}
  ngOnInit(): void{
    this.io = this.socket.openConnection();
    console.log("Conexion abierta")

    this.socket.send(this.io, this.socket.SOCKET.MENSAJE, "Hola Mundo");
    
    this.socket.recieve(this.io, this.socket.SOCKET.MENSAJE, function(data){
      console.log(data)
    })
  }
}
