import {Message} from "./message.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService {

    private messages: Message[] = [];

    //constructor
    constructor(private httpClient: HttpClient) {}
    
    public addMessage(message: Message): Observable<Message>
    {
        this.messages.push(message);
        //const body = JSON.stringify(message);
        //const headers = new HttpHeaders({'Content-Type': 'application/json'});
        //console.log(this.messages);
        //console.log(message);
        return this.httpClient.post<Message>('http://localhost:3000/message', message)
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
                    console.log("inside the loop");
                    transformedMessages.push(new Message(message.content, 'Dummy', message.id, null));
                }
                console.log(transformedMessages);
                this.messages = transformedMessages;
                return transformedMessages;
        }).catch((error: HttpErrorResponse) => Observable.throw(error));
    }

    public deleteMessage(message: Message): void
    {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}