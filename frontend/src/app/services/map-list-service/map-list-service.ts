import { CreateMapRequest } from './../../models/create-request';
import { NavListElementProps } from './../../models/nav-list-element-props';
import { Service } from '@angular/core';
import { MapData } from '../../models/map-data';

@Service()
export class MapListService {
  private mapList: NavListElementProps[] = [
    new NavListElementProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map A",
      "some island"
    ),
    new NavListElementProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map B",
      "some forests"
    ),
    new NavListElementProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map C",
      "some montains"
    ),
    new NavListElementProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map D",
      "some caves"
    ),
    new NavListElementProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "The best map",
      "I like this map, very good, very pretty map. I like to call it the great map you know."
    ),

  ];

  getMapList(): NavListElementProps[]{
    return this.mapList;
  }

  getMapData(props : NavListElementProps): MapData{
    return new MapData(
      props.mapId,
      props.createdAt,
      props.lastUpdate,
      props.title,
      props.description,
      32,32
    );
  }

  createMapData(request : CreateMapRequest): string{
    const now : Date = new Date(Date.now());
    const mapId : string = crypto.randomUUID();

    this.mapList.push(new NavListElementProps(
      mapId,
      now,
      now,
      request.title,
      request.description,
    ))

    return mapId;
  }
}
