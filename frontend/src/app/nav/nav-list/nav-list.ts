import { Component } from '@angular/core';
import { NavListElement } from '../nav-list-element/nav-list-element';

@Component({
  imports: [
    NavListElement
  ],
  selector: 'app-nav-list',
  styleUrl: './nav-list.scss',
  templateUrl: './nav-list.html',
})
export class NavList {}
