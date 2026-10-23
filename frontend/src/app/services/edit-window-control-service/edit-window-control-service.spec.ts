import { TestBed } from '@angular/core/testing';
import { EditWindowControlService } from './edit-window-control-service';

describe('EditWindowControlService', () => {
  let service: EditWindowControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditWindowControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
