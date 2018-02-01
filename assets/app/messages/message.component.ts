import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    @Input()
    public message: Message;

    @Output()
    public editClicked = new EventEmitter<string>();

    public color: string = 'red';

    //constructor
    constructor(private messageService: MessageService) {}

    //methods
    public onEdit()
    {
        this.editClicked.emit('A new value');
    }

    public onDelete(): void
    {
        this.messageService.deleteMessage(this.message);
    }

}