import {Component} from '@angular/core';
//import $ from 'jquery';
import * as $ from "jquery";
import {WebSocketService} from "./services/websocket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
 private base64string:String="abc";
  private base64str:String=" ";
    public notifications = 0;
   private stompClient;
   private message: string;
    constructor(private webSocketService: WebSocketService) {

        this.stompClient = this.webSocketService.connect();

        this.stompClient.connect({}, frame => {

            this.stompClient.subscribe('/chat',(message) => {
                if(message.body) {
                  //message.body="";
                  console.log("whyyyy");
                  console.log(message.body);
                  var binary = atob(message.body.replace(/\s/g, ''));
                    var len = binary.length;
                    var buffer = new ArrayBuffer(len);
                    var view = new Uint8Array(buffer);
                    for (var i = 0; i < len; i++) {
                        view[i] = binary.charCodeAt(i);
                    }
                          var blob = new Blob( [view],);
                          var download = document.querySelector( "a[ download ]" );
                          var downloadUrl = URL.createObjectURL(blob);
                          download.setAttribute( "href", downloadUrl );

                    //link.href = URL.createObjectURL(blob);
                  // $(".chat").append("<div class='message'>"+message.body+"</div>")
                  console.log(message.body);
                }
              })

        });

        
        
    }
    handleFileSelect(evt){
      
      var f=evt.target.files[0];
      var reader=new FileReader();
      let self = this;
      reader.onload=(function(theFile){
        let me = self;
        return function(e){
          var binaryData=e.target.result;
          var base64string=window.btoa(binaryData);
          document.getElementById('base64').innerHTML = base64string;
          //  console.log(base64string);
           me.message = base64string;
          //  console.log(me.message)
           //window.base64str = base64string;
           //this.stompClient.send("/app/send/message" , {}, this.base64string);
          // this.sendMessage(this.base64string);
        }
        
      })
       //this.sendMessage(this.base64string);
      (f);
      reader.readAsBinaryString(f);
     // console.log(this.base64string);
      //this.sendMessage(this.base64string);
    }
    
    sendMessage(message){
      console.log('inside method');
      console.log(this.message)
      // console.log(this.base64string);
      var base64str=message;
        this.stompClient.send("/app/send/message" , {}, this.message);

    //    // console.log(message);
    //     //  $('#input').val('');
        } 
    
}
