import { Component } from '@angular/core';
import { ToolBar } from '../tool-bar/tool-bar';

@Component({
  imports: [
    ToolBar,
  ],
  selector: 'app-edit-page',
  styleUrl: './edit-page.scss',
  templateUrl: './edit-page.html',
})
export class EditPage {}
