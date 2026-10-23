import { EditPage } from './edit/edit-page/edit-page';
import { NavPage } from './nav/nav-page/nav-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: "/edit-page", pathMatch: "full"},
  {path: 'edit-page', component: EditPage},
  {path: 'nav-page', component: NavPage}
];
