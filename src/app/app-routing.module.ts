import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapsComponent} from './maps/maps.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'maps'},
  {path: 'maps', component: MapsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
