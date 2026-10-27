import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  effect,
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

  @ViewChild('canvasRef', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(){
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
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const map : MapData = this.editMapDataService.map()


    if(map.getCell(x,y,layer) === 0){
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect((x - 0.5) * TILE_SIZE.width, (y - 0.5) * TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    }else if(map.getCell(x,y,layer) === 1 && layer === "terrain"){
      ctx.fillStyle = '#57472b';
      ctx.fillRect((x - 0.5) * TILE_SIZE.width, (y - 0.5) * TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    }else if(map.getCell(x,y,layer) === 1 && layer === "vegetation"){
      ctx.fillStyle = '#18e344';
      ctx.fillRect((x - 0.5) * TILE_SIZE.width, (y - 0.5) * TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    }else if(map.getCell(x,y,layer) === 1 && layer === "roads"){
      ctx.fillStyle = '#7953d2';
      ctx.fillRect((x - 0.5) * TILE_SIZE.width, (y - 0.5) * TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    }else if(map.getCell(x,y,layer) === 1 && layer === "cities"){
      ctx.fillStyle = '#ff0000';
      ctx.fillRect((x - 0.5) * TILE_SIZE.width, (y - 0.5) * TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    }
  }
}
