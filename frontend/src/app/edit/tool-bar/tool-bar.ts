import { Layer } from '../../models/map-data';
import { ToolIcon } from '../tool-icon/tool-icon';
import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

type MaterialData = {
  icon: string,
  value: number,
  ariaLabel: string,
  alt: string,
};

export const MATERIAL_DATA_RECORD : Record<Layer,MaterialData[]> = {
  "terrain" : [],
  "vegetation" : [],
  "roads" : [],
  "cities" : [],
};

@Component({
  imports: [ToolIcon],
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
