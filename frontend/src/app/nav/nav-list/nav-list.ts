import { Component, inject } from '@angular/core';
import { NavListElement } from '../nav-list-element/nav-list-element';
import { NavService } from '../../services/nav-service/nav-service';
import { NgClass } from '@angular/common';
import { NavDescriptionContainer } from '../nav-description-container/nav-description-container';

@Component({
  imports: [
    NgClass,
    NavListElement,
    NavDescriptionContainer
  ],
  selector: 'app-nav-list',
  styleUrl: './nav-list.scss',
  templateUrl: './nav-list.html',
})
export class NavList {
  public nav = inject(NavService);
}
