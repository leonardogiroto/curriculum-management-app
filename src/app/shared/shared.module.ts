import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from '../not-found/not-found';
import { SharedService } from './services/shared.service';

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
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
