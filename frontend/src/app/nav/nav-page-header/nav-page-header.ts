import { Component, inject } from '@angular/core';
import { NavService } from '../../services/nav-service/nav-service';

@Component({
  imports: [],
  selector: 'app-nav-page-header',
  styleUrl: './nav-page-header.scss',
  templateUrl: './nav-page-header.html',
})
export class NavPageHeader {
  readonly navService = inject(NavService);
  onCreateClick(): void{

  }
  onEditClick(): void{

  }
  onParamClick(): void{

  }
}
