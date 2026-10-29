import { Component, inject, input } from '@angular/core';
import { EditWindowControlService } from '../../services/edit-window-control-service/edit-window-control-service';

@Component({
  imports: [],
  selector: 'app-tool-icon',
  styleUrl: './tool-icon.scss',
  templateUrl: './tool-icon.html',
})
export class ToolIcon {

  readonly ariaLabel = input<string>("Sélectionner la tuile Océan");
  readonly value = input<number>(0);
  readonly icon = input<string>("");
  readonly alt = input<string>("Icon Océan");

  readonly editWindowControlService = inject(EditWindowControlService);

  onToolSelected(value : number): void{
    this.editWindowControlService.selectedValue.set(value);
  }}
