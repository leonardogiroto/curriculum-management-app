import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Curriculum } from '../models/curriculum';

@Injectable()
export class CurriculumService {

  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public getCurriculums(page: number = 1, per_page: number = 10): Observable<any> {
    const queryParams = `?page=${page}&per_page=${per_page}`;
    return this._http.get(this.apiUrl + 'curriculums' + queryParams);
  }

  public saveCurriculum(curriculum: Curriculum): Observable<any> {
    return this._http.post(this.apiUrl + 'curriculums', curriculum);
  }

}
