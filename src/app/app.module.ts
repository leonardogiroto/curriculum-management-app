import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found';
import { CurriculumsListComponent } from './curriculums/containers/curriculums-list/curriculums-list';
import { AddCurriculumComponent } from './curriculums/containers/add-curriculum/add-curriculum';
import { CurriculumsModule } from './curriculums/curriculums.module';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';

const appRoutes: Routes = [{
  path: 'curriculums',
  component: CurriculumsListComponent,
  data: { page: 'curriculums' }
}, {
  path: 'adicionar-curriculum',
  component: AddCurriculumComponent,
  data: { page: 'adicionar-curriculum' }
}, {
  path: '',
  redirectTo: '/curriculums',
  pathMatch: 'full'
}, {
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    CurriculumsModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
