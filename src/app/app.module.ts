import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core'
import {} from "googlemaps";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'INCLUDE YOUR OWN API KEY HERE',
     
    })
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
