import { TestBed } from '@angular/core/testing';
import { EditCanvasService } from './edit-canvas-service';

describe('EditCanvasService', () => {
  let service: EditCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
