import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHeaderIcon } from './edit-header-icon';

describe('EditHeaderIcon', () => {
  let component: EditHeaderIcon;
  let fixture: ComponentFixture<EditHeaderIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeaderIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeaderIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
