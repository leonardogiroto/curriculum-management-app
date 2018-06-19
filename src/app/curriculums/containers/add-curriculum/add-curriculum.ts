import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CurriculumService } from '../../curriculums.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewFormationDialog } from './formation-dialog/formation-dialog';
import { Formation } from '../../../models/formation';
import { NewProfessionalExperienceDialog } from './professional-experience-dialog/professional-experience-dialog';
import { Curriculum } from '../../../models/curriculum';
import { ProfessionalExperience } from '../../../models/professional-experience';

@Component({
  selector: 'app-add-curriculum',
  templateUrl: './add-curriculum.html',
  styleUrls: ['./add-curriculum.scss']
})
export class AddCurriculumComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _curriculumService: CurriculumService,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'picture': new FormControl(''),
      'birthdate': new FormControl('', [ Validators.required ]),
      'name': new FormControl('', [ Validators.required ]),
      'gender': new FormControl('male', [ Validators.required ]),
      'email': new FormControl('', [ Validators.required ]),
      'phone': new FormControl('', [ Validators.required ]),
      'address': new FormControl('', [ Validators.required ]),
      'latitude': new FormControl('', [ Validators.required ]),
      'longitude': new FormControl('', [ Validators.required ]),
      'tags': new FormArray([]),
      'formations': new FormArray([]),
      'professional_experiences': new FormArray([])
    });
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

  public saveCurriculum() {
    const curriculum: Curriculum = this.formGroup.getRawValue();
    curriculum.tags = (<string[]>curriculum.tags).join(', ');
    this._curriculumService.saveCurriculum(curriculum)
        .subscribe(() => {
          this._snackBar.open(
            'Currículo adicionado com sucesso!',
            'OK', { duration: 5000 }
          );
        }, () => {
          this._snackBar.open(
            'Erro ao adicionar currículo, por favor tente novamente mais tarde',
            'OK', { duration: 5000 }
          );
        });
  }

}
