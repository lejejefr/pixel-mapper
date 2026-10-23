import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-edit-window',
  styleUrl: './edit-window.scss',
  templateUrl: './edit-window.html',
})
export class EditWindow {

  public controller = inject(EditWindowControlService);

  onMouseDown(event : MouseEvent): void{
    this.controller.onMouseDown(event);
  }
  onMouseUp(event : MouseEvent): void{
    this.controller.onMouseUp(event);
  }
  onMouseLeave(): void{
    this.controller.onMouseLeave();
  }
  onMouseEnter(): void{
    this.controller.onMouseEnter();
  }
  onMouseMove(event: MouseEvent): void{
    this.controller.onMouseMove(event);
  }
  onWheel(event : WheelEvent): void{
    this.controller.onWheel(event);
  }
}
