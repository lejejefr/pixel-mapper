import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavCreatePage } from './nav-create-page';

describe('NavCreatePage', () => {
  let component: NavCreatePage;
  let fixture: ComponentFixture<NavCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(NavCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
