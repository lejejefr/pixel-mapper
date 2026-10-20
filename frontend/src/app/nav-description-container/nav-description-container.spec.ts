import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavDescriptionContainer } from './nav-description-container';

describe('NavDescriptionContainer', () => {
  let component: NavDescriptionContainer;
  let fixture: ComponentFixture<NavDescriptionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDescriptionContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(NavDescriptionContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
