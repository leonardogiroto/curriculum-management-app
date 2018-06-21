import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  private _loaderSubject: Subject<boolean> = new Subject();
  public loader$ = this._loaderSubject.asObservable();

  public toggleLoader(loading: boolean) {
    this._loaderSubject.next(loading);
  }

}
