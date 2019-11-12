import {Component} from '@angular/core';
import $ from 'jquery';
import { WebSocketService } from './websocket.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public notifications = 0;
   private stompClient;
    constructor(private webSocketService: WebSocketService) {

        this.stompClient = this.webSocketService.connect();

        this.stompClient.connect({}, frame => {

            this.stompClient.subscribe('/topic/notification', notifications => {

                //this.notifications = JSON.parse(notifications.body).count;

            })

        });

        
        
    }
    sendMessage(message){
        this.stompClient.send("/app/send/message" , {}, message);
         $('#input').val('');
       } 
    
}
