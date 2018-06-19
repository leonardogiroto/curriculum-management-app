import { Component, Input } from '@angular/core';
import { Formation } from '../../../models/formation';

@Component({
  selector: 'app-formations',
  template: `
    <mat-accordion>
      <mat-expansion-panel *ngFor="let formation of formations" >
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{ formation.course }}
          </mat-panel-title>
        </mat-expansion-panel-header>
        <p>
          {{ formation.institution }}
        </p>
        <p class="concluded" *ngIf="formation.concluded" >
          <mat-icon>assignment_turned_in</mat-icon> Concluído
        </p>
        <p class="not-concluded" *ngIf="!formation.concluded" >
          <mat-icon>assignment</mat-icon> Cursando
        </p>
        <p>
          Início: {{ formation.start_date | date : 'dd/MM/yyyy' }}
        </p>
        <p *ngIf="formation.concluded" >
          Fim: {{ formation.end_date | date : 'dd/MM/yyyy' }}
        </p>
      </mat-expansion-panel>
    </mat-accordion>`,
  styleUrls: ['./formations.scss']
})
export class FormationsComponent {

  @Input() formations: Formation[];

}
