import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentsListComponent } from './incidents-list/incidents-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableSortPipe } from './table-sort.pipe';
import { IncidentAddFormComponent } from './incident-add-form/incident-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoreInfoComponent } from './more-info/more-info.component';
import { MapTestComponent } from './map-test/map-test.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentsListComponent,
    TableSortPipe,
    IncidentAddFormComponent,
    MoreInfoComponent,
    MapTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
