import { CreateMapRequest } from './../../models/create-request';
import { NavListElementProps } from './../../models/nav-list-element-props';
import { Service, signal } from '@angular/core';
import { MapData, MapDataProps } from '../../models/map-data';
import { ReconfigureRequest } from '../../models/reconfigure-request';

@Service()
export class MapListService {
  readonly mapList = signal<MapDataProps[]>([
    new MapDataProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map A",
      "some island",
      16,16,
    ),
    new MapDataProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map B",
      "some forests",
      32,32,
    ),
    new MapDataProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map C",
      "some montains",
      32,16,
    ),
    new MapDataProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "Map D",
      "some caves",
      16,32,
    ),
    new MapDataProps(
      crypto.randomUUID(),
      new Date(Date.now()),
      new Date(Date.now()),
      "The best map",
      "I like this map, very good, very pretty map. I like to call it the great map you know.",
      32,32,
    ),

  ]);

  refresh(): void{

  }

  getMapData(props : MapDataProps): MapData{
    return new MapData(
      props
    );
  }

  createMapData(request : CreateMapRequest): string{
    const now : Date = new Date(Date.now());
    const mapId : string = crypto.randomUUID();

    this.mapList.update(mapList => {
      mapList.push(new MapDataProps(
      mapId,
      now,
      now,
      request.title,
      request.description,
      request.width,
      request.height,
    ))
    return mapList;
  });

    return mapId;
  }

  reconfigureMapData(mapId : string, request: ReconfigureRequest): void{
    this.mapList.update(mapList => {
      mapList.forEach(map => {
        if (map.mapId === mapId){
          map.title = request.title;
          map.description = request.description;
        }
      })
      return mapList;
    });
  }
}
