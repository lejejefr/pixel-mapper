import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavPage } from './nav-page';

describe('NavPage', () => {
  let component: NavPage;
  let fixture: ComponentFixture<NavPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NavPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
