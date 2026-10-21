import { Service, signal } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';

@Service()
export class NavService {
  public navListElementProps : NavListElementProps[] = [
    new NavListElementProps(
      "1",
      new Date(Date.now()),
      new Date(Date.now()),
      "Map A",
      "some island"
    ),
    new NavListElementProps(
      "2",
      new Date(Date.now()),
      new Date(Date.now()),
      "Map B",
      "some forests"
    ),
    new NavListElementProps(
      "3",
      new Date(Date.now()),
      new Date(Date.now()),
      "Map C",
      "some montains"
    ),
    new NavListElementProps(
      "4",
      new Date(Date.now()),
      new Date(Date.now()),
      "Map D",
      "some caves"
    ),
  ];

  public readonly selectedId = signal<string | null>(null);

  select(elementId: string): void {
    this.selectedId.update(id => (id === elementId ? null : elementId));
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

  }

}
