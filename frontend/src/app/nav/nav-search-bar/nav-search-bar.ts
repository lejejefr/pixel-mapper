import { Component, inject } from '@angular/core';
import { NavService } from '../../services/nav-service/nav-service';

@Component({
  imports: [],
  selector: 'app-nav-search-bar',
  styleUrl: './nav-search-bar.scss',
  templateUrl: './nav-search-bar.html',
})
export class NavSearchBar {
  public nav = inject(NavService);

  onSearch(event : Event): void{
    const value = (event.target as HTMLInputElement).value;
    this.nav.search(value)
  }
}
