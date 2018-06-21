import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CurriculumService } from '../../curriculums.service';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { Curriculum } from '../../../models/curriculum';
import { tap } from 'rxjs/operators';
import { CurriculumsDataSource } from './curriculums.data-source';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-curriculums-list',
  templateUrl: './curriculums-list.html',
  styleUrls: ['./curriculums-list.scss']
})
export class CurriculumsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['image', 'name', 'score', 'register_date', 'actions'];
  public dataSource: CurriculumsDataSource;
  public curriculumsCount = 49;

  public selectedCurriculum: Curriculum;

  constructor(private _curriculumService: CurriculumService,
              private _sharedService: SharedService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new CurriculumsDataSource(this._curriculumService, this._sharedService, this._snackBar);
    this.dataSource.loadCurriculums(0, 10);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.loadCurriculums(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe();
  }

  public viewCurriculum(curriculum: Curriculum) {
    this.selectedCurriculum = curriculum;
  }
}
