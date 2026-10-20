import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavListElement } from './nav-list-element';

describe('NavListElement', () => {
  let component: NavListElement;
  let fixture: ComponentFixture<NavListElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListElement],
    }).compileComponents();

    fixture = TestBed.createComponent(NavListElement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
