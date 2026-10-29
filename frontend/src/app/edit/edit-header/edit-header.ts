import { Layer } from '../../models/map-data';
import { EditHeaderIcon } from '../edit-header-icon/edit-header-icon';
import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

type EditHeaderIconData = {
  layer: Layer,
  ariaLabel: string,
  icon: string,
  alt: string,
}

@Component({
  selector: 'app-edit-header',
  imports: [EditHeaderIcon],
  styleUrl: './edit-header.scss',
  templateUrl: './edit-header.html',
})
export class EditHeader {
  readonly HEADER_ICON_RECORD : EditHeaderIconData[] = [
    {
      layer: "terrain",
      ariaLabel: "Sélectionner le calque terrain",
      icon: "/terrain-icon.svg",
      alt: "Icon terrain",
    },
    {
      layer: "vegetation",
      ariaLabel: "Sélectionner le calque végétation",
      icon: "/plants-icon.svg",
      alt: "Icon végétation",
    },
    {
      layer: "roads",
      ariaLabel: "Sélectionner le calque routes",
      icon: "/path-icon.svg",
      alt: "string",
    },
    {
      layer: "cities",
      ariaLabel: "Sélectionner le calque villes",
      icon: "/city-icon.svg",
      alt: "Icon villes",
    },
  ]

  readonly editWindowControlService = inject(EditWindowControlService);

  onExitPressed(): void{
    this.editWindowControlService.onExitPressed();
  }

}
