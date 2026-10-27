import { computed, effect, inject, Service, signal } from '@angular/core';
import { Layer, MapData } from '../../models/map-data';
import { EditWindowControlService } from '../edit-window-control-service/edit-window-control-service';

export const TILE_SIZE = {
  width: 16,
  height: 16,
}

@Service()
export class EditMapDataService {

  readonly windowControllerService = inject(EditWindowControlService);

  readonly map = signal<MapData>(new MapData(
    crypto.randomUUID(),
    new Date(Date.now()),
    new Date(Date.now()),
    "title",
    "description",
    16,16
  ));
  readonly lastChange = signal<{ x: number, y: number, layer: Layer, } | null>(null);

  readonly canvasSize = computed<{width: number, height: number}>(() => {
    return {
      width: TILE_SIZE.width * (this.map().width - 1),
      height: TILE_SIZE.height * (this.map().height - 1),
    };
  });

  constructor(){
    effect(() => {
      const mouseLocation : {x: number, y : number} = this.windowControllerService.mouseLocation();
      const isLeftClickPressed : boolean = this.windowControllerService.isLeftClickPressed();
      const camera : {x: number, y : number, zoom : number} = {
        x: this.windowControllerService.camLocation().x,
        y: this.windowControllerService.camLocation().y,
        zoom: this.windowControllerService.zoomValue(),
      };
      if (isLeftClickPressed){
        const cell : {x: number, y: number} = {
          x: Math.round(((mouseLocation.x - camera.x)) / camera.zoom / TILE_SIZE.width),
          y: Math.round(((mouseLocation.y - camera.y)) / camera.zoom / TILE_SIZE.height),
        }
        this.setCell(cell.x,cell.y,"terrain",1);
      }
    })
  }

  public loadMap(map : MapData){
    this.map.set(map);
    this.lastChange.set(null);
  }

  public setCell(x: number, y: number, layer : Layer, value : number){
    this.map.update((map : MapData) => {
      map.setCell(x,y,layer,value);
      return map;
    }
    );
    this.lastChange.set({x: x, y: y, layer : layer});
  }

  public getCell(x: number, y: number, layer : Layer): number{
    return this.map().getCell(x,y,layer);
  }
}
