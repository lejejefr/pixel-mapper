import { Service, signal, computed } from '@angular/core';
import { min } from 'rxjs';

@Service()
export class EditWindowControlService {

  //entrées éditeur

  readonly isMouseInWindow = signal<boolean>(false);
  readonly isLeftClickPressed = signal<boolean>(false);
  readonly isRightClickPressed = signal<boolean>(false);
  readonly isWheelClickPressed = signal<boolean>(false);
  readonly mouseLocation = signal<{x: number, y: number} >({x: 0, y: 0});

  //
  readonly zoomValue = signal<number>(1);
  private readonly minZoom : number = 1;
  private readonly maxZoom : number = 10;
  private readonly deltaZoom : number = .5;

  private clickOrigin = signal<{x: number, y: number}>({x: 0, y: 0});
  private camOrigin = signal<{x: number, y: number}>({x: 0, y : 0});
  readonly camLocation = computed<{x: number, y: number}>(
    () => {
      if(this.isWheelClickPressed()){
        return {
          x: this.camOrigin().x + (this.mouseLocation().x - this.clickOrigin().x) / this.zoomValue(),
          y: this.camOrigin().y + (this.mouseLocation().y - this.clickOrigin().y) / this.zoomValue(),
        }
      }
      return this.camOrigin();
    }
  );

  public camera : {x: number, y: number, zoom: number} = {x: 0, y: 0, zoom: 0};

  onMouseDown(event : MouseEvent): void{
    if(this.isMouseInWindow()){
      switch(event.button){
        case 0:
          this.isLeftClickPressed.set(true);
          break;
        case 1:
          this.isWheelClickPressed.set(true);
          this.clickOrigin.set(this.mouseLocation());
          break;
        case 2:
          this.isRightClickPressed.set(true);
          break;
      }
    }
  }
  onMouseUp(event : MouseEvent): void{
    switch(event.button){
      case 0:
        this.isLeftClickPressed.set(false);
        break;
      case 1:
        this.camOrigin.set({
          x: this.camOrigin().x + (this.mouseLocation().x - this.clickOrigin().x) / this.zoomValue(),
          y: this.camOrigin().y + (this.mouseLocation().y - this.clickOrigin().y) / this.zoomValue(),
        });
        this.isWheelClickPressed.set(false);
        break;
      case 2:
        this.isRightClickPressed.set(false);
        break;
    }
  }
  onMouseLeave(): void{
    this.camOrigin.set({
      x: this.camOrigin().x + (this.mouseLocation().x - this.clickOrigin().x) / this.zoomValue(),
      y: this.camOrigin().y + (this.mouseLocation().y - this.clickOrigin().y) / this.zoomValue(),
    });
    this.isMouseInWindow.set(false);
    this.isLeftClickPressed.set(false);
    this.isWheelClickPressed.set(false);
    this.isRightClickPressed.set(false);
  }
  onMouseEnter(): void{
    this.isMouseInWindow.set(true);
  }
  onMouseMove(event: MouseEvent): void{
    this.mouseLocation.set({x: event.clientX, y: event.clientY});
  }
  onWheel(event : WheelEvent): void{
    if(event.deltaY > 0){
      this.zoomValue.set(Math.max(this.zoomValue() - this.deltaZoom, this.minZoom));

    }else if(event.deltaY < 0){
      this.zoomValue.set(Math.min(this.zoomValue() + this.deltaZoom, this.maxZoom));

    }
  }
}
