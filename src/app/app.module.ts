import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentsListComponent } from './incidents-list/incidents-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableSortPipe } from './table-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IncidentsListComponent,
    TableSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
