import { CurriculumsListComponent } from './curriculums-list';
import { CurriculumService } from '../../curriculums.service';
import { SharedService } from '../../../shared/services/shared.service';
import { of } from 'rxjs';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material';
import { Curriculum, Genero } from '../../../models/curriculum';

describe('CurriculumsListComponent', () => {

  let component: CurriculumsListComponent;
  let service: CurriculumService;
  let sharedService: SharedService;
  let matSnackBar: MockMatSnackBar;

  beforeEach(async () => {
    service = new CurriculumService(null);
    sharedService = new SharedService();
    matSnackBar = new MockMatSnackBar();
    component = new CurriculumsListComponent(service, sharedService, <any>matSnackBar);
  });

  it('should call the endpoint to retrieve the list of curriculums from the server', () => {
    const serviceSpy = spyOn(service, 'getCurriculums').and.callFake(() => of({}));

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should set the list of curriculums with data from the server, if successful', () => {
    spyOn(service, 'getCurriculums').and.returnValue(of({ data: curriculums }));
    component.ngOnInit();

    expect(component.dataSource['_curriculumsSubject'].getValue()).toBe(curriculums);
  });

});

const curriculums: Curriculum[] = [{
  'id': 34,
  'active': true,
  'picture': 'http://placehold.it/32x32',
  'birthdate': '2015-01-14',
  'name': 'Chandler Wilder',
  'gender': Genero.Homem,
  'email': 'chandlerwilder@aquasseur.com',
  'phone': '+55 11 (961) 428-3415',
  'address': '847 Kay Court, Kilbourne, Arizona, 651',
  'latitude': '76.677253',
  'longitude': '7.743145',
  'tags': 'occaecat, esse, qui, amet',
  'created_at': '2014-02-04T08:04:52.000Z',
  'updated_at': '2018-06-21T02:17:20.332Z',
  'formations': [],
  'professional_experiences': []
}];

class MockMatSnackBar {
  public open(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return <any>{ };
  }
}
