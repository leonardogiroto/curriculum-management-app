import { CurriculumService } from '../../curriculums.service';
import { of } from 'rxjs';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material';
import { AddCurriculumComponent } from './add-curriculum';
import { FormArray } from '@angular/forms';
import { NavigationExtras } from '@angular/router';

describe('AddCurriculumComponent', () => {

  let component: AddCurriculumComponent;
  let service: CurriculumService;
  let matSnackBar: MockMatSnackBar;
  let router: MockRouter;

  beforeEach(async () => {
    service = new CurriculumService(null);
    matSnackBar = new MockMatSnackBar();
    router = new MockRouter();
    component = new AddCurriculumComponent(service, null, <any>matSnackBar, <any>router);
  });

  it('should create the expected form for registering a curriculum', () => {
    component.ngOnInit();
    const formControlsKeys = Object.keys(component.formGroup.controls);

    expect(component.formGroup).toBeDefined();
    expect(formControlsKeys.length).toBe(12);
    expect(formControlsKeys).toEqual([
      'picture',
      'birthdate',
      'name',
      'gender',
      'email',
      'phone',
      'address',
      'latitude',
      'longitude',
      'tags',
      'formations',
      'professional_experiences'
    ]);
  });

  it('should have the name formControl of formGroup valid with a valid name set', () => {
    component.ngOnInit();
    const nameForm = component.formGroup.get('name');
    nameForm.setValue('Leonardo Giroto');

    expect(nameForm.valid).toBeTruthy();
    expect(nameForm.errors).toBeNull();
  });

  it('should have the name formControl of formGroup invalid with an invalid name set', () => {
    component.ngOnInit();
    const nameForm = component.formGroup.get('name');
    nameForm.setValue('Leonardo');

    expect(component.formGroup.valid).toBeFalsy();
    expect(nameForm.errors.invalidName).toBeDefined();
  });

  it('should have the email formControl of formGroup valid with a valid email set', () => {
    component.ngOnInit();
    const emailForm = component.formGroup.get('email');
    emailForm.setValue('email@gmail.com');

    expect(emailForm.valid).toBeTruthy();
    expect(emailForm.errors).toBeNull();
  });

  it('should have the email formControl of formGroup invalid with an invalid email set', () => {
    component.ngOnInit();
    const emailForm = component.formGroup.get('email');
    emailForm.setValue('email@com');

    expect(component.formGroup.valid).toBeFalsy();
    expect(emailForm.errors.invalidEmail).toBeDefined();
  });

  it('should add a tag to the form', () => {
    component.ngOnInit();

    component.addTag({ target: { value: 'new-tag' }});

    const tagsForm = <FormArray>component.formGroup.get('tags');
    expect(tagsForm.length).toBe(1);
    expect(tagsForm.value[0]).toBe('new-tag');
  });

  it('should remove a tag from the form', () => {
    component.ngOnInit();

    component.addTag({ target: { value: 'new-tag' }});
    component.removeTag(0);

    const tagsForm = <FormArray>component.formGroup.get('tags');
    expect(tagsForm.length).toBe(0);
  });

  it('should call the api to save a new curriculum', () => {
    const saveCurriculumSpy = spyOn(service, 'saveCurriculum').and.callFake(() => of({}));
    spyOn(component['_router'], 'navigate').and.callFake(() => of());

    component.ngOnInit();
    component.saveCurriculum();

    expect(saveCurriculumSpy).toHaveBeenCalled();
  });

});

class MockMatSnackBar {
  public open(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return <any>{ };
  }
}

class MockRouter {
  public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return <any>{ };
  }
}
