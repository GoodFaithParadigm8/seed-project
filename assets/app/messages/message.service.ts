import {Message} from "./message.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
        const body = JSON.stringify(message);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        //console.log(this.messages);
        console.log(body);
        return this.httpClient.post<Message>('http://localhost:3000/message', body, {headers: headers});
    }

    //getters
    public getMessages(): Message[]
    {
        return this.messages;
    }

    public deleteMessage(message: Message): void
    {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}