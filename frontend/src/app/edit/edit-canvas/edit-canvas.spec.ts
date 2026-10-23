import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCanvas } from './edit-canvas';

describe('EditCanvas', () => {
  let component: EditCanvas;
  let fixture: ComponentFixture<EditCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCanvas],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
