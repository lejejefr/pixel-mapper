import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-header',
  imports: [],
  styleUrl: './edit-header.scss',
  templateUrl: './edit-header.html',
})
export class EditHeader {
  private router = inject(Router);

  onExitPressed(): void{
    this.router.navigateByUrl("nav-page");
  }
}
