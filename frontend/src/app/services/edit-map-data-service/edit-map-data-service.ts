import { Service } from '@angular/core';
import { Layer, MapData } from '../../models/map-data';

@Service()
export class EditMapDataService {
  public map : MapData = new MapData(
    crypto.randomUUID(),
    new Date(Date.now()),
    new Date(Date.now()),
    "title",
    "description",
    16,16
  );

  public loadMap(map : MapData){
    this.map = map;
  }

  public setCell(x: number, y: number, layer : Layer, value : number){
    this.setCell(x,y,layer,value);
  }

  public getCEll(x: number, y: number, layer : Layer): number{
    return this.map.getCell(x,y,layer);
  }
}
