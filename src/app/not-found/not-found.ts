import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss']
})
export class NotFoundComponent {

  constructor(private _router: Router) { }

  public goToCurriculums() {
    this._router.navigate(['curriculums']);
  }

}
