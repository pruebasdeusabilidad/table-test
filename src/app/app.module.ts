import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdTableModule, MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // MatTableModule,
    MaterialModule,
    MdTableModule,
    HttpModule,
    CdkTableModule,
    BrowserAnimationsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
