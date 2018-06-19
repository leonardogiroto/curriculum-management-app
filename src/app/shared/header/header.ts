import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" >
      <span class="title" (click)="navigateTo('curriculums')" >Curriculums</span>
      <div class="add-curriculum" (click)="navigateTo('adicionar-curriculum')" >
        <mat-icon>note_add</mat-icon> Adicionar
      </div>
    </mat-toolbar>`,
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

  constructor(private _router: Router) { }

  public navigateTo(routePath: string): void {
    this._router.navigate([ routePath ]);
  }

}
