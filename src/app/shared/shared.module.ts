import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from '../not-found/not-found';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
