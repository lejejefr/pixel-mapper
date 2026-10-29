import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavService } from '../../services/nav-service/nav-service';
import { ReconfigureRequest } from '../../models/reconfigure-request';

@Component({
  imports: [FormsModule],
  selector: 'app-nav-reconfigure-page',
  styleUrl: './nav-reconfigure-page.scss',
  templateUrl: './nav-reconfigure-page.html',
})
export class NavReconfigurePage {
  title = '';
  description = '';

  readonly navService = inject(NavService);

  onSubmit(): void {
    if (!this.title.trim()) return;

    this.navService.reconfigure(
      new ReconfigureRequest(
        this.title,
        this.description,
      )
    );
  }
}
