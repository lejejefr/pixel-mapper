import { computed, inject, Service, signal } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';
import { MapListService } from '../map-list-service/map-list-service';

@Service()
export class NavService {
  public navListElementProps : NavListElementProps[] = [];

  public readonly selectedId = signal<string | null>(null);
  public readonly textSearch = signal<string>("");

  public readonly filteredElements = computed(() => {
    const text = this.textSearch().trim().toLowerCase();
    return this.navListElementProps.filter(e => e.title.toLowerCase().includes(text));
  });

  public mapListService = inject(MapListService);

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

  create(): void{

  }

  duplicate(): void{

  }

  erase(): void{

  }

  startEditing(): void{

  }

  refreshList(): void{
    this.navListElementProps = this.mapListService.getMapList();
  }

}
