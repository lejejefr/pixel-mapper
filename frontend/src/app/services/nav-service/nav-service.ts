import { EditMapDataService } from './../edit-map-data-service/edit-map-data-service';
import { computed, inject, Service, signal } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';
import { MapListService } from '../map-list-service/map-list-service';
import { Router } from '@angular/router';
import { CreateMapRequest } from '../../models/create-request';
import { MapDataProps } from '../../models/map-data';

@Service()
export class NavService {
  public navListElementProps : MapDataProps[] = [];

  public readonly selectedId = signal<string | null>(null);
  public readonly textSearch = signal<string>("");

  readonly router = inject(Router);
  readonly editMapDataService = inject(EditMapDataService);
  public mapListService = inject(MapListService);

  public readonly filteredElements = computed(() => {
    const text = this.textSearch().trim().toLowerCase();
    return this.navListElementProps.filter(e => e.title.toLowerCase().includes(text));
  });


  constructor() {
    this.refreshList();
  }

  select(elementId: string): void {
    this.selectedId.update(id => (id === elementId ? null : elementId));
  }

  search(newTextSearch: string): void{
    this.textSearch.update(_textSearch => newTextSearch);
  }

  onInit(): void{

  }

  showNavList(): void{

  }

  create(request : CreateMapRequest): void{
    const id = this.mapListService.createMapData(request);
    this.select(id);
    this.startEditing();
  }

  duplicate(): void{

  }

  erase(): void{

  }

  startEditing(): void{
    if(this.selectedId() === null){
      console.warn("no id selected");
      return;
    }
    for(let mapData of this.navListElementProps){
      if (mapData.mapId === this.selectedId()){
        this.editMapDataService.loadMap(this.mapListService.getMapData(mapData));
        this.router.navigateByUrl("edit-page");
      }
    }
  }

  refreshList(): void{
    this.navListElementProps = this.mapListService.getMapList();
  }

}
