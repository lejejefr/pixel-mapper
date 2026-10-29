import { Component, inject } from '@angular/core';
import { NavService } from '../../services/nav-service/nav-service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-nav-page-header',
  styleUrl: './nav-page-header.scss',
  templateUrl: './nav-page-header.html',
})
export class NavPageHeader {
  readonly navService = inject(NavService);
  readonly router = inject(Router);
  onCreateClick(): void{
    this.router.navigateByUrl('nav-page/create');
  }
  onEditClick(): void{
    this.navService.startEditing();
  }
  onParamClick(): void{
    this.router.navigateByUrl('nav-page/reconfigure')
  }
}
