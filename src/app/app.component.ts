import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  private io: any;
  public message: string = "";
  public static messageArray: Array<Object> = [];
  public username: string;
  constructor(private socket: SocketService){}
  ngOnInit(): void{
    this.username = 'u_' + Math.round(Math.random() * 1e7);
    this.io = this.socket.openConnection();
    this.socket.recieve(this.io, this.socket.SOCKET.MENSAJE, function(data){
      AppComponent.messageArray.push(data);
    });
  }
  getMessages():Array<any>{
    return AppComponent.messageArray;
  }
  Validate(msg: string): boolean{
    if(msg.length > 0 && msg.length < 65){
      msg = msg.trim();
      if(msg.length > 0) return true;
      else return false;
    }else return false;
  }
  envMessage(): boolean{
    if(this.Validate(this.message)){
      this.socket.send(this.io, this.socket.SOCKET.MENSAJE, {
        username: this.username,
        message: this.message.trim()
      });
      this.message = "";
    }
    return false;
  }
}
