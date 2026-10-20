import { Component } from '@angular/core';
import { NavList } from '../nav-list/nav-list';
import { NavSearchBar } from '../nav-search-bar/nav-search-bar';

@Component({
  imports: [
    NavList,
    NavSearchBar
  ],
  selector: 'app-nav-list-container',
  styleUrl: './nav-list-container.scss',
  templateUrl: './nav-list-container.html',
})
export class NavListContainer {}
