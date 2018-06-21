import { DataSource } from '@angular/cdk/table';
import { Curriculum } from '../../../models/curriculum';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { CurriculumService } from '../../curriculums.service';
import { catchError, finalize } from 'rxjs/operators';
import { SharedService } from '../../../shared/services/shared.service';
import { MatSnackBar } from '@angular/material';

export class CurriculumsDataSource implements DataSource<Curriculum> {

  private _curriculumsSubject = new BehaviorSubject<Curriculum[]>([]);
  private _countSubject = new BehaviorSubject<number>(0);

  public count$ = this._countSubject.asObservable();

  constructor(private _curriculumService: CurriculumService,
              private _sharedService: SharedService,
              private _snackBar: MatSnackBar) { }

  public loadCurriculums(pageIndex: number = 0, pageSize: number = 10) {
      this._sharedService.toggleLoader(true);

      this._curriculumService.getCurriculums(pageIndex, pageSize).pipe(

          catchError(() => {
            this._snackBar.open(
              'Erro ao buscar currículos, por favor tente novamente mais tarde',
              'OK', { duration: 5000 }
            );
            return of([]);
          }),
          finalize(() => this._sharedService.toggleLoader(false))

      ).subscribe((response) => {
        this._curriculumsSubject.next(
          this._adjustLatLngValues(response.data)
        );
        this._countSubject.next(response.count);
      });
  }

  private _adjustLatLngValues(curriculums: Curriculum[]): Curriculum[] {
    if (curriculums) {
      curriculums.forEach((curr) => {
        curr.latitude = parseFloat(curr.latitude.toString());
        curr.longitude = parseFloat(curr.longitude.toString());
      });
    }
    return curriculums;
  }

  connect(collectionViewer: CollectionViewer): Observable<Curriculum[]> {
      return this._curriculumsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this._curriculumsSubject.complete();
      this._countSubject.complete();
  }
}
