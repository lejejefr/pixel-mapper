import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  effect,
  signal,
} from '@angular/core';
import { EditMapDataService, TILE_SIZE } from '../../services/edit-map-data-service/edit-map-data-service';
import { Layer, MapData } from '../../models/map-data';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-edit-canvas',
  imports: [],
  styleUrl: './edit-canvas.scss',
  templateUrl: './edit-canvas.html',
})
export class EditCanvas implements AfterViewInit {
  readonly editMapDataService = inject(EditMapDataService);

  @ViewChild('canvasRef', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private spriteSheet = new Image();
  readonly spriteSheetReady = signal(false);

  constructor(){
    this.spriteSheet.src = '/pixelmapper-tileset.png';
    this.spriteSheet.onload = () => this.spriteSheetReady.set(true);

    effect(() => {
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

  drawAllMap(): void{const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = this.editMapDataService.canvasSize();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  drawMapSection(x: number, y: number, layer : Layer): void{
    this.redrawTile(x,y,layer);
    this.redrawTile(x - 1,y,layer);
    this.redrawTile(x,y - 1,layer);
    this.redrawTile(x - 1,y - 1,layer);
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
      "vegetation": 0,
      "roads": 0,
      "cities": 0,
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
      if(map.getCell(cell.x,cell.y,layer) >= value){
        k += power
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
