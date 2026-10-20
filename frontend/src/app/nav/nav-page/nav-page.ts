import { Component } from '@angular/core';
import { NavPageHeader } from '../nav-page-header/nav-page-header';
import { NavListContainer } from '../nav-list-container/nav-list-container';
import { NavDescriptionContainer } from '../nav-description-container/nav-description-container';

@Component({
  imports: [
    NavPageHeader,
    NavListContainer,
    NavDescriptionContainer
  ],
  selector: 'app-nav-page',
  styleUrl: './nav-page.scss',
  templateUrl: './nav-page.html',
})
export class NavPage {}
