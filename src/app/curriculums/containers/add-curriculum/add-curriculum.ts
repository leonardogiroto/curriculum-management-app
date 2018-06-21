import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CurriculumService } from '../../curriculums.service';
import { MatDialog, MatSnackBar, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material';
import { NewFormationDialog } from './formation-dialog/formation-dialog';
import { Formation } from '../../../models/formation';
import { NewProfessionalExperienceDialog } from './professional-experience-dialog/professional-experience-dialog';
import { Curriculum } from '../../../models/curriculum';
import { ProfessionalExperience } from '../../../models/professional-experience';
import { environment } from '../../../../environments/environment.prod';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ValidateEmail, ValidateName } from '../../../shared/validations';

declare var cloudinary: any;
declare var geoCode: any;

@Component({
  selector: 'app-add-curriculum',
  templateUrl: './add-curriculum.html',
  styleUrls: ['./add-curriculum.scss']
})
export class AddCurriculumComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public requestLoading = false;

  private _address$: Subscription;

  constructor(private _curriculumService: CurriculumService,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'picture': new FormControl(''),
      'birthdate': new FormControl('', [ Validators.required ]),
      'name': new FormControl('', [ Validators.required, ValidateName ]),
      'gender': new FormControl('male', [ Validators.required ]),
      'email': new FormControl('', [ Validators.required, ValidateEmail ]),
      'phone': new FormControl('', [ Validators.required ]),
      'address': new FormControl('', [ Validators.required ]),
      'latitude': new FormControl({ value: '', disabled: true }, [ Validators.required ]),
      'longitude': new FormControl({ value: '', disabled: true }, [ Validators.required ]),
      'tags': new FormArray([]),
      'formations': new FormArray([]),
      'professional_experiences': new FormArray([])
    });

    this._createFormAddressSubscription(this.formGroup);
  }

  public addTag(event) {
    const tags = <FormArray>this.formGroup.get('tags');
    tags.push(new FormControl(event.target.value));
    event.target.value = '';
  }

  public openAddFormationDialog() {
    const dialogRef = this._dialog.open(NewFormationDialog, { width: '50%' });

    dialogRef.afterClosed().subscribe((newFormation: Formation) => {
      if (newFormation) {
        const formations = <FormArray>this.formGroup.get('formations');
        formations.push(new FormControl(newFormation));
      }
    });
  }

  public openAddProfExperienceDialog() {
    const dialogRef = this._dialog.open(NewProfessionalExperienceDialog, { width: '50%' });

    dialogRef.afterClosed().subscribe((newExperience: ProfessionalExperience) => {
      if (newExperience) {
        const experience = <FormArray>this.formGroup.get('professional_experiences');
        experience.push(new FormControl(newExperience));
      }
    });
  }

  public uploadToCloudinary() {
    const cloudinaryConfig = {
      'cloud_name': environment.cloudName,
      'upload_preset': environment.uploadPreset
    };

    cloudinary.openUploadWidget(cloudinaryConfig,
      (error, result) => {
        if (result) {
          const imageResponse = result[0];
          this.formGroup.get('picture').setValue(imageResponse.url);

        } else if (error && error.message !== 'User closed widget') {
          this._snackBar.open(
            'Erro ao enviar imagem, por favor tente novamente mais tarde',
            'OK', { duration: 5000 }
          );
        }
      }
    );
  }

  public saveCurriculum() {
    const curriculum: Curriculum = this.formGroup.getRawValue();
    curriculum.tags = (<string[]>curriculum.tags).join(', ');
    this._curriculumService.saveCurriculum(curriculum)
        .subscribe(() => {
          this._snackBar.open(
            'Currículo adicionado com sucesso!',
            'OK', { duration: 5000 }
          );
          this._router.navigate(['curriculums']);
        }, () => {
          this._snackBar.open(
            'Erro ao adicionar currículo, por favor tente novamente mais tarde',
            'OK', { duration: 5000 }
          );
        });
  }

  public removeTag(index: number) {
    const tags = <FormArray>this.formGroup.get('tags');
    tags.removeAt(index);
  }

  private _createFormAddressSubscription(formGroup: FormGroup) {
    this._address$ = this.formGroup.get('address').valueChanges
        .pipe(debounceTime(500))
        .subscribe((address: string) => {
          geoCode.geolookup(address).then((result) => {
            if (result && result.length > 0) {
              this.formGroup.get('latitude').setValue(result[0].lat);
              this.formGroup.get('longitude').setValue(result[0].lng);
            }
          });
        });
  }

  ngOnDestroy() {
    this._address$.unsubscribe();
  }

}
