import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MapsComponent} from './maps/maps.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ActionProgressComponent} from './maps/action-progress/action-progress.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    NotFoundComponent,
    ActionProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
