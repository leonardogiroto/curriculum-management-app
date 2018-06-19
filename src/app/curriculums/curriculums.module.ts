import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CurriculumsListComponent } from './containers/curriculums-list/curriculums-list';
import { CurriculumService } from './curriculums.service';
import { AddCurriculumComponent } from './containers/add-curriculum/add-curriculum';
import { MaterialModule } from '../shared/material.module';
import { CurriculumDetailsComponent } from './components/curriculum-details/curriculum-details';
import { AgmCoreModule } from '@agm/core';
import { EmptyStateComponent } from './components/empty-state/empty-state';
import { FormationsComponent } from './components/formations/formations';
import { ProfessionalExperiencesComponent } from './components/professional-experiences/professional-experiences';
import { NewFormationDialog } from './containers/add-curriculum/formation-dialog/formation-dialog';
import { NewProfessionalExperienceDialog } from './containers/add-curriculum/professional-experience-dialog/professional-experience-dialog';

@NgModule({
  declarations: [
    CurriculumsListComponent,
    AddCurriculumComponent,
    CurriculumDetailsComponent,
    EmptyStateComponent,
    FormationsComponent,
    ProfessionalExperiencesComponent,
    NewFormationDialog,
    NewProfessionalExperienceDialog
  ],
  entryComponents: [
    NewFormationDialog,
    NewProfessionalExperienceDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSQIOXZKgccgOABYtTPtN1oLGPwE8B-8c'
    })
  ],
  providers: [
    CurriculumService
  ]
})
export class CurriculumsModule { }
