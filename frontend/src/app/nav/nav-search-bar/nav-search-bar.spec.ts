import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavSearchBar } from './nav-search-bar';

describe('NavSearchBar', () => {
  let component: NavSearchBar;
  let fixture: ComponentFixture<NavSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(NavSearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
