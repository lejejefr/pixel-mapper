import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavReconfigurePage } from './nav-reconfigure-page';

describe('NavReconfigurePage', () => {
  let component: NavReconfigurePage;
  let fixture: ComponentFixture<NavReconfigurePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavReconfigurePage],
    }).compileComponents();

    fixture = TestBed.createComponent(NavReconfigurePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
