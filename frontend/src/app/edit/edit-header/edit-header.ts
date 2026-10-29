import { Layer } from '../../models/map-data';
import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-edit-header',
  imports: [],
  styleUrl: './edit-header.scss',
  templateUrl: './edit-header.html',
})
export class EditHeader {
  readonly editWindowControlService = inject(EditWindowControlService);

  onExitPressed(): void{
    this.editWindowControlService.onExitPressed();
  }

  onLayerIconPressed(layer : Layer): void{
    if(layer != this.editWindowControlService.selectedLayer()){
      this.editWindowControlService.selectedLayer.set(layer);
      this.editWindowControlService.selectedValue.set(0);
    }
  }
}
