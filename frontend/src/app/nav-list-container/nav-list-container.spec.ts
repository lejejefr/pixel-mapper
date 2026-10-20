import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavListContainer } from './nav-list-container';

describe('NavListContainer', () => {
  let component: NavListContainer;
  let fixture: ComponentFixture<NavListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(NavListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
