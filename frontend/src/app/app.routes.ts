import { EditPage } from './edit/edit-page/edit-page';
import { NavCreatePage } from './nav/nav-create-page/nav-create-page';
import { NavPage } from './nav/nav-page/nav-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: "/nav-page", pathMatch: "full"},
  {path: 'edit-page', component: EditPage},
  {path: 'nav-page', component: NavPage},
  {path: 'nav-page/create', component: NavCreatePage},
];
