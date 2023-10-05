import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { ToastrMessageDispatcherService } from './toastr-message-dispatcher.service';
import { Message, MessageType } from '../model/message.model';
import { toastrMessageDispatcherStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('MessageService', () => {
  let service: MessageService;
  let toastrMessageDispatcher: ToastrMessageDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastrMessageDispatcherService, useFactory: toastrMessageDispatcherStubFactory }
      ]
    });

    service = TestBed.inject(MessageService);
    toastrMessageDispatcher = TestBed.inject(ToastrMessageDispatcherService);

    spyOn(toastrMessageDispatcher, 'dispatch').and.stub();
  });

  describe('send()', () => {

    it('should dispatch toast message using toastr message dispatcher service', () => {
      const message = new Message('content', MessageType.Info);
      service.send('content', MessageType.Info);

      expect(toastrMessageDispatcher.dispatch).toHaveBeenCalledWith(message);
    });
  });
});
