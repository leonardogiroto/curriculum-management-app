import { Component, Input } from '@angular/core';
import { ProfessionalExperience } from '../../../models/professional-experience';

@Component({
  selector: 'app-professional-experiences',
  template: `
    <mat-accordion>
      <mat-expansion-panel *ngFor="let experience of experiences" >
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{ experience.company_name }}
          </mat-panel-title>
        </mat-expansion-panel-header>
        <p>{{ experience.role }}</p>
        <p>Início: {{ experience.start_date | date : 'dd/MM/yyyy' }}</p>
        <p>Fim: {{ experience.end_date | date : 'dd/MM/yyyy' }}</p>
      </mat-expansion-panel>
    </mat-accordion>`
})
export class ProfessionalExperiencesComponent {

  @Input() experiences: ProfessionalExperience[];

}
