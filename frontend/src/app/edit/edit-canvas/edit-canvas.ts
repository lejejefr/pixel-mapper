import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  effect,
  signal,
  input,
} from '@angular/core';
import { EditMapDataService, TILE_SIZE } from '../../services/edit-map-data-service/edit-map-data-service';
import { Layer, MapData } from '../../models/map-data';

@Component({
  selector: 'app-edit-canvas',
  imports: [],
  styleUrl: './edit-canvas.scss',
  templateUrl: './edit-canvas.html',
})
export class EditCanvas implements AfterViewInit {
  readonly editMapDataService = inject(EditMapDataService);
  readonly layer = input<Layer>("terrain");
  readonly drawMode = input<"link" | "no-link">("link");

  @ViewChild('canvasRef', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private spriteSheet = new Image();
  readonly spriteSheetReady = signal(false);

  constructor(){
    this.spriteSheet.src = '/pixelmapper-tileset.png';
    this.spriteSheet.onload = () => this.spriteSheetReady.set(true);

    effect(() => {
      const _layer = this.layer();
      this.spriteSheetReady();
      const change = this.editMapDataService.lastChange();
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if(change === null){
        this.drawAllMap();
      }else{
        this.drawMapSection(change.x,change.y,change.layer);
      }
    })
  }

  ngAfterViewInit(): void {
    this.drawAllMap();
  }

  drawAllMap(): void{
    const map : MapData = this.editMapDataService.map();
    for(let i = 0; i < map.width - 1; i++){
      for(let j = 0; j < map.height - j; j++){
        this.redrawTile(i, j, this.layer());
      }
    }
  }

  drawMapSection(x: number, y: number, layer : Layer): void{
    if(layer=== this.layer()){
      this.redrawTile(x,y,layer);
      this.redrawTile(x - 1,y,layer);
      this.redrawTile(x,y - 1,layer);
      this.redrawTile(x - 1,y - 1,layer);
    }
  }


  //tilemap management

  getSpriteSheet(): HTMLImageElement {
    return this.spriteSheet;
  }

  redrawTile(x : number, y : number, layer : Layer){
    const map : MapData = this.editMapDataService.map();
    if(
      x < 0 ||
      y < 0 ||
      x > map.width - 2 ||
      y > map.height - 2
    ){
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(
      x * TILE_SIZE.width,
      y * TILE_SIZE.height,
      TILE_SIZE.width,
      TILE_SIZE.height
    )

    const cornerTypes = this.getCornerTypes(x, y, layer);
    cornerTypes.forEach(value => {
      const index = this.getEnvironmentForCell(x,y,value,layer);
      const absoluteLocation = this.getTileAbsoluteLocation(value,layer,index);
      ctx.drawImage(
        this.getSpriteSheet(),
        absoluteLocation.x,
        absoluteLocation.y,
        absoluteLocation.w,
        absoluteLocation.h,
        x * TILE_SIZE.width,
        y * TILE_SIZE.height,
        TILE_SIZE.width,
        TILE_SIZE.height,
      )
    });
  }

  getTileAbsoluteLocation(value : number, layer : Layer, index : number): {x: number, y: number, w: number, h: number}{
    const layerIndex = {
      "terrain": 0,
      "vegetation": 1,
      "roads": 2,
      "cities": 3,
    }[layer];

    const tileRelativeLocation = this.getTileRelativeLocationFromIndex(index);

    return{
      x:TILE_SIZE.width * (5 * value + tileRelativeLocation.x),
      y:TILE_SIZE.height * (3 * layerIndex + tileRelativeLocation.y),
      w:TILE_SIZE.width,
      h:TILE_SIZE.height,
    };
  }

  getCornerTypes(x: number, y: number, layer : Layer) : number[]{
    const map : MapData = this.editMapDataService.map();
    let result : number[] = [];
    [
      {x: x, y: y},
      {x: x + 1, y: y},
      {x: x, y: y + 1},
      {x: x + 1, y: y + 1},
    ].forEach(cell => {
      const value = map.getCell(cell.x,cell.y,layer);
      if(!(result.includes(value))){
        result.push(value);
      }
    });
    result.sort();
    return result;
  }

  getEnvironmentForCell(x: number, y : number, value : number, layer : Layer): number{
    const map : MapData = this.editMapDataService.map();
    let k : number = 0;
    let power : number = 1;

    [
      {x: x, y: y},
      {x: x + 1, y: y},
      {x: x, y: y + 1},
      {x: x + 1, y: y + 1},
    ].forEach(cell => {
      switch(this.drawMode()){
        case "link":
          if(map.getCell(cell.x,cell.y,layer) >= value){
            k += power
          }
          break;
        case "no-link":
          if(map.getCell(cell.x,cell.y,layer) === value){
            k += power
          }
          break;
      }
      power *= 2
    });
    return k;
  }

  getTileRelativeLocationFromIndex(index : number) : {x : number, y : number}{
    return [
      {x: -1, y: -1},
      {x: 2, y: 2},
      {x: 0, y: 2},
      {x: 1, y: 2},
      {x: 2, y: 0},
      {x: 2, y: 1},

      {x: 3, y: 2},
      {x: 3, y: 0},
      {x: 0, y: 0},
      {x: 4, y: 2},
      {x: 0, y: 1},

      {x: 4, y: 0},
      {x: 1, y: 0},
      {x: 3, y: 1},
      {x: 4, y: 1},
      {x: 1, y: 1},

    ][index]
  }

}
