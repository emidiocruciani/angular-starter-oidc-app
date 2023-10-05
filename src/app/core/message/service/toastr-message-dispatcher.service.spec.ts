import { TestBed } from '@angular/core/testing';

import { ToastrService } from 'ngx-toastr';

import { ToastrMessageDispatcherService } from './toastr-message-dispatcher.service';
import { Message, MessageType } from '../model/message.model';
import { toastrStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('ToastrMessageDispatcherService', () => {
  let service: ToastrMessageDispatcherService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastrService, useFactory: toastrStubFactory }
      ]
    });

    service = TestBed.inject(ToastrMessageDispatcherService);
    toastrService = TestBed.inject(ToastrService);

    spyOn(toastrService, 'show').and.stub();
    spyOn(toastrService, 'info').and.stub();
    spyOn(toastrService, 'success').and.stub();
    spyOn(toastrService, 'warning').and.stub();
    spyOn(toastrService, 'error').and.stub();
  });

  describe('dispatch()', () => {
    
    it('should dispatch to show() when message.type is Simple', () => {
      service.dispatch(new Message('mocksimple', MessageType.Simple));

      expect(toastrService.show).toHaveBeenCalledWith('mocksimple');
    });

    it('should dispatch to info() when message.type is Info', () => {
      service.dispatch(new Message('mockinfo', MessageType.Info));

      expect(toastrService.info).toHaveBeenCalledWith('mockinfo');
    });

    it('should dispatch to success() when message.type is Success', () => {
      service.dispatch(new Message('mocksuccess', MessageType.Success));

      expect(toastrService.success).toHaveBeenCalledWith('mocksuccess');
    });

    it('should dispatch to warning() when message.type is Warning', () => {
      service.dispatch(new Message('mockwarning', MessageType.Warning));

      expect(toastrService.warning).toHaveBeenCalledWith('mockwarning');
    });

    it('should dispatch to error() when message.type is Error', () => {
      service.dispatch(new Message('mockerror', MessageType.Error));

      expect(toastrService.error).toHaveBeenCalledWith('mockerror');
    });
  });
});
