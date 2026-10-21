import { NavService } from './../../services/nav-service/nav-service';
import { Component, computed, inject, Injectable, Input } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  imports: [
    NgClass,
    DatePipe,
  ],
  selector: 'app-nav-list-element',
  styleUrl: './nav-list-element.scss',
  templateUrl: './nav-list-element.html',
})
export class NavListElement {
  public nav = inject(NavService);
  protected readonly isSelected = computed(
    () => this.nav.selectedId() === this.props.mapId
  );
  @Input() public props! : NavListElementProps;

  onClick(): void{
    this.nav.select(this.props.mapId);
  }
}
