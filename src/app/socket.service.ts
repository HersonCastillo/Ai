import { Injectable } from '@angular/core';

declare let io: any;
@Injectable()
export class SocketService {
  private url: string = "http://127.0.0.1:8080";
  public SOCKET = {
    MENSAJE: 'mensaje'
  }; //Nombres de io/emit generados en el servidor app
  constructor() { }
  openConnection(): any{
    return io.connect(this.url);
  }
  send(socket: any, to: string,  data: any): void{
    socket.emit(to, data);
  }
  recieve(socket: any, from: string, fn: Function): void{
    socket.on(from, function(d){
      fn(d);
    });
  }
}
