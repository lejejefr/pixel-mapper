import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavService } from '../../services/nav-service/nav-service';
import { CreateMapRequest } from '../../models/create-request';

@Component({
  selector: 'app-nav-create-page',
  imports: [FormsModule],
  styleUrl: './nav-create-page.scss',
  templateUrl: './nav-create-page.html',
})
export class NavCreatePage {
  title = '';
  description = '';
  width = 32;
  height = 32;

  readonly navService = inject(NavService);

  onSubmit(): void {
    if (!this.title.trim()) return;
    if (this.width < 1 || this.height < 1) return;

    this.navService.create(
      new CreateMapRequest(
        this.title,
        this.description,
        this.width,
        this.height
      )
    );
  }
}
