import { Component } from '@angular/core';
import { NavListElementProps } from '../../models/nav-list-element-props';
import { DatePipe } from '@angular/common';

@Component({
  imports: [
    DatePipe

  ],
  selector: 'app-nav-list-element',
  styleUrl: './nav-list-element.scss',
  templateUrl: './nav-list-element.html',
})
export class NavListElement {
  private props!: NavListElementProps;

  ngOnInit(): void{
    this.props = new NavListElementProps(
      "TEST-ID",
      new Date(),
      new Date(),
      "Some title",
      "Some description",
      false
    )
  }
}
