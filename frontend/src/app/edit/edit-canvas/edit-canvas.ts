import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { EditMapDataService } from '../../services/edit-map-data-service/edit-map-data-service';

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

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = this.editMapDataService.canvasSize();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }
}
