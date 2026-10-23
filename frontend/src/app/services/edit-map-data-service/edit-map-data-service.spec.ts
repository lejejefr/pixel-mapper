import { TestBed } from '@angular/core/testing';
import { EditMapDataService } from './edit-map-data-service';

describe('EditMapDataService', () => {
  let service: EditMapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
