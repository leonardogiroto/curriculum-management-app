import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" >
      <span class="title" (click)="navigateTo('curriculums')" >Curriculums</span>

      <mat-spinner *ngIf="showLoader" [diameter]="30" color="accent" ></mat-spinner>

      <div class="add-curriculum" (click)="navigateTo('adicionar-curriculum')" >
        <mat-icon>note_add</mat-icon> Cadastrar
      </div>
    </mat-toolbar>`,
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  public showLoader = false;

  constructor(private _router: Router,
              private _sharedService: SharedService) { }

  ngOnInit() {
    this._sharedService.loader$.subscribe(
      (value) => this.showLoader = value
    );
  }

  public navigateTo(routePath: string): void {
    this._router.navigate([ routePath ]);
  }

}
