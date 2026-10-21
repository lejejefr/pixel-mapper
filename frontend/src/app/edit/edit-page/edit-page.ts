import { Component } from '@angular/core';
import { ToolBar } from '../tool-bar/tool-bar';
import { EditWindow } from '../edit-window/edit-window';

@Component({
  imports: [
    ToolBar,
    EditWindow
  ],
  selector: 'app-edit-page',
  styleUrl: './edit-page.scss',
  templateUrl: './edit-page.html',
})
export class EditPage {}
