import { Component, inject, input } from '@angular/core';
import { EditWindowControlService } from '../../services/edit-window-control-service/edit-window-control-service';
import { Layer } from '../../models/map-data';

@Component({
  imports: [],
  selector: 'app-edit-header-icon',
  styleUrl: './edit-header-icon.scss',
  templateUrl: './edit-header-icon.html',
})
export class EditHeaderIcon {
  readonly editWindowControlService = inject(EditWindowControlService);
  readonly ariaLabel = input<string>("Calque terrain");
  readonly layer = input<Layer>("terrain");
  readonly alt = input<string>("Icon terrain");
  readonly icon = input<string>("/terrain-icon.svg");

  onLayerIconPressed(layer : Layer): void{
    if(layer != this.editWindowControlService.selectedLayer()){
      this.editWindowControlService.selectedLayer.set(layer);
      this.editWindowControlService.selectedValue.set(0);
    }
  }
}
