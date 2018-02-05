import {Message} from "./message.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService {

    private messages: Message[] = [];

    public messageIsEdit = new EventEmitter<Message>();

    //constructor
    constructor(private httpClient: HttpClient) {}
    
    public addMessage(message: Message): Observable<Message>
    {
        //const body = JSON.stringify(message);
        //const headers = new HttpHeaders({'Content-Type': 'application/json'});
        //console.log(this.messages);
        //console.log(message);
        return this.httpClient.post<Message>('http://localhost:3000/message', message)
            .map((data: any) => {
                const myMessage = new Message(data.obj.content, 'Dummy', data.obj._id, null);
                this.messages.push(myMessage);
                return myMessage;
            })
            .catch((error: HttpErrorResponse) => Observable.throw(error));
    }

    //getters
    public getMessages(): Observable<Message[]>
    {
        return this.httpClient.get<Message[]>('http://localhost:3000/message')
            .map( (data: any) => {
                //console.log(messages);
                const transformedMessages: Message[] = [];
                for (const message of data.obj) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                //console.log(transformedMessages);
                this.messages = transformedMessages;
                return transformedMessages;
        }).catch((error: HttpErrorResponse) => Observable.throw(error));
    }

    public editMessage(message: Message)
    {
        this.messageIsEdit.emit(message);
    }

    public updateMessage(message: Message): Observable<Message>
    {
        //console.log(message.messageId);
        return this.httpClient.patch<Message>('http://localhost:3000/message/' + message.messageId, message)
            .catch((error: HttpErrorResponse) => Observable.throw(error));
    }

    public deleteMessage(message: Message): Observable<Message>
    {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.httpClient.delete<Message>('http://localhost:3000/message/' + message.messageId)
            .catch((error: HttpErrorResponse) => Observable.throw(error));
    }
}