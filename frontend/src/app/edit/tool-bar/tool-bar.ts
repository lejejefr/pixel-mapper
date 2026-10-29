import { Layer } from '../../models/map-data';
import { ToolIcon } from '../tool-icon/tool-icon';
import { EditWindowControlService } from './../../services/edit-window-control-service/edit-window-control-service';
import { Component, inject } from '@angular/core';

type MaterialData = {
  value: number,
  icon: string,
  ariaLabel: string,
  alt: string,
};

@Component({
  imports: [ToolIcon],
  selector: 'app-tool-bar',
  styleUrl: './tool-bar.scss',
  templateUrl: './tool-bar.html',
})
export class ToolBar {
  readonly MATERIAL_DATA_RECORD : Record<Layer,MaterialData[]> = {
    "terrain" : [
      {
        value: 0,
        ariaLabel: "Boutton sélectionner la tuile océan",
        icon: "/ocean-icon.svg",
        alt: "Icon océan",
      },
      {
        value: 1,
        ariaLabel: "Boutton sélectionner la tuile mer",
        icon: "/sea-icon.svg",
        alt: "Icon mer",
      },
      {
        value: 2,
        ariaLabel: "Boutton sélectionner la tuile désert",
        icon: "/desert-icon.svg",
        alt: "Icon désert",
      },
      {
        value: 3,
        ariaLabel: "Boutton sélectionner la tuile prairie",
        icon: "/grassland-icon.svg",
        alt: "Icon prairie",
      },
      {
        value: 4,
        ariaLabel: "Boutton sélectionner la tuile neige",
        icon: "/snowplains-icon.svg",
        alt: "Icon neige",
      },
      {
        value: 5,
        ariaLabel: "Boutton sélectionner la tuile montagne",
        icon: "/montain-icon.svg",
        alt: "Icon montagne",
      },
  ],
    "vegetation" : [
      {
        value: 0,
        ariaLabel: "Boutton sélectionner la gomme",
        icon: "/erase-icon.svg",
        alt: "Icon gomme",
      },
      {
        value: 1,
        ariaLabel: "Boutton sélectionner la tuile forêt",
        icon: "/forest-icon.svg",
        alt: "Icon forêt",
      },
      {
        value: 2,
        ariaLabel: "Boutton sélectionner la tuile chaine de montagnes",
        icon: "/montain-chains-icon.svg",
        alt: "Icon chaine de montagnes",
      },
    ],
    "roads" : [
      {
        value: 0,
        ariaLabel: "Boutton sélectionner la gomme",
        icon: "/erase-icon.svg",
        alt: "Icon gomme",
      },
      {
        value: 1,
        ariaLabel: "Boutton sélectionner le crayon",
        icon: "/draw-icon.svg",
        alt: "Icon crayon",
      },
    ],
    "cities" : [
      {
        value: 0,
        ariaLabel: "Boutton sélectionner la gomme",
        icon: "/erase-icon.svg",
        alt: "Icon gomme",
      },
      {
        value: 1,
        ariaLabel: "Boutton sélectionner le crayon",
        icon: "/draw-icon.svg",
        alt: "Icon crayon",
      },
    ],
  };

  readonly editWindowControlService = inject(EditWindowControlService);

  onToolSelected(value : number): void{
    this.editWindowControlService.selectedValue.set(value);
  }
}
