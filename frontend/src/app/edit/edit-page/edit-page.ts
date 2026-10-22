import { Component } from '@angular/core';
import { ToolBar } from '../tool-bar/tool-bar';
import { EditWindow } from '../edit-window/edit-window';
import { EditHeader } from '../edit-header/edit-header';

@Component({
  imports: [
    ToolBar,
    EditWindow,
    EditHeader
  ],
  selector: 'app-edit-page',
  styleUrl: './edit-page.scss',
  templateUrl: './edit-page.html',
})
export class EditPage {}
