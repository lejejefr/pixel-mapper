import { NavListElementProps } from './../../models/nav-list-element-props';
import { Component, computed, inject } from '@angular/core';
import { NavService } from '../../services/nav-service/nav-service';

@Component({
  imports: [],
  selector: 'app-nav-description-container',
  styleUrl: './nav-description-container.scss',
  templateUrl: './nav-description-container.html',
})
export class NavDescriptionContainer {
  public nav = inject(NavService);

  protected readonly selectedDescription = computed(
    () => {
      const id = this.nav.selectedId();
      for(let navListElementProps of this.nav.navListElementProps){
        if(navListElementProps.mapId == id){
          return navListElementProps.description;
        };
      }
      return "";
    }
  );
}
