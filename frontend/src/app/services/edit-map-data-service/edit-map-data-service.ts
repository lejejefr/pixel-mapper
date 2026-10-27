import { computed, Service, signal } from '@angular/core';
import { Layer, MapData } from '../../models/map-data';

const TILE_SIZE = {
  width: 16,
  height: 16,
}

@Service()
export class EditMapDataService {
  readonly map = signal<MapData>(new MapData(
    crypto.randomUUID(),
    new Date(Date.now()),
    new Date(Date.now()),
    "title",
    "description",
    16,16
  ));

  readonly canvasSize = computed<{width: number, height: number}>(() => {
    return {
      width: TILE_SIZE.width * this.map().width,
      height: TILE_SIZE.height * this.map().height,
    };
  });

  public loadMap(map : MapData){
    this.map.set(map);
  }

  public setCell(x: number, y: number, layer : Layer, value : number){
    this.map.update((map : MapData) => {
      map.setCell(x,y,layer,value);
      return map;
    }
    );
  }

  public getCell(x: number, y: number, layer : Layer): number{
    return this.map().getCell(x,y,layer);
  }
}
