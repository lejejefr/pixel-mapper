import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavPageHeader } from './nav-page-header';

describe('NavPageHeader', () => {
  let component: NavPageHeader;
  let fixture: ComponentFixture<NavPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPageHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(NavPageHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
