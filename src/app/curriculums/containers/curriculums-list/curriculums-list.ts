import { Component, OnInit, ViewChild } from '@angular/core';
import { CurriculumService } from '../../curriculums.service';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { Curriculum } from '../../../models/curriculum';
import { ApiResponse } from '../../../models/api-response';

@Component({
  selector: 'app-curriculums-list',
  templateUrl: './curriculums-list.html',
  styleUrls: ['./curriculums-list.scss']
})
export class CurriculumsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['image', 'name', 'score', 'register_date', 'actions'];
  public dataSource = new MatTableDataSource<Curriculum>([]);
  public curriculumsCount: number;

  public selectedCurriculum: Curriculum;

  constructor(private _curriculumService: CurriculumService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this._curriculumService.getCurriculums()
        .subscribe((response: ApiResponse) => {
          this.curriculumsCount = response.count;
          this.dataSource.data = this._adjustLatLngValues(response.data);
        }, () => {
          this._snackBar.open(
            'Erro ao buscar currículos, por favor tente novamente mais tarde',
            'OK', { duration: 500 }
          );
        });
  }

  public viewCurriculum(curriculum: Curriculum) {
    this.selectedCurriculum = curriculum;
  }

  private _adjustLatLngValues(curriculums: Curriculum[]): Curriculum[] {
    curriculums.forEach((curr) => {
      curr.latitude = parseFloat(curr.latitude.toString());
      curr.longitude = parseFloat(curr.longitude.toString());
    });
    return curriculums;
  }
}
