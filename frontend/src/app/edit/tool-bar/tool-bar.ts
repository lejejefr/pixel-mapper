import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tool-bar',
  styleUrl: './tool-bar.scss',
  templateUrl: './tool-bar.html',
})
export class ToolBar {
  readonly editWindowControlService = inject(EditWindowControlService);

  onToolSelected(value : number): void{
    this.editWindowControlService.selectedValue.set(value);
  }
}
