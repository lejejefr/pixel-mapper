import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHeader } from './edit-header';

describe('EditHeader', () => {
  let component: EditHeader;
  let fixture: ComponentFixture<EditHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
