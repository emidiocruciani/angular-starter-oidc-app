import { Injectable } from '@angular/core';

import { Message, MessageType } from '../model/message.model';
import { ToastrMessageDispatcherService } from './toastr-message-dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastrMessageDispatcher: ToastrMessageDispatcherService
  ) {}

  public send(content: string, type: MessageType): void {
    const message = new Message(content, type);
    this.toastrMessageDispatcher.dispatch(message);
  }
}
