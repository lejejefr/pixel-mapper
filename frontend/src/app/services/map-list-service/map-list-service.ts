import { Service } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';

@Service()
export class MapListService {
  getMapList(): NavListElementProps[]{
    return [
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
    new NavListElementProps(
      "5",
      new Date(Date.now()),
      new Date(Date.now()),
      "The best map",
      "I like this map, very good, very pretty map. I like to call it the great map you know."
    ),

  ];
  }
}
