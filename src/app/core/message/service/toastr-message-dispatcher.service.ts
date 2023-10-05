import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Message, MessageType } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class ToastrMessageDispatcherService {

  constructor(private toastr: ToastrService) {}

  dispatch(message: Message): void {
    switch(message.type) {
      case MessageType.Simple:
        this.toastr.show(message.content);

        break;

      case MessageType.Info:
        this.toastr.info(message.content);

        break;
      case MessageType.Success:
        this.toastr.success(message.content);

        break;
      case MessageType.Warning:
        this.toastr.warning(message.content);

        break;
      case MessageType.Error:
        this.toastr.error(message.content);

        break;
    }
  }
}
