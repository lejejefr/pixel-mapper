import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPage } from './nav/nav-page/nav-page';

@Component({
  imports: [
    RouterOutlet,
    NavPage
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
