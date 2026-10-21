import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWindow } from './edit-window';

describe('EditWindow', () => {
  let component: EditWindow;
  let fixture: ComponentFixture<EditWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWindow],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWindow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
