import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-edit-window',
  styleUrl: './edit-window.scss',
  templateUrl: './edit-window.html',
})
export class EditWindow {

  public isMouseInWindow: boolean = false;
  public isLeftClickPressed: boolean = false;
  public isRightClickPressed: boolean = false;
  public isWheelClickPressed: boolean = false;
  public mouseLocation: {x: number, y: number} = {x: 0, y: 0}

  onMouseDown(event : MouseEvent): void{
    if(this.isMouseInWindow){
      switch(event.button){
        case 0:
          this.isLeftClickPressed = true;
          break;
        case 1:
          this.isWheelClickPressed = true;
          break;
        case 2:
          this.isRightClickPressed = true;
          break;
      }
    }
  }
  onMouseUp(event : MouseEvent): void{
    switch(event.button){
      case 0:
        this.isLeftClickPressed = false;
        break;
      case 1:
        this.isWheelClickPressed = false;
        break;
      case 2:
        this.isRightClickPressed = false;
        break;
    }
  }
  onMouseLeave(): void{
    this.isMouseInWindow = false;
    this.isLeftClickPressed = false;
    this.isWheelClickPressed = false;
    this.isRightClickPressed = false;
  }
  onMouseEnter(): void{
    this.isMouseInWindow = true;
  }
  onMouseMove(event: MouseEvent): void{
    this.mouseLocation.x = event.offsetX
    this.mouseLocation.y = event.offsetY

  }
}
