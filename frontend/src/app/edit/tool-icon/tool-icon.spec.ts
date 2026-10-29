import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolIcon } from './tool-icon';

describe('ToolIcon', () => {
  let component: ToolIcon;
  let fixture: ComponentFixture<ToolIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
