import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-edit-header',
  imports: [],
  styleUrl: './edit-header.scss',
  templateUrl: './edit-header.html',
})
export class EditHeader {
  private editWindowControlService = inject(EditWindowControlService);

  onExitPressed(): void{
    this.editWindowControlService.onExitPressed();
  }

  onTerrainPressed(): void{
    this.editWindowControlService.selectedLayer.set("terrain");
  }
  onVegetationPressed(): void{
    this.editWindowControlService.selectedLayer.set("vegetation");
  }
  onPathPressed(): void{
    this.editWindowControlService.selectedLayer.set("roads");
  }
  onCityPressed(): void{
    this.editWindowControlService.selectedLayer.set("cities");
  }
}
