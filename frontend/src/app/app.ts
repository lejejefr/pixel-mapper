import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPage } from './nav/nav-page/nav-page';
import { EditPage } from './edit/edit-page/edit-page';

@Component({
  imports: [
    RouterOutlet,
    NavPage,
    EditPage
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
